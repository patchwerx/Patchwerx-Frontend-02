import { useMemo, useState } from 'react'

export default function TherapistSignup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Local-only micro styles for interaction polish
  const styles = useMemo(
    () => ({
      success: {
        padding: '12px 14px',
        borderRadius: '16px',
        border: '1px solid rgba(47,224,166,0.25)',
        background: 'rgba(47,224,166,0.10)',
        color: 'rgba(3,105,64,0.95)',
        fontWeight: 800,
      },
      sub: {
        marginTop: 10,
        color: 'rgba(2,6,23,0.70)',
        lineHeight: 1.6,
      },
      row: { display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 },
      secondary: {
        borderRadius: '14px',
        border: '1px solid rgba(2,6,23,0.12)',
        padding: '10px 12px',
        fontSize: '0.95rem',
        fontWeight: 800,
        cursor: 'pointer',
        background: 'rgba(255,255,255,0.85)',
        color: 'rgba(2,6,23,0.82)',
      },
    }),
    []
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/startInitAuthFlow`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            phone,
            first_name: firstName.trim() || null,
            last_name: lastName.trim() || null,
            actor_type: 'THERAPIST',
          }),
        }
      )

      if (!response.ok) throw new Error('Signup failed')

      setSubmitted(true)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Therapist signup</h2>
      <p className="pw-lead">
        Create your account so we can connect your calendar and start filling
        openings automatically.
      </p>

      {!submitted ? (
        <form className="pw-form" onSubmit={handleSubmit}>
          <div className="pw-row2">
            <div>
              <label className="pw-label" htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                className="pw-input"
                type="text"
                placeholder="Brandon"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </div>

            <div>
              <label className="pw-label" htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                className="pw-input"
                type="text"
                placeholder="Sherrard"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>
          </div>

          <div>
            <label className="pw-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="pw-input"
              type="email"
              placeholder="you@practice.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="pw-label" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              className="pw-input"
              type="tel"
              placeholder="(555) 555-5555"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              required
            />
          </div>

          <button className="pw-btn" type="submit" disabled={loading}>
            {loading ? 'Submitting…' : 'Create account'}
          </button>

          <div className="pw-hint">
            Light green = good news. We’ll only use this for setup + scheduling
            flow.
          </div>

          {error && <div className="pw-error">{error}</div>}
        </form>
      ) : (
        <div style={{ marginTop: 14 }}>
          <div style={styles.success}>You’re all set.</div>
          <div style={styles.sub}>
            Next step: connect your calendar (Google or Outlook). We can wire
            that in next.
          </div>

          <div style={styles.row}>
            <button
              type="button"
              style={styles.secondary}
              onClick={() => {
                setSubmitted(false)
                setError(null)
              }}
            >
              Submit another
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
