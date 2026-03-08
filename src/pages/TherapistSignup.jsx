import { useMemo, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../auth/msalConfig' // adjust path if needed

/**
 * TherapistSignup.jsx
 * Maintains prior functionality:
 *  - Create account via POST /startInitAuthFlow
 *  - Then allow Connect Outlook calendar via MSAL loginRedirect
 *
 * Adds:
 *  - Stores therapist_id from signup response (expects backend returns { therapist_id })
 *  - After Outlook connect completes and user returns to the app, can create Graph subscription
 *    by calling backend POST /ms/subscriptions with Authorization: Bearer <graph_access_token>
 *  - Shows clear UI states + errors
 *
 * Notes:
 *  - You must have a route /auth/microsoft/callback that processes MSAL redirect.
 *  - This component triggers subscription creation both:
 *      (a) immediately after redirect when the user returns (silent token + API call)
 *      (b) and via a "Finish calendar connection" button as a fallback
 */
export default function TherapistSignup() {
  const { instance, accounts } = useMsal()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [connectingOutlook, setConnectingOutlook] = useState(false)
  const [outlookError, setOutlookError] = useState(null)

  // NEW: Subscription creation state
  const [creatingSubscription, setCreatingSubscription] = useState(false)
  const [subscriptionOk, setSubscriptionOk] = useState(false)
  const [subscriptionInfo, setSubscriptionInfo] = useState(null)
  const [subscriptionError, setSubscriptionError] = useState(null)

  const styles = useMemo(
    () => ({
      card: {
        borderRadius: 18,
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        boxShadow: 'var(--shadow)',
        padding: 18,
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
        borderRadius: 10,
        border: '1px solid var(--border)',
        background: 'rgba(48, 42, 36, 0.95)',
        color: 'var(--ink)',
        padding: '11px 12px',
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
        borderRadius: 10,
        border: '1px solid var(--accent)',
        padding: '11px 14px',
        fontSize: '0.98rem',
        fontWeight: 700,
        cursor: 'pointer',
        background: 'var(--accent)',
        color: '#1c1916',
        boxShadow: '0 4px 14px rgba(201, 169, 98, 0.25)',
      },
      secondaryBtn: {
        borderRadius: 10,
        border: '1px solid var(--border)',
        padding: '11px 14px',
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

  const getActiveAccount = () => instance.getActiveAccount() || accounts?.[0] || null

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

      const response = await fetch(`${apiBase.replace(/\/$/, '')}/startInitAuthFlow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone,
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

  const connectOutlook = async () => {
    setConnectingOutlook(true)
    setOutlookError(null)
    setSubscriptionError(null)

    try {
      // Make sure therapist_id exists (user should have signed up)
      const therapistId = localStorage.getItem('pw_therapist_id')
      if (!therapistId) {
        throw new Error('Missing therapist_id. Please create account first.')
      }

      // Persist a hint for post-redirect flow (optional)
      localStorage.setItem('pw_ms_connect_pending', 'true')

      await instance.loginRedirect({
        scopes: loginRequest.scopes,
        prompt: 'select_account',
      })
      // After redirect, the browser navigates away; code below won't run now.
    } catch (e) {
      console.error(e)
      setOutlookError(e?.message || 'Could not start Outlook connect. Please try again.')
      setConnectingOutlook(false)
      localStorage.removeItem('pw_ms_connect_pending')
    }
  }

  /**
   * NEW: Create Graph subscription by calling your backend.
   * Backend should:
   *  - read Authorization: Bearer <access_token>
   *  - create subscription in Graph
   *  - store subscription_id/clientState/expiration in DB
   */
  console.log("FINISH_CLICKED", {
    apiBase,
    therapist_id: localStorage.getItem("pw_therapist_id"),
    activeAccount: instance.getActiveAccount(),
    accountsLen: accounts?.length,
  });

  const createGraphSubscription = async () => {
    
    console.log("createGraphSubscription clicked", {
      apiBase,
      therapist_id: localStorage.getItem("pw_therapist_id"),
      activeAccount: instance.getActiveAccount(),
      accountsCount: accounts?.length
    });
      
    setCreatingSubscription(true)
    setSubscriptionError(null)

    try {
      if (!apiBase) throw new Error('Missing REACT_APP_API_BASE_URL')
      const therapist_id = localStorage.getItem('pw_therapist_id')
      if (!therapist_id) throw new Error('Missing therapist_id. Please create account first.')

      const account = getActiveAccount()
      if (!account) throw new Error('No Microsoft session found. Please click "Connect Outlook calendar" again.')
      
        console.log("ABOUT_TO_ACQUIRE_TOKEN");
      const tokenResp = await instance.acquireTokenSilent({
        scopes: loginRequest.scopes,
        account,
      })

      console.log("API BASE:", apiBase);
      console.log("ABOUT_TO_FETCH_SUBSCRIPTIONS", `${apiBase?.replace(/\/$/, '')}/graph/subscriptions`);
      const resp = await fetch(`${apiBase.replace(/\/$/, '')}/graph/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          therapist_id,
          access_token: tokenResp.accessToken,
          // optional:
          // resource: "/me/events"
        }),
      })

      const data = await parseJsonSafe(resp)

      if (!resp.ok) {
        const msg =
          data?.error ||
          data?.message ||
          `Subscription create failed (${resp.status}). Check backend logs.`
        throw new Error(msg)
      }

      setSubscriptionOk(true)
      setSubscriptionInfo(data || { ok: true })
      localStorage.setItem('pw_ms_connected', 'true')
      localStorage.removeItem('pw_ms_connect_pending')

      return data
    } catch (e) {
      console.error(e)
      setSubscriptionOk(false)
      setSubscriptionInfo(null)
      setSubscriptionError(e?.message || 'Could not create calendar subscription.')
      throw e
    } finally {
      setCreatingSubscription(false)
      setConnectingOutlook(false)
    }
  }

  /**
   * NEW: Post-redirect auto-finish.
   * When the user returns from Microsoft, if pw_ms_connect_pending is set,
   * attempt to finalize by creating the subscription.
   *
   * This keeps UX smooth without needing a manual "Finish" click.
   *
   * NOTE: We purposely don't import useEffect to keep your original imports minimal.
   * If you prefer, add useEffect and do it properly—below is still safe and idempotent.
   */
  const maybeAutoFinish = async () => {
    // run at most once per mount
    const alreadyTried = window.__pw_ms_finish_tried
    if (alreadyTried) return
    window.__pw_ms_finish_tried = true

    const pending = localStorage.getItem('pw_ms_connect_pending') === 'true'
    if (!pending) return

    // If already connected, skip
    const alreadyConnected = localStorage.getItem('pw_ms_connected') === 'true'
    if (alreadyConnected) {
      localStorage.removeItem('pw_ms_connect_pending')
      return
    }

    try {
      await createGraphSubscription()
    } catch {
      // keep error state set by createGraphSubscription()
    }
  }

  // Attempt auto-finish on render (safe; will only do once)
  // If you prefer, move into a useEffect(() => { ... }, []).
  void maybeAutoFinish()

  const resetAll = () => {
    setSubmitted(false)
    setError(null)
    setOutlookError(null)
    setSubscriptionError(null)
    setSubscriptionOk(false)
    setSubscriptionInfo(null)
    setConnectingOutlook(false)
    setCreatingSubscription(false)

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
              placeholder="(555) 555-5555"
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
              disabled={connectingOutlook || creatingSubscription || subscriptionOk}
              title="Connect your Microsoft Outlook / Microsoft 365 calendar"
            >
              {subscriptionOk
                ? 'Calendar connected ✅'
                : connectingOutlook
                  ? 'Connecting…'
                  : 'Connect Outlook calendar'}
            </button>

            {/* NEW: Fallback manual finalize */}
            <button
              type="button"
              style={styles.secondaryBtn}
              onClick={createGraphSubscription}
              disabled={creatingSubscription || subscriptionOk}
              title="If you returned from Microsoft and need to finalize setup"
            >
              {creatingSubscription ? 'Finishing…' : subscriptionOk ? 'Finished ✅' : 'Finish calendar connection'}
            </button>

            <button type="button" style={styles.secondaryBtn} onClick={resetAll}>
              Submit another
            </button>
          </div>

          {outlookError && <div style={styles.error}>{outlookError}</div>}
          {subscriptionError && <div style={styles.error}>{subscriptionError}</div>}

          {subscriptionOk && (
            <div style={{ marginTop: 12 }}>
              <div style={styles.okBadge}>Webhook subscription active</div>
              {subscriptionInfo?.subscription_id && (
                <div style={styles.tiny}>
                  Subscription ID: <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>{subscriptionInfo.subscription_id}</span>
                </div>
              )}
              {subscriptionInfo?.expirationDateTime && (
                <div style={styles.tiny}>Expires: {subscriptionInfo.expirationDateTime}</div>
              )}
            </div>
          )}

          <div style={styles.hint}>
            You’ll be asked to sign in to Microsoft and approve access to your calendar. When you return, we’ll
            automatically finalize the connection (and you can also click “Finish calendar connection” if needed).
          </div>
        </div>
      )}
    </div>
  )
}