import { useState, useEffect, useMemo } from 'react'
import { useTherapistAuth } from '../context/TherapistAuthContext'

const GROUP_ORDER = { A: 0, B: 1, C: 2 }
const GROUPS = ['A', 'B', 'C']

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

export default function Waitlist() {
  const { user } = useTherapistAuth()
  const therapistEmail = user?.email ?? null
  const apiBase = process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, '')

  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterGroup, setFilterGroup] = useState('ALL') // 'ALL' | 'A' | 'B' | 'C'
  const [savingId, setSavingId] = useState(null)
  const [editRow, setEditRow] = useState(null) // { id, display_name, phone_e164 }

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
      setClients(Array.isArray(data) ? data : data?.clients ?? [])
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
      display_name: client.display_name ?? '',
      phone_e164: client.phone_e164 ?? '',
    })
  }

  const saveEdit = () => {
    if (!editRow) return
    const client = clients.find((c) => c.id === editRow.id)
    if (!client) return
    const payload = {}
    if (String(client.display_name ?? '') !== String(editRow.display_name ?? '')) payload.display_name = editRow.display_name || null
    if (String(client.phone_e164 ?? '') !== String(editRow.phone_e164 ?? '')) payload.phone_e164 = editRow.phone_e164 || null
    if (Object.keys(payload).length === 0) {
      setEditRow(null)
      return
    }
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
      <div style={{ paddingBottom: 28 }}>
        <h2>Waitlist</h2>
        <p className="pw-lead">Loading clients…</p>
      </div>
    )
  }

  if (error && clients.length === 0) {
    return (
      <div style={{ paddingBottom: 28 }}>
        <h2>Waitlist</h2>
        <p className="pw-lead" style={{ color: 'var(--error)' }}>{error}</p>
        {apiBase && therapistEmail && (
          <button type="button" className="pw-btn" onClick={fetchClients}>Try again</button>
        )}
      </div>
    )
  }

  return (
    <div style={{ paddingBottom: 28 }}>
      <section style={{ paddingTop: 8, paddingBottom: 16 }}>
        <h2>Waitlist</h2>
        <p className="pw-lead" style={{ marginBottom: 16 }}>
          Clients for rebooking offers. Edit name, phone, or group; changes are saved to the server.
        </p>

        {/* Group filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
          <span style={{ fontWeight: 700, color: 'var(--ink-muted)' }}>Show group:</span>
          {['ALL', ...GROUPS].map((g) => (
            <button
              key={g}
              type="button"
              className={filterGroup === g ? 'pw-link pw-linkPrimary' : 'pw-link'}
              onClick={() => setFilterGroup(g)}
              style={filterGroup !== g ? { border: 'none', cursor: 'pointer', font: 'inherit' } : {}}
            >
              {g === 'ALL' ? 'All' : g}
            </button>
          ))}
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
                  <th style={thStyle}>Display name</th>
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
                            value={editRow.display_name}
                            onChange={(e) => setEditRow((p) => ({ ...p, display_name: e.target.value }))}
                            placeholder="Name"
                            style={{ maxWidth: 220 }}
                          />
                        ) : (
                          <span>{client.display_name || '—'}</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        {isEditing ? (
                          <input
                            className="pw-input"
                            value={editRow.phone_e164}
                            onChange={(e) => setEditRow((p) => ({ ...p, phone_e164: e.target.value }))}
                            placeholder="+1234567890"
                            style={{ maxWidth: 160 }}
                          />
                        ) : (
                          <span>{formatPhoneDisplay(client.phone_e164)}</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <span>{client.email || '—'}</span>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          {GROUPS.map((g) => {
                            const isCurrent = client.contact_group === g
                            return (
                              <button
                                key={g}
                                type="button"
                                className={isCurrent ? 'pw-link pw-linkPrimary' : 'pw-link'}
                                disabled={isSaving}
                                onClick={() => setGroup(client, g)}
                                style={{
                                  padding: '4px 10px',
                                  fontSize: '0.9rem',
                                  border: isCurrent ? undefined : 'none',
                                  cursor: isSaving ? 'wait' : 'pointer',
                                  font: 'inherit',
                                  fontWeight: isCurrent ? 800 : 600,
                                  boxShadow: isCurrent ? '0 2px 8px rgba(16,185,129,0.35)' : undefined,
                                }}
                                title={isCurrent ? 'Current group' : `Set to ${g}`}
                                aria-pressed={isCurrent}
                              >
                                {g}
                              </button>
                            )
                          })}
                          {!client.contact_group || !GROUPS.includes(client.contact_group) ? (
                            <span style={{ fontSize: '0.8rem', color: 'var(--ink-faint)', marginLeft: 2 }}>
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
  padding: '10px 12px',
  fontWeight: 700,
  fontSize: '0.85rem',
  color: 'var(--ink)',
  borderBottom: '2px solid var(--border)',
}
const tdStyle = {
  padding: '10px 12px',
  fontSize: '0.95rem',
  color: 'var(--ink)',
  verticalAlign: 'middle',
}
