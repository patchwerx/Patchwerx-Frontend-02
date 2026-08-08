import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Public representation of the Patchwerx SMS opt-in workflow for AWS 10DLC review.
 * Accessible at /sms-consent without login.
 */
export default function SmsConsent() {
  const [phone, setPhone] = useState('(404) 555-1234')
  const [smsConsent, setSmsConsent] = useState(false)
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError(null)

    if (!phone.trim()) {
      setError('Enter your mobile phone number.')
      return
    }
    if (!smsConsent) {
      setError('Please check the box to opt in to SMS appointment communications.')
      return
    }

    setSubmitted(true)
  }

  const reset = () => {
    setPhone('(404) 555-1234')
    setSmsConsent(false)
    setError(null)
    setSubmitted(false)
  }

  return (
    <div style={{ paddingBottom: 36, display: 'grid', gap: 28 }}>
      <section>
        <h1 className="pw-h1" style={{ margin: 0 }}>
          Patchwerx
        </h1>
        <p className="pw-lead" style={{ marginTop: 12, marginBottom: 0 }}>
          SMS Appointment Communications
        </p>
      </section>

      <section className="pw-panel" style={{ padding: 22, background: 'var(--bg-card-alt)' }}>
        {!submitted ? (
          <form onSubmit={submit} style={{ display: 'grid', gap: 18 }} aria-label="SMS opt-in">
            <div>
              <label
                htmlFor="sms-consent-phone"
                style={{ display: 'block', fontWeight: 700, marginBottom: 6 }}
              >
                Phone number
              </label>
              <input
                id="sms-consent-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pw-input"
                style={{
                  width: '100%',
                  maxWidth: 320,
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid var(--border)',
                  background: 'var(--bg-elevated)',
                  color: 'var(--ink)',
                  font: 'inherit',
                }}
              />
            </div>

            <label
              htmlFor="sms-consent-check"
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 12,
                alignItems: 'start',
                cursor: 'pointer',
                lineHeight: 1.55,
              }}
            >
              <input
                id="sms-consent-check"
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                style={{ marginTop: 4, width: 18, height: 18 }}
              />
              <span style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>
                I agree to receive automated transactional SMS messages from Patchwerx related to
                appointment scheduling, appointment confirmations, reminders, cancellations, and
                available appointment times.
              </span>
            </label>

            <div
              style={{
                fontSize: '0.95rem',
                color: 'var(--ink)',
                lineHeight: 1.55,
                display: 'grid',
                gap: 10,
              }}
            >
              <p style={{ margin: 0 }}>
                Message frequency varies. Message and data rates may apply. Reply STOP to opt out or
                HELP for help.
              </p>
              <p style={{ margin: 0 }}>
                Consent to receive SMS messages is not a condition of purchasing or using Patchwerx
                services.
              </p>
            </div>

            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              <Link to="/terms" className="pw-link">
                Terms of Service
              </Link>
              <span aria-hidden="true" style={{ margin: '0 10px', color: 'var(--ink-faint)' }}>
                |
              </span>
              <Link to="/privacy" className="pw-link">
                Privacy Policy
              </Link>
            </p>

            {error && (
              <p style={{ margin: 0, color: 'var(--error)', fontSize: '0.95rem' }} role="alert">
                {error}
              </p>
            )}

            <div>
              <button type="submit" className="pw-btn">
                Sign up for SMS
              </button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
              You&apos;re opted in
            </h2>
            <p style={{ margin: 0, color: 'var(--ink-muted)', lineHeight: 1.55 }}>
              Thanks — {phone} is enrolled for Patchwerx appointment scheduling texts. You&apos;ll
              receive a confirmation message shortly.
            </p>
            <p
              style={{
                margin: 0,
                padding: 14,
                borderRadius: 10,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                lineHeight: 1.55,
                fontSize: '0.95rem',
              }}
            >
              Patchwerx: You&apos;re opted in for appointment scheduling texts. Message frequency
              varies. Msg &amp; data rates may apply. Reply HELP for help or STOP to opt out.
            </p>
            <div>
              <button type="button" className="pw-btn pw-btnSecondary" onClick={reset}>
                Back to form
              </button>
            </div>
          </div>
        )}
      </section>

      {!submitted && (
        <section className="pw-panel" style={{ padding: 22 }}>
          <h2 style={{ margin: '0 0 10px', fontSize: '1.15rem', fontFamily: 'var(--font-heading)' }}>
            Sample first opt-in message
          </h2>
          <p
            style={{
              margin: 0,
              padding: 14,
              borderRadius: 10,
              background: 'var(--bg-card-alt)',
              border: '1px solid var(--border)',
              lineHeight: 1.55,
              fontSize: '0.95rem',
            }}
          >
            Patchwerx: You&apos;re opted in for appointment scheduling texts. Message frequency varies.
            Msg &amp; data rates may apply. Reply HELP for help or STOP to opt out.
          </p>
        </section>
      )}
    </div>
  )
}
