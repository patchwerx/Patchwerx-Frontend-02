import { useState, useEffect, useMemo } from 'react'
import { useTherapistAuth } from '../context/TherapistAuthContext'
import { toE164 } from '../utils/phone'

const GROUP_ORDER = { A: 0, B: 1, C: 2 }
const GROUPS = ['A', 'B', 'C']

const GROUP_COLORS = {
  A: { bg: 'rgba(180, 80, 80, 0.5)', border: 'rgba(200, 100, 100, 0.8)', active: 'rgba(180, 80, 80, 0.85)', text: '#f5e0e0' },
  B: { bg: 'rgba(180, 160, 60, 0.5)', border: 'rgba(200, 180, 80, 0.8)', active: 'rgba(180, 160, 60, 0.85)', text: '#f5f0d8' },
  C: { bg: 'rgba(70, 130, 80, 0.5)', border: 'rgba(90, 150, 100, 0.8)', active: 'rgba(70, 130, 80, 0.85)', text: '#d8f0dc' },
}

function sortByGroup(clients) {
  return [...clients].sort((a, b) => {
    const ga = GROUP_ORDER[a.contact_group] ?? 3
    const gb = GROUP_ORDER[b.contact_group] ?? 3
    return ga - gb
  })
}

/** Format phone for display as (###) ###-#### */
function formatPhoneDisplay(value) {
  if (!value) return '—'
  const digits = String(value).replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return value
}

/**
 * GET /clients uses query param ?email=... (no custom headers) to avoid CORS preflight.
 * PATCH uses these headers so backend can resolve therapist_id from email.
 */
function authHeaders(therapistEmail) {
  const h = { 'Content-Type': 'application/json' }
  if (therapistEmail) h['X-Therapist-Email'] = therapistEmail
  return h
}

/** Normalize a client from API (accept snake_case or camelCase) so we always have first_name, last_name, phone_e164, etc. */
function normalizeClient(c) {
  if (!c || typeof c !== 'object') return c
  return {
    ...c,
    first_name: c.first_name ?? c.firstName ?? '',
    last_name: c.last_name ?? c.lastName ?? '',
    phone_e164: c.phone_e164 ?? c.phoneE164 ?? c.phone ?? '',
  }
}

export default function Waitlist() {
  const { user } = useTherapistAuth()
  const therapistEmail = user?.email ?? null
  const apiBase = process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, '')

  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterGroup, setFilterGroup] = useState('ALL') // 'ALL' | 'A' | 'B' | 'C'
  const [savingId, setSavingId] = useState(null)
  const [editRow, setEditRow] = useState(null) // { id, first_name, last_name, phone_e164 }

  const fetchClients = async () => {
    if (!apiBase) {
      setLoading(false)
      setError('Missing API configuration.')
      return
    }
    if (!therapistEmail) {
      setLoading(false)
      setError('Please log in to view your waitlist.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      // Query param only (no custom headers) so GET is a "simple" request and may not trigger CORS preflight
      const res = await fetch(`${apiBase}/clients?email=${encodeURIComponent(therapistEmail)}`)
      if (!res.ok) throw new Error(res.status === 401 ? 'Unauthorized' : `Failed to load clients (${res.status})`)
      const data = await res.json()
      const raw = Array.isArray(data) ? data : data?.clients ?? []
      setClients(raw.map(normalizeClient))
    } catch (e) {
      setError(e.message || 'Could not load clients.')
      setClients([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const updateClient = async (id, payload) => {
    if (!apiBase || !therapistEmail) return
    setSavingId(id)
    try {
      const res = await fetch(`${apiBase}/clients/${id}`, {
        method: 'PATCH',
        headers: authHeaders(therapistEmail),
        body: JSON.stringify(payload),
      })
      const text = await res.text()
      let parsed = null
      try {
        parsed = text ? JSON.parse(text) : null
      } catch {
        parsed = null
      }
      if (!res.ok) {
        const fromBody = parsed?.message ?? parsed?.error ?? (parsed && typeof parsed === 'object' ? JSON.stringify(parsed) : text)
        const msg = fromBody || `Update failed (${res.status})`
        throw new Error(msg)
      }
      setEditRow((prev) => (prev?.id === id ? null : prev))
      setError(null)
      await fetchClients()
    } catch (e) {
      setError(e.message || 'Could not update client.')
    } finally {
      setSavingId(null)
    }
  }

  const setGroup = (client, newGroup) => {
    if (client.contact_group === newGroup) return
    updateClient(client.id, { contact_group: newGroup })
  }

  const startEdit = (client) => {
    setEditRow({
      id: client.id,
      first_name: client.first_name ?? '',
      last_name: client.last_name ?? '',
      phone_e164: client.phone_e164 ?? '',
    })
  }

  const saveEdit = () => {
    if (!editRow) return
    const client = clients.find((c) => c.id === editRow.id)
    if (!client) return
    const payload = {}
    if (String(client.first_name ?? '') !== String(editRow.first_name ?? '')) payload.first_name = editRow.first_name || null
    if (String(client.last_name ?? '') !== String(editRow.last_name ?? '')) payload.last_name = editRow.last_name || null
    if (String(client.phone_e164 ?? '') !== String(editRow.phone_e164 ?? '')) {
      const result = toE164(editRow.phone_e164)
      if (result.error) {
        setError(result.error)
        return
      }
      payload.phone_e164 = result.e164
    }
    if (Object.keys(payload).length === 0) {
      setEditRow(null)
      return
    }
    setError(null)
    updateClient(editRow.id, payload)
  }

  const cancelEdit = () => setEditRow(null)

  const filteredAndSorted = useMemo(() => {
    const list = filterGroup === 'ALL'
      ? clients
      : clients.filter((c) => c.contact_group === filterGroup)
    return sortByGroup(list)
  }, [clients, filterGroup])

  if (loading) {
    return (
      <div style={{ paddingBottom: 40 }}>
        <h2 style={{ fontSize: '1.6rem' }}>Waitlist</h2>
        <p className="pw-lead" style={{ fontSize: '1.08rem' }}>Loading clients…</p>
      </div>
    )
  }

  if (error && clients.length === 0) {
    return (
      <div style={{ paddingBottom: 40 }}>
        <h2 style={{ fontSize: '1.6rem' }}>Waitlist</h2>
        <p className="pw-lead" style={{ color: 'var(--error)', fontSize: '1.08rem' }}>{error}</p>
        {apiBase && therapistEmail && (
          <button type="button" className="pw-btn" onClick={fetchClients}>Try again</button>
        )}
      </div>
    )
  }

  return (
    <div
      style={{
        paddingBottom: 40,
        paddingTop: 12,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 12,
        background: 'rgba(105, 95, 82, 0.97)',
      }}
    >
      <section style={{ paddingTop: 16, paddingBottom: 24 }}>
        {/* Dashboard metrics: Revenue saved, Successful rebookings, Clients on waitlist */}
        {(() => {
          const successfulRebookingsThisMonth = 3
          const revenueSaved = 115 * successfulRebookingsThisMonth
          const formatRevenue = (n) => `$${n.toLocaleString()}`
          const cardStyle = {
            padding: '18px 20px',
            borderRadius: 12,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-soft)',
          }
          const valueStyle = { fontSize: '2rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }
          const labelStyle = { marginTop: 6, fontSize: '0.9rem', color: 'var(--ink-muted)', fontWeight: 600 }
          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
              <div style={cardStyle}>
                <div style={valueStyle}>{formatRevenue(revenueSaved)}</div>
                <div style={labelStyle}>Revenue saved</div>
              </div>
              <div style={cardStyle}>
                <div style={valueStyle}>{successfulRebookingsThisMonth}</div>
                <div style={labelStyle}>Successful rebookings this month</div>
              </div>
              <div style={cardStyle}>
                <div style={valueStyle}>{clients.length}</div>
                <div style={labelStyle}>Clients on waitlist</div>
              </div>
            </div>
          )
        })()}

        <h2 style={{ fontSize: '1.6rem', marginBottom: 8 }}>Waitlist</h2>
        <p className="pw-lead" style={{ marginBottom: 20, fontSize: '1.08rem' }}>
          Clients for rebooking offers. Edit name, phone, or group; changes are saved to the server.
        </p>

        {/* Group filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center' }}>
          <span style={{ fontWeight: 600, color: 'var(--ink-faint)', fontSize: '0.95rem' }}>Show group:</span>
          {['ALL', ...GROUPS].map((g) => {
            const isSelected = filterGroup === g
            const colors = g !== 'ALL' ? GROUP_COLORS[g] : null
            return (
              <button
                key={g}
                type="button"
                className="pw-link"
                onClick={() => setFilterGroup(g)}
                style={{
                  border: isSelected
                    ? (g === 'ALL' ? '2px solid var(--accent)' : `2px solid ${colors.border}`)
                    : (g === 'ALL' ? '2px solid rgba(201, 169, 98, 0.5)' : `2px solid ${colors.border}`),
                  cursor: 'pointer',
                  font: 'inherit',
                  padding: '8px 14px',
                  fontSize: '0.98rem',
                  fontWeight: 600,
                  borderRadius: 8,
                  boxShadow: 'none',
                  background: isSelected
                    ? g === 'ALL'
                      ? 'var(--accent)'
                      : colors.active
                    : 'transparent',
                  color: isSelected ? (g === 'ALL' ? '#1c1916' : colors.text) : 'var(--ink-muted)',
                  outline: 'none',
                }}
              >
                {g === 'ALL' ? 'All' : g}
              </button>
            )
          })}
        </div>

        {error && (
          <p className="pw-lead" style={{ marginBottom: 12, color: 'var(--error)', fontSize: '0.9rem' }}>
            {error}
          </p>
        )}

        {filteredAndSorted.length === 0 ? (
          <p className="pw-lead">No clients in this group yet.</p>
        ) : (
          <div className="pw-waitlist-table-wrap" style={{ overflowX: 'auto' }}>
            <table className="pw-waitlist-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
              <thead>
                <tr>
                  <th style={thStyle}>First</th>
                  <th style={thStyle}>Last</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Group</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSorted.map((client) => {
                  const isEditing = editRow?.id === client.id
                  const isSaving = savingId === client.id
                  return (
                    <tr key={client.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={tdStyle}>
                        {isEditing ? (
                          <input
                            className="pw-input"
                            value={editRow.first_name}
                            onChange={(e) => setEditRow((p) => ({ ...p, first_name: e.target.value }))}
                            placeholder="First"
                            style={{ maxWidth: 180, fontSize: '1rem', padding: '10px 12px' }}
                          />
                        ) : (
                          <span>{client.first_name?.trim() || '—'}</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        {isEditing ? (
                          <input
                            className="pw-input"
                            value={editRow.last_name}
                            onChange={(e) => setEditRow((p) => ({ ...p, last_name: e.target.value }))}
                            placeholder="Last"
                            style={{ maxWidth: 140 }}
                          />
                        ) : (
                          <span>{client.last_name?.trim() || '—'}</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        {isEditing ? (
                          <input
                            className="pw-input"
                            value={editRow.phone_e164}
                            onChange={(e) => setEditRow((p) => ({ ...p, phone_e164: e.target.value }))}
                            placeholder="555-555-5555 or +1 555 555 5555"
                            style={{ maxWidth: 200, fontSize: '1rem', padding: '10px 12px' }}
                          />
                        ) : (
                          <span>{formatPhoneDisplay(client.phone_e164)}</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <span>{client.email || '—'}</span>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                          {GROUPS.map((g) => {
                            const isCurrent = client.contact_group === g
                            const colors = GROUP_COLORS[g]
                            return (
                              <button
                                key={g}
                                type="button"
                                className="pw-link"
                                disabled={isSaving}
                                onClick={() => setGroup(client, g)}
                                style={{
                                  padding: '8px 14px',
                                  fontSize: '1rem',
                                  fontWeight: 700,
                                  border: `2px solid ${colors.border}`,
                                  borderRadius: 8,
                                  cursor: isSaving ? 'wait' : 'pointer',
                                  font: 'inherit',
                                  background: isCurrent ? colors.active : 'transparent',
                                  color: isCurrent ? colors.text : 'var(--ink-muted)',
                                  boxShadow: 'none',
                                  outline: 'none',
                                }}
                                title={isCurrent ? 'Current group' : `Set to ${g}`}
                                aria-pressed={isCurrent}
                              >
                                {g}
                              </button>
                            )
                          })}
                          {!client.contact_group || !GROUPS.includes(client.contact_group) ? (
                            <span style={{ fontSize: '0.95rem', color: 'var(--ink-faint)', marginLeft: 4 }}>
                              No group set
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td style={tdStyle}>
                        {isEditing ? (
                          <span style={{ display: 'flex', gap: 6 }}>
                            <button type="button" className="pw-btn" onClick={saveEdit} disabled={isSaving}>
                              {isSaving ? 'Saving…' : 'Save'}
                            </button>
                            <button
                              type="button"
                              className="pw-link"
                              onClick={cancelEdit}
                              style={{ border: 'none', cursor: 'pointer', font: 'inherit', padding: '6px 10px' }}
                            >
                              Cancel
                            </button>
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="pw-link"
                            onClick={() => startEdit(client)}
                            style={{ border: 'none', cursor: 'pointer', font: 'inherit', padding: '6px 10px' }}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

const thStyle = {
  textAlign: 'left',
  padding: '14px 16px',
  fontWeight: 700,
  fontSize: '1.05rem',
  color: 'var(--ink)',
  borderBottom: '2px solid var(--border)',
}
const tdStyle = {
  padding: '14px 16px',
  fontSize: '1.05rem',
  color: 'var(--ink)',
  verticalAlign: 'middle',
  lineHeight: 1.4,
}
