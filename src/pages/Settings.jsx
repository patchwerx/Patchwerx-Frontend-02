import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCognitoAuth } from '../context/CognitoAuthContext'
import { useCalendarConnection } from '../api/calendarConnection'
import { useBrandStyles } from '../ui/useBrandStyles'
import {
  buildCalendarConnectAuthorizeUrl,
  getCalendarConnectRedirectUri,
  isCalendarConnectAuthConfigured,
} from '../auth/calendarConnectAuthorize'

const MS_RETURN_KEY = 'pw_ms_reconnect_return'
const MS_PENDING_KEY = 'pw_ms_connect_pending'

/** Format ISO date for display (local time, short). */
function formatDateTime(iso) {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    return d.toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })
  } catch {
    return iso
  }
}

/** Derive subscription status label from connection. */
function getSubscriptionStatusLabel(connection) {
  if (!connection) return null
  const expiresAt = connection.webhook_expires_at ? new Date(connection.webhook_expires_at).getTime() : null
  const now = Date.now()
  const oneDayMs = 24 * 60 * 60 * 1000
  // Expiring within 24h or already expired: backend may be reconnecting
  if (expiresAt != null && expiresAt < now + oneDayMs) return 'Reconnecting automatically'
  if (expiresAt != null && expiresAt > now) return 'Sync healthy'
  if (connection.connection_status === 'CONNECTED') return 'Sync healthy'
  return null
}

export default function Settings() {
  const styles = useBrandStyles()
  const { user } = useCognitoAuth()
  const therapistEmail = user?.profile?.email ?? user?.email ?? null
  const { connection, loading, error, refetch } = useCalendarConnection(therapistEmail)
  const [searchParams, setSearchParams] = useSearchParams()
  const [refreshingOutlook, setRefreshingOutlook] = useState(false)
  const [outlookRefreshError, setOutlookRefreshError] = useState(null)

  // Confidential flow: backend may redirect here with ?calendar_connected=1
  useEffect(() => {
    if (searchParams.get('calendar_connected') === '1') {
      localStorage.setItem('pw_ms_connected', 'true')
      refetch()
      setSearchParams((p) => {
        p.delete('calendar_connected')
        return p
      }, { replace: true })
    }
  }, [searchParams, refetch, setSearchParams])

  const connectionStatusLabel =
    connection?.connection_status === 'CONNECTED'
      ? 'Outlook connected'
      : connection?.connection_status === 'NEEDS_REAUTH'
        ? 'Reconnect Outlook'
        : connection?.connection_status === 'DISCONNECTED'
          ? 'Not connected'
          : connection?.connection_status ?? 'Not connected'

  const subscriptionLabel = getSubscriptionStatusLabel(connection)
  const needsReconnect = connection?.connection_status === 'NEEDS_REAUTH'

  const refreshConnectionWithMicrosoft = () => {
    setOutlookRefreshError(null)

    const therapistId =
      connection?.therapist_id ?? localStorage.getItem('pw_therapist_id')

    if (!therapistId) {
      setOutlookRefreshError(
        'Could not determine your account. Missing therapist_id from GET /calendar-connection response.'
      )
      return
    }

    if (!isCalendarConnectAuthConfigured()) {
      setOutlookRefreshError('Microsoft sign-in is not configured. Check REACT_APP_AAD_CLIENT_ID.')
      return
    }

    setRefreshingOutlook(true)
    sessionStorage.setItem(MS_RETURN_KEY, '/app/settings')
    localStorage.setItem('pw_therapist_id', therapistId)
    sessionStorage.setItem(MS_PENDING_KEY, 'true')
    const redirectUri = getCalendarConnectRedirectUri()
    if (!redirectUri) {
      setOutlookRefreshError('Missing REACT_APP_API_BASE_URL. Backend callback URL is required.')
      return
    }
    const { url } = buildCalendarConnectAuthorizeUrl(redirectUri, {
      therapistId,
      returnTo: '/app/settings',
    })
    window.location.assign(url)
  }

  return (
    <div className="pw-settings" style={{ display: 'grid', gap: 24 }}>
      <h1 className="pw-h1" style={{ margin: '0 0 24px 0' }}>Calendar</h1>
      <p style={styles.subtleText}>
        View and refresh your Outlook calendar connection.
      </p>

      {/* Calendar connection */}
      <section className="pw-panel pw-panel-elevated" style={{ padding: 22 }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>
          Calendar connection
        </h3>
        {loading && <p style={styles.subtleText}>Loading…</p>}
        {error && (
          <p style={{ color: 'var(--error)', margin: '0 0 12px', fontSize: '0.95rem' }}>
            {error}
            <button type="button" className="pw-btn pw-btnSecondary" style={{ marginLeft: 10 }} onClick={refetch}>
              Try again
            </button>
          </p>
        )}
        {!loading && !connection && !error && (
          <p style={styles.subtleText}>
            No calendar connected. Connect Outlook from{' '}
            <Link to="/signup/therapist" className="pw-link">
              therapist setup
            </Link>
            .
          </p>
        )}
        {!loading && connection && (
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: needsReconnect ? 'var(--warning)' : 'var(--accent)',
                }}
              >
                {connectionStatusLabel}
              </span>
              {subscriptionLabel && (
                <span style={{ fontSize: '0.9rem', color: 'var(--ink-muted)' }}>{subscriptionLabel}</span>
              )}
            </div>
            <dl style={{ display: 'grid', gap: 8, margin: 0, fontSize: '0.9rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, alignItems: 'baseline' }}>
                <dt style={{ margin: 0, color: 'var(--ink-muted)' }}>Webhook expires</dt>
                <dd style={{ margin: 0, color: 'var(--ink)' }}>{formatDateTime(connection.webhook_expires_at)}</dd>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, alignItems: 'baseline' }}>
                <dt style={{ margin: 0, color: 'var(--ink-muted)' }}>Last synced</dt>
                <dd style={{ margin: 0, color: 'var(--ink)' }}>{formatDateTime(connection.last_synced_at)}</dd>
              </div>
              {connection.reauth_required_at && (
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, alignItems: 'baseline' }}>
                  <dt style={{ margin: 0, color: 'var(--ink-muted)' }}>Reauth required</dt>
                  <dd style={{ margin: 0, color: 'var(--warning)' }}>{formatDateTime(connection.reauth_required_at)}</dd>
                </div>
              )}
              {connection.last_error && (
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, alignItems: 'baseline' }}>
                  <dt style={{ margin: 0, color: 'var(--ink-muted)' }}>Last error</dt>
                  <dd style={{ margin: 0, color: 'var(--error)', maxWidth: '100%' }}>
                    {connection.last_error}
                    {connection.last_error_at && (
                      <span style={{ display: 'block', fontSize: '0.85em', color: 'var(--ink-muted)', marginTop: 2 }}>
                        {formatDateTime(connection.last_error_at)}
                      </span>
                    )}
                  </dd>
                </div>
              )}
            </dl>
            {outlookRefreshError && (
              <p style={{ color: 'var(--error)', margin: '0 0 8px', fontSize: '0.9rem' }}>
                {outlookRefreshError}
              </p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
              <button
                type="button"
                className="pw-btn"
                onClick={refreshConnectionWithMicrosoft}
                disabled={refreshingOutlook}
              >
                {refreshingOutlook ? 'Redirecting to Microsoft…' : 'Refresh connection with Microsoft'}
              </button>
              {!needsReconnect && (
                <button type="button" className="pw-btn pw-btnSecondary" onClick={refetch}>
                  Refresh status
                </button>
              )}
            </div>
            {needsReconnect && (
              <p style={{ margin: '8px 0 0', fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
                Re-authorizing with Microsoft will restore your calendar connection.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
