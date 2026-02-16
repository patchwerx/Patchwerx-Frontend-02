import { useState } from 'react'
import { useBrandStyles } from '../../ui/useBrandStyles'

export default function ClientSignup() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const styles = useBrandStyles({ loading })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      // placeholder – likely invite-based
      if (!phone.trim()) throw new Error('Missing phone')
      setSubmitted(true)
      setName('')
      setPhone('')
    } catch (err) {
      setError('Signup failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h2 style={styles.h2}>Client signup</h2>

      {!submitted ? (
        <form onSubmit={submit} style={styles.form}>
          <div>
            <label style={styles.label} htmlFor="name">
              Name
            </label>
            <input
              id="name"
              style={styles.field}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>

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
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Submitting…' : 'Create account'}
          </button>

          {error && <div style={styles.error}>{error}</div>}
        </form>
      ) : (
        <p style={styles.subtleText}>Thanks — you’re set.</p>
      )}
    </div>
  )
}
