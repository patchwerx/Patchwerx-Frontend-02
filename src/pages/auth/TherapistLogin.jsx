import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBrandStyles } from '../../ui/useBrandStyles'
import { auth } from '../../lib/auth'

export default function TherapistLogin() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const styles = useBrandStyles({ loading })
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      // placeholder: swap with real login API
      if (!email.trim()) throw new Error('Missing email')
      auth.setTherapistAuthed(true)
      navigate('/app')
    } catch (err) {
      setError('Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h2 style={styles.h2}>Therapist login</h2>

      <form onSubmit={submit} style={styles.form}>
        <div>
          <label style={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            style={styles.field}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        {error && <div style={styles.error}>{error}</div>}
      </form>
    </div>
  )
}
