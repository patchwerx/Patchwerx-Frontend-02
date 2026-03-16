import { Link } from 'react-router-dom'
import { useCognitoAuth } from '../context/CognitoAuthContext'
import { useCalendarConnection } from '../api/calendarConnection'

export default function Dashboard() {
  const { user } = useCognitoAuth()
  const therapistEmail = user?.profile?.email ?? user?.email ?? null
  const { connection, loading } = useCalendarConnection(therapistEmail)

  const statusLabel =
    connection?.connection_status === 'CONNECTED'
      ? 'Outlook connected'
      : connection?.connection_status === 'NEEDS_REAUTH'
        ? 'Reconnect Outlook'
        : null
  const webhookExpiresAt = connection?.webhook_expires_at
    ? new Date(connection.webhook_expires_at).getTime()
    : null
  const now = Date.now()
  const oneDayMs = 24 * 60 * 60 * 1000
  const subscriptionHealthy =
    webhookExpiresAt == null || (webhookExpiresAt > now + oneDayMs)
  const syncLabel = connection?.connection_status === 'CONNECTED' && subscriptionHealthy ? 'Sync healthy' : connection?.connection_status === 'CONNECTED' ? 'Reconnecting automatically' : null

  return (
    <div className="pw-dashboard">
      <section>
        <h2>Dashboard</h2>
        <p className="pw-lead">
          Summary of today, recent cancellations, and rebookings.
        </p>
        {!loading && (statusLabel || syncLabel) && (
          <p className="pw-lead" style={{ marginTop: 12, fontSize: '0.95rem', color: 'var(--ink-muted)' }}>
            {statusLabel}
            {statusLabel && syncLabel && ' · '}
            {syncLabel}
            {' · '}
            <Link to="/app/settings" className="pw-link">
              Settings
            </Link>
          </p>
        )}
        {!loading && connection?.connection_status === 'NEEDS_REAUTH' && (
          <p style={{ marginTop: 8 }}>
            <Link to="/signup/therapist" className="pw-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Reconnect Outlook
            </Link>
          </p>
        )}
      </section>
    </div>
  )
}
