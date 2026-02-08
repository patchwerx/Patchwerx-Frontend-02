import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/userSignUp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            phone,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Signup failed')
      }

      setSubmitted(true)
      setEmail('')
      setPhone('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Patchwerx</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Submitting…' : 'Submit'}
          </button>

          {error && <p style={styles.error}>{error}</p>}
        </form>
      ) : (
        <p style={styles.confirmation}>
          Thanks — we’ll be in touch.
        </p>
      )}
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  form: {
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
  },
  confirmation: {
    fontSize: '1.1rem',
    color: '#16a34a',
  },
  error: {
    color: '#dc2626',
    fontSize: '0.9rem',
  },
}

export default App
