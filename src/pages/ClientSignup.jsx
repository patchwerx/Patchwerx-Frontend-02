import { useState } from 'react'
import { useBrandStyles } from '../ui/useBrandStyles'

export default function ClientSignup() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [therapistPhone, setTherapistPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const styles = useBrandStyles({ loading })
  const apiBase = process.env.REACT_APP_API_BASE_URL

  const parseJsonSafe = async (resp) => {
    try {
      return await resp.json()
    } catch {
      return null
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!apiBase) throw new Error('Missing REACT_APP_API_BASE_URL')
      if (!email.trim()) throw new Error('Missing email')
      if (!phone.trim()) throw new Error('Missing phone')
      if (!therapistPhone.trim()) throw new Error('Missing therapist phone')

      const response = await fetch(`${apiBase.replace(/\/$/, '')}/clientSignup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim(),
          therapist_phone: therapistPhone.trim(),
          actor_type: 'CLIENT',
        }),
      })

      const data = await parseJsonSafe(response)

      if (!response.ok) {
        const msg = data?.error || data?.message || 'Signup failed'
        throw new Error(msg)
      }

      setSubmitted(true)
      setEmail('')
      setPhone('')
      setTherapistPhone('')
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

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h2 style={styles.h2}>Join the waitlist</h2>

      {!submitted ? (
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
              required
            />
          </div>

          <div>
            <label style={styles.label} htmlFor="phone">
              Your phone number
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

          <div>
            <label style={styles.label} htmlFor="therapistPhone">
              Your therapist&apos;s phone number
            </label>
            <input
              id="therapistPhone"
              style={styles.field}
              value={therapistPhone}
              onChange={(e) => setTherapistPhone(e.target.value)}
              type="tel"
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Submitting…' : 'Join waitlist'}
          </button>

          {error && <div style={styles.error}>{error}</div>}
        </form>
      ) : (
        <p style={styles.subtleText}>Thanks — you&apos;re on the waitlist.</p>
      )}
    </div>
  )
}