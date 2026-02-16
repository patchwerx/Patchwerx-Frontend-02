import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TherapistSignup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const styles = useMemo(
    () => ({
      page: {
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        color: '#0b1220',
        backgroundImage: [
          'linear-gradient(180deg, rgba(2,6,23,0.72) 0%, rgba(2,6,23,0.55) 45%, rgba(2,6,23,0.72) 100%)',
          // fjord-ish / northern mountains (no snow) vibe
          'url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80")',
        ].join(', '),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      },

      shell: {
        width: '100%',
        maxWidth: '980px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '18px',
      },

      card: {
        width: '100%',
        maxWidth: '560px',
        justifySelf: 'center',
        borderRadius: '20px',
        padding: '26px',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.78))',
        border: '1px solid rgba(255,255,255,0.35)',
        boxShadow:
          '0 20px 60px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.35) inset',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      },

      brandRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        marginBottom: '10px',
      },

      brandLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      },

      logo: {
        width: '44px',
        height: '44px',
        borderRadius: '14px',
        background:
          'linear-gradient(135deg, rgba(37,99,235,0.18), rgba(16,185,129,0.18))',
        border: '1px solid rgba(2,6,23,0.08)',
        display: 'grid',
        placeItems: 'center',
      },

      logoMark: {
        width: '22px',
        height: '22px',
        borderRadius: '8px',
        background:
          'linear-gradient(135deg, rgba(37,99,235,0.95), rgba(16,185,129,0.95))',
        boxShadow: '0 10px 25px rgba(37,99,235,0.25)',
      },

      title: {
        fontSize: '1.6rem',
        lineHeight: 1.1,
        margin: 0,
        letterSpacing: '-0.02em',
        color: '#0b1220',
      },

      subtitle: {
        margin: '6px 0 0 0',
        fontSize: '0.98rem',
        lineHeight: 1.45,
        color: 'rgba(2,6,23,0.72)',
      },

      navButtons: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
      },

      linkBtn: {
        borderRadius: '14px',
        border: '1px solid rgba(2,6,23,0.12)',
        padding: '10px 12px',
        fontSize: '0.92rem',
        fontWeight: 700,
        cursor: 'pointer',
        background: 'rgba(255,255,255,0.82)',
        color: 'rgba(2,6,23,0.82)',
      },

      divider: {
        height: '1px',
        width: '100%',
        background:
          'linear-gradient(90deg, rgba(2,6,23,0.08), rgba(2,6,23,0.02), rgba(2,6,23,0.08))',
        margin: '16px 0 18px 0',
      },

      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      },

      label: {
        display: 'block',
        fontSize: '0.85rem',
        color: 'rgba(2,6,23,0.70)',
        marginBottom: '6px',
      },

      field: {
        borderRadius: '14px',
        border: '1px solid rgba(2,6,23,0.10)',
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: '12px 12px',
        outline: 'none',
        fontSize: '1rem',
        width: '100%',
        boxShadow: '0 1px 0 rgba(255,255,255,0.6) inset',
      },

      twoColRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
      },

      button: {
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.35)',
        padding: '12px 14px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: loading ? 'not-allowed' : 'pointer',
        color: '#ffffff',
        background:
          'linear-gradient(135deg, rgba(37,99,235,0.95), rgba(16,185,129,0.95))',
        boxShadow:
          '0 18px 40px rgba(2,6,23,0.18), 0 1px 0 rgba(255,255,255,0.25) inset',
        transition: 'transform 120ms ease, filter 120ms ease, opacity 120ms ease',
        opacity: loading ? 0.85 : 1,
      },

      buttonHint: {
        marginTop: '10px',
        fontSize: '0.85rem',
        color: 'rgba(2,6,23,0.60)',
      },

      error: {
        marginTop: '8px',
        padding: '10px 12px',
        borderRadius: '14px',
        background: 'rgba(220,38,38,0.08)',
        border: '1px solid rgba(220,38,38,0.18)',
        color: 'rgba(153,27,27,0.95)',
        fontSize: '0.92rem',
      },

      successWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px 0 2px',
      },

      successTitle: {
        margin: 0,
        fontSize: '1.15rem',
        fontWeight: 700,
        color: 'rgba(3,105,64,0.95)',
      },

      successText: {
        margin: 0,
        fontSize: '0.98rem',
        lineHeight: 1.5,
        color: 'rgba(2,6,23,0.70)',
      },

      secondaryButton: {
        marginTop: '8px',
        borderRadius: '14px',
        border: '1px solid rgba(2,6,23,0.12)',
        padding: '10px 12px',
        fontSize: '0.95rem',
        fontWeight: 600,
        cursor: 'pointer',
        background: 'rgba(255,255,255,0.85)',
        color: 'rgba(2,6,23,0.82)',
      },

      footer: {
        justifySelf: 'center',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.85)',
        fontSize: '0.9rem',
        marginTop: '6px',
        textShadow: '0 2px 18px rgba(0,0,0,0.35)',
      },
    }),
    [loading]
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
            actor_type: 'THERAPIST', // helpful for backend routing if you want it
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
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.card}>
          <div style={styles.brandRow}>
            <div style={styles.brandLeft}>
              <div style={styles.logo} aria-hidden="true">
                <div style={styles.logoMark} />
              </div>
              <div>
                <h1 style={styles.title}>Therapist signup</h1>
                <p style={styles.subtitle}>
                  Create your Patchwerx account to connect your calendar.
                </p>
              </div>
            </div>

            <div style={styles.navButtons}>
              <button
                type="button"
                style={styles.linkBtn}
                onClick={() => navigate('/')}
              >
                Home
              </button>
              <button
                type="button"
                style={styles.linkBtn}
                onClick={() => navigate('/login/therapist')}
              >
                Login
              </button>
            </div>
          </div>

          <div style={styles.divider} />

          {!submitted ? (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.twoColRow}>
                <div>
                  <label style={styles.label} htmlFor="firstName">
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Brandon"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    style={styles.field}
                  />
                </div>

                <div>
                  <label style={styles.label} htmlFor="lastName">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Sherrard"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    style={styles.field}
                  />
                </div>
              </div>

              <div>
                <label style={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@practice.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  style={styles.field}
                />
              </div>

              <div>
                <label style={styles.label} htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 555-5555"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoComplete="tel"
                  style={styles.field}
                />
              </div>

              <button
                type="submit"
                style={{
                  ...styles.button,
                  transform: loading ? 'none' : 'translateY(0px)',
                  filter: loading ? 'saturate(0.9)' : 'none',
                }}
                disabled={loading}
                onMouseDown={(e) => {
                  if (loading) return
                  e.currentTarget.style.transform = 'translateY(1px)'
                }}
                onMouseUp={(e) => {
                  if (loading) return
                  e.currentTarget.style.transform = 'translateY(0px)'
                }}
                onMouseLeave={(e) => {
                  if (loading) return
                  e.currentTarget.style.transform = 'translateY(0px)'
                }}
              >
                {loading ? 'Submitting…' : 'Create account'}
              </button>

              <div style={styles.buttonHint}>
                We’ll only use this to set up your Patchwerx account.
              </div>

              {error && <div style={styles.error}>{error}</div>}
            </form>
          ) : (
            <div style={styles.successWrap}>
              <p style={styles.successTitle}>You’re all set.</p>
              <p style={styles.successText}>
                Next step: connect your calendar. (You can route to an OAuth
                start page from here.)
              </p>

              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => navigate('/login/therapist')}
              >
                Go to login
              </button>

              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => {
                  setSubmitted(false)
                  setError(null)
                }}
              >
                Submit another
              </button>
            </div>
          )}
        </div>

        <div style={styles.footer}>© {new Date().getFullYear()} Patchwerx</div>
      </div>
    </div>
  )
}
