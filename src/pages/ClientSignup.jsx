import { useState } from 'react'
import { useBrandStyles } from '../ui/useBrandStyles'
import { toE164 } from '../utils/phone'
import { buildApiUrl, hasApiBase } from '../utils/apiBase'

export default function ClientSignup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [therapistPhone, setTherapistPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const styles = useBrandStyles({ loading })
  const apiConfigured = hasApiBase()

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
      if (!apiConfigured) throw new Error('Missing REACT_APP_API_BASE_URL')
      if (!email.trim()) throw new Error('Missing email')
      if (!phone.trim()) throw new Error('Missing your phone number')
      if (!therapistPhone.trim()) throw new Error('Missing therapist phone number')

      const clientResult = toE164(phone)
      if (clientResult.error) throw new Error(clientResult.error)
      const therapistResult = toE164(therapistPhone)
      if (therapistResult.error) throw new Error(`Therapist phone: ${therapistResult.error}`)

      const phone_e164 = clientResult.e164
      const therapist_phone_e164 = therapistResult.e164

      const response = await fetch(buildApiUrl('/clientSignup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName.trim() || null,
          last_name: lastName.trim() || null,
          email: email.trim(),
          phone_e164,
          therapist_phone_e164,
          phone: phone_e164,
          therapist_phone: therapist_phone_e164,
          actor_type: 'CLIENT',
        }),
      })

      const data = await parseJsonSafe(response)

      if (!response.ok) {
        const msg = data?.error || data?.message || 'Signup failed'
        throw new Error(msg)
      }

      setSubmitted(true)
      setFirstName('')
      setLastName('')
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
          <div style={styles.twoColRow}>
            <div>
              <label style={styles.label} htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                style={styles.field}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                autoComplete="given-name"
                placeholder="First name"
              />
            </div>
            <div>
              <label style={styles.label} htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                style={styles.field}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
              />
            </div>
          </div>

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
              placeholder="(555) 555-5555 or 555-555-5555"
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
              placeholder="(555) 555-5555 or 555-555-5555"
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