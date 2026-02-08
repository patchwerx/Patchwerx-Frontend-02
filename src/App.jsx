import { useState } from 'react'

export default function App() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // For now just log — later this hits API Gateway
    console.log('Submitted:', { email, phone })

    setSubmitted(true)
    setEmail('')
    setPhone('')
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

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      ) : (
        <p style={styles.confirmation}>
          Thanks! We’ll be in touch.
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
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#f8fafc',
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
    color: 'white',
    cursor: 'pointer',
  },
  confirmation: {
    fontSize: '1.1rem',
    color: '#16a34a',
  },
}
