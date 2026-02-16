import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBrandStyles } from '../../ui/useBrandStyles'
import { auth } from '../../lib/auth'

export default function ClientLogin() {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const styles = useBrandStyles({ loading })
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (!phone.trim()) throw new Error('Missing phone')
      auth.setClientAuthed(true)
      navigate('/client')
    } catch (err) {
      setError('Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h2 style={styles.h2}>Client login</h2>

      <form onSubmit={submit} style={styles.form}>
        <div>
          <label style={styles.label} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            style={styles.field}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            autoComplete="tel"
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
