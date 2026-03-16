import { useMemo, useState, useEffect } from 'react'
import {
  buildCalendarConnectAuthorizeUrl,
  getCalendarConnectRedirectUri,
  isCalendarConnectAuthConfigured,
} from '../auth/calendarConnectAuthorize'
import { toE164 } from '../utils/phone'

const MS_RETURN_KEY = 'pw_ms_reconnect_return'
const MS_PENDING_KEY = 'pw_ms_connect_pending'

/**
 * TherapistSignup: create account via POST /startInitAuthFlow, then connect Outlook via Microsoft OAuth.
 * We use a plain /authorize URL (no MSAL SPA); user lands on /auth/microsoft/callback with a code,
 * callback POSTs the code to Lambda; backend exchanges it and creates the calendar connection.
 */
export default function TherapistSignup() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [connectingOutlook, setConnectingOutlook] = useState(false)
  const [outlookError, setOutlookError] = useState(null)

  const [subscriptionOk, setSubscriptionOk] = useState(false)
  const [subscriptionInfo, setSubscriptionInfo] = useState(null)
  const [subscriptionError, setSubscriptionError] = useState(null)

  // When user returns after calendar connect (confidential flow: backend redirects to return_to or /auth/microsoft/callback)
  useEffect(() => {
    if (localStorage.getItem('pw_ms_connected') === 'true') {
      setSubscriptionOk(true)
      setSubscriptionInfo({ ok: true })
    }
  }, [])

  // Confidential flow: backend may redirect here with ?calendar_connected=1
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('calendar_connected') === '1') {
        localStorage.setItem('pw_ms_connected', 'true')
        setSubscriptionOk(true)
        setSubscriptionInfo({ ok: true })
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    }
  }, [])

  const styles = useMemo(
    () => ({
      card: {
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        boxShadow: 'var(--shadow-card)',
        padding: 32,
      },
      title: {
        fontSize: '1.35rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        margin: 0,
        color: 'var(--ink)',
      },
      lead: {
        marginTop: 8,
        color: 'var(--ink-muted)',
        lineHeight: 1.55,
        marginBottom: 14,
      },
      row2: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
      },
      label: {
        display: 'block',
        fontSize: '0.9rem',
        fontWeight: 600,
        color: 'var(--ink-muted)',
        marginBottom: 6,
      },
      input: {
        width: '100%',
        borderRadius: 'var(--radiusSm)',
        border: '1px solid var(--border)',
        background: 'var(--bg-elevated)',
        color: 'var(--ink)',
        padding: '11px 14px',
        outline: 'none',
        fontSize: '0.98rem',
      },
      actions: {
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap',
        marginTop: 14,
        alignItems: 'center',
      },
      primaryBtn: {
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--accent)',
        padding: '11px 18px',
        fontSize: '0.98rem',
        fontWeight: 700,
        cursor: 'pointer',
        background: 'var(--accent)',
        color: '#1c1916',
        boxShadow: '0 2px 12px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.2)',
      },
      secondaryBtn: {
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--border)',
        padding: '11px 18px',
        fontSize: '0.98rem',
        fontWeight: 700,
        cursor: 'pointer',
        background: 'var(--bg-card-alt)',
        color: 'var(--ink)',
      },
      hint: {
        marginTop: 10,
        color: 'var(--ink-faint)',
        fontSize: '0.92rem',
        lineHeight: 1.45,
      },
      error: {
        marginTop: 10,
        borderRadius: 10,
        padding: '10px 12px',
        border: '1px solid rgba(201, 122, 122, 0.4)',
        background: 'rgba(201, 122, 122, 0.12)',
        color: 'var(--error)',
        fontWeight: 600,
      },
      success: {
        marginTop: 6,
        padding: '12px 14px',
        borderRadius: 12,
        border: '1px solid rgba(201, 169, 98, 0.4)',
        background: 'var(--accent-soft)',
        color: 'var(--accent)',
        fontWeight: 700,
      },
      sub: {
        marginTop: 10,
        color: 'var(--ink-muted)',
        lineHeight: 1.6,
      },
      divider: {
        marginTop: 14,
        marginBottom: 10,
        height: 1,
        width: '100%',
        background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
      },
      stepPillRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 },
      pill: (bg) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 10px',
        borderRadius: 999,
        background: bg,
        border: '1px solid var(--border)',
        color: 'var(--ink-muted)',
        fontWeight: 600,
        fontSize: '0.9rem',
      }),
      tiny: { fontSize: '0.88rem', color: 'var(--ink-faint)', marginTop: 6 },
      okBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 10px',
        borderRadius: 999,
        border: '1px solid var(--accent)',
        background: 'var(--accent-soft)',
        color: 'var(--accent)',
        fontWeight: 700,
        fontSize: '0.92rem',
      },
    }),
    []
  )

  const apiBase = process.env.REACT_APP_API_BASE_URL

  const parseJsonSafe = async (resp) => {
    try {
      return await resp.json()
    } catch {
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!apiBase) throw new Error('Missing REACT_APP_API_BASE_URL')
      if (!phone.trim()) throw new Error('Missing phone number')

      const phoneResult = toE164(phone)
      if (phoneResult.error) throw new Error(phoneResult.error)
      const phone_e164 = phoneResult.e164

      const response = await fetch(`${apiBase.replace(/\/$/, '')}/startInitAuthFlow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone: phone_e164,
          phone_e164,
          first_name: firstName.trim() || null,
          last_name: lastName.trim() || null,
          actor_type: 'THERAPIST',
        }),
      })

      const data = await parseJsonSafe(response)

      if (!response.ok) {
        const msg = data?.error || data?.message || 'Signup failed'
        throw new Error(msg)
      }

      // ✅ THIS IS THE RIGHT PLACE
      if (data?.therapist_id) {
        localStorage.setItem('pw_therapist_id', String(data.therapist_id))
      }

      setSubmitted(true)

      // Preserve prior UX
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
    } catch (err) {
      console.error(err)
      setError(
        err?.message === 'Missing REACT_APP_API_BASE_URL'
          ? 'Config error: missing API base URL. Check your .env and restart the dev server.'
          : err?.message || 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const connectOutlook = () => {
    setConnectingOutlook(true)
    setOutlookError(null)
    setSubscriptionError(null)

    const therapistId = localStorage.getItem('pw_therapist_id')
    if (!therapistId) {
      setOutlookError('Missing therapist_id. Please create account first.')
      setConnectingOutlook(false)
      return
    }
    if (!isCalendarConnectAuthConfigured()) {
      setOutlookError('Microsoft sign-in is not configured. Check REACT_APP_AAD_CLIENT_ID.')
      setConnectingOutlook(false)
      return
    }

    sessionStorage.setItem(MS_PENDING_KEY, 'true')
    sessionStorage.setItem(MS_RETURN_KEY, '/signup/therapist')
    const redirectUri = getCalendarConnectRedirectUri()
    if (!redirectUri) {
      setOutlookError('Missing REACT_APP_API_BASE_URL. Backend callback URL is required for calendar connect.')
      setConnectingOutlook(false)
      return
    }
    const { url } = buildCalendarConnectAuthorizeUrl(redirectUri, {
      therapistId,
      returnTo: '/signup/therapist',
    })
    window.location.assign(url)
  }

  const resetAll = () => {
    setSubmitted(false)
    setError(null)
    setOutlookError(null)
    setSubscriptionError(null)
    setSubscriptionOk(false)
    setSubscriptionInfo(null)
    setConnectingOutlook(false)
    localStorage.removeItem('pw_ms_connected')

    localStorage.removeItem('pw_therapist_id')
    localStorage.removeItem('pw_ms_connect_pending')
    localStorage.removeItem('pw_ms_connected')
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Therapist signup</h2>
      <p style={styles.lead}>
        Create your account so we can connect your calendar and start filling openings automatically.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div style={styles.row2}>
            <div>
              <label style={styles.label} htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                style={styles.input}
                type="text"
                placeholder="Brandon"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </div>

            <div>
              <label style={styles.label} htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                style={styles.input}
                type="text"
                placeholder="Sherrard"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              style={styles.input}
              type="email"
              placeholder="you@practice.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={styles.label} htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              style={styles.input}
              type="tel"
              placeholder="(555) 555-5555 or 555-555-5555"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              required
            />
          </div>

          <div style={styles.actions}>
            <button style={styles.primaryBtn} type="submit" disabled={loading}>
              {loading ? 'Submitting…' : 'Create account'}
            </button>
          </div>

          <div style={styles.hint}>We’ll only use this info for setup + scheduling flow.</div>

          {error && <div style={styles.error}>{error}</div>}
        </form>
      ) : (
        <div style={{ marginTop: 10 }}>
          <div style={styles.success}>Account created ✅</div>
          <div style={styles.sub}>
            Next step: connect your calendar so Patchwerx can detect openings and fill them automatically.
          </div>

          <div style={styles.stepPillRow}>
            <span style={styles.pill('var(--accent-soft)')}>1) Account</span>
            <span style={styles.pill('var(--accent-soft)')}>2) Calendar</span>
            <span style={styles.pill('var(--accent-soft)')}>3) Rules</span>
          </div>

          <div style={styles.divider} />

          <div style={styles.actions}>
            <button
              type="button"
              style={styles.primaryBtn}
              onClick={connectOutlook}
              disabled={connectingOutlook || subscriptionOk}
              title="Connect your Microsoft Outlook / Microsoft 365 calendar"
            >
              {subscriptionOk
                ? 'Calendar connected ✅'
                : connectingOutlook
                  ? 'Connecting…'
                  : 'Connect Outlook calendar'}
            </button>

            <button type="button" style={styles.secondaryBtn} onClick={resetAll}>
              Submit another
            </button>
          </div>

          {outlookError && <div style={styles.error}>{outlookError}</div>}
          {subscriptionError && <div style={styles.error}>{subscriptionError}</div>}

          {subscriptionOk && (
            <div style={{ marginTop: 12 }}>
              <div style={styles.okBadge}>Calendar connection complete</div>
            </div>
          )}

          <div style={styles.hint}>
            You’ll be asked to sign in to Microsoft and approve access to your calendar. When you return, you’ll be
            redirected back here and the connection will be saved automatically.
          </div>
        </div>
      )}
    </div>
  )
}