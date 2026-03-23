import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useCognitoAuth } from '../context/CognitoAuthContext'
import { getClientProfile } from '../api/clientProfile'
import { hasApiBase } from '../utils/apiBase'

const cardHover = { y: -6 }
const cardSpring = { type: 'spring', stiffness: 280, damping: 22 }

function formatAppointmentWhen(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

/**
 * @param {Array<{ status: string, starts_at: string | null }>} appointments
 */
function partitionAppointments(appointments, now = new Date()) {
  const confirmed = []
  const openRebooking = []

  for (const apt of appointments || []) {
    const status = String(apt.status || '').toUpperCase()
    if (status === 'OPEN_REBOOKING') {
      openRebooking.push(apt)
      continue
    }
    if (status === 'CONFIRMED') {
      const start = apt.starts_at ? new Date(apt.starts_at) : null
      if (!start || Number.isNaN(start.getTime())) {
        confirmed.push(apt)
        continue
      }
      if (start >= now) confirmed.push(apt)
    }
  }

  const byStart = (a, b) => {
    const ta = a.starts_at ? new Date(a.starts_at).getTime() : 0
    const tb = b.starts_at ? new Date(b.starts_at).getTime() : 0
    return ta - tb
  }
  confirmed.sort(byStart)
  openRebooking.sort(byStart)
  return { confirmed, openRebooking }
}

function AppointmentList({ items, emptyLabel }) {
  const cardStyle = {
    padding: '18px 20px',
    borderBottom: '1px solid var(--border)',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 12,
    alignItems: 'center',
  }

  if (!items.length) {
    return (
      <p style={{ padding: 24, margin: 0, color: 'var(--ink-faint)', fontSize: '0.95rem' }}>
        {emptyLabel}
      </p>
    )
  }

  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((apt) => (
        <li key={apt.id} style={cardStyle}>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '1rem' }}>{apt.title || 'Session'}</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', marginTop: 4 }}>
              {formatAppointmentWhen(apt.starts_at)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function Profile() {
  const { user } = useCognitoAuth()
  const clientEmail = user?.profile?.email ?? user?.email ?? null
  const apiConfigured = hasApiBase()

  const [therapist, setTherapist] = useState({ first_name: '', last_name: '' })
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!apiConfigured) {
        setLoading(false)
        setError('Missing API configuration (REACT_APP_API_BASE_URL).')
        return
      }
      if (!clientEmail) {
        setLoading(false)
        setError('Please log in to view your profile.')
        return
      }
      setLoading(true)
      setError(null)
      try {
        const data = await getClientProfile(clientEmail)
        if (cancelled || !data) return
        setTherapist(data.therapist)
        setAppointments(data.appointments)
      } catch (e) {
        if (!cancelled) {
          const msg = e?.message || 'Could not load profile.'
          const corsHint =
            msg === 'Failed to fetch' || String(msg).toLowerCase().includes('cors')
              ? ' For local dev, add REACT_APP_DEV_PROXY=1 to .env.local and restart npm start (see .env.example), or enable CORS on API Gateway for http://localhost:3000.'
              : ''
          setError(`${msg}${corsHint}`)
          setTherapist({ first_name: '', last_name: '' })
          setAppointments([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [apiConfigured, clientEmail])

  const { confirmed, openRebooking } = useMemo(
    () => partitionAppointments(appointments),
    [appointments]
  )

  const therapistDisplayName = [therapist.first_name, therapist.last_name].filter(Boolean).join(' ').trim()

  const cardStyle = {
    padding: '18px 20px',
    borderRadius: 12,
    background: '#f8f4ed',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow-soft)',
  }

  if (loading) {
    return (
      <div
        style={{
          paddingBottom: 40,
          paddingTop: 2,
          paddingLeft: 12,
          paddingRight: 12,
          borderRadius: 12,
          background: 'var(--bg-card)',
        }}
      >
        <h1 className="pw-h1" style={{ margin: '0 0 16px 0' }}>
          Dashboard
        </h1>
        <p className="pw-lead" style={{ fontSize: '1.08rem' }}>
          Loading your profile…
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        paddingBottom: 40,
        paddingTop: 2,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 12,
        background: 'var(--bg-card)',
      }}
    >
      <section style={{ paddingTop: 4, paddingBottom: 24 }}>
        <h1 className="pw-h1" style={{ margin: '0 0 24px 0' }}>
          Dashboard
        </h1>

        {error && (
          <div
            className="pw-panel"
            style={{
              marginBottom: 20,
              padding: 16,
              background: 'rgba(184, 84, 80, 0.08)',
              border: '1px solid rgba(184, 84, 80, 0.25)',
              color: 'var(--error)',
              fontSize: '0.98rem',
            }}
          >
            {error}
          </div>
        )}

        {/* Therapist name from API */}
        <h2 className="pw-h1" style={{ fontSize: '1.35rem', margin: '0 0 12px 0' }}>
          Your therapist
        </h2>
        <motion.div
          style={{ ...cardStyle, marginBottom: 28, maxWidth: 480 }}
          whileHover={cardHover}
          transition={cardSpring}
        >
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>
            {therapistDisplayName || '—'}
          </div>
          {!therapistDisplayName && !error && (
            <div style={{ marginTop: 8, fontSize: '0.92rem', color: 'var(--ink-muted)' }}>
              Name will appear here once your account is linked in Patchwerx.
            </div>
          )}
        </motion.div>

        {/* Upcoming confirmed */}
        <h2 className="pw-h1" style={{ fontSize: '1.35rem', margin: '0 0 12px 0' }}>
          Upcoming appointments
        </h2>
        <p className="pw-lead" style={{ marginBottom: 16, fontSize: '1rem', color: 'var(--ink-muted)' }}>
          Confirmed sessions scheduled ahead. Times shown in your local timezone.
        </p>
        <div
          className="pw-panel"
          style={{
            background: 'var(--bg-elevated)',
            borderRadius: 12,
            border: '1px solid var(--brown-border)',
            boxShadow: 'var(--shadow-card-on-card)',
            overflow: 'hidden',
            marginBottom: 32,
          }}
        >
          <AppointmentList
            items={confirmed}
            emptyLabel="No upcoming confirmed appointments."
          />
        </div>

        {/* OPEN_REBOOKING */}
        <h2 className="pw-h1" style={{ fontSize: '1.35rem', margin: '0 0 12px 0' }}>
          Open for rebooking
        </h2>
        <p className="pw-lead" style={{ marginBottom: 16, fontSize: '1rem', color: 'var(--ink-muted)' }}>
          Slots with status <strong style={{ color: 'var(--ink)' }}>OPEN_REBOOKING</strong>—available to claim when offered.
        </p>
        <div
          className="pw-panel"
          style={{
            background: 'var(--bg-elevated)',
            borderRadius: 12,
            border: '1px solid var(--brown-border)',
            boxShadow: 'var(--shadow-card-on-card)',
            overflow: 'hidden',
          }}
        >
          <AppointmentList
            items={openRebooking}
            emptyLabel="No appointments open for rebooking right now."
          />
        </div>
      </section>
    </div>
  )
}
