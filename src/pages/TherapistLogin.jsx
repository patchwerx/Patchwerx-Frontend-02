import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTherapistAuth } from '../context/TherapistAuthContext'

export default function TherapistLogin() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const { login } = useTherapistAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/app'

  const submit = (e) => {
    e.preventDefault()
    setError(null)
    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }
    if (login(email.trim())) {
      navigate(redirectTo, { replace: true })
    } else {
      setError('Please enter a valid email.')
    }
  }

  return (
    <div>
      <h2>Therapist login</h2>
      <p className="pw-lead">
        Sign in to access your dashboard and waitlist.
      </p>

      <form className="pw-form" onSubmit={submit}>
        <div>
          <label className="pw-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="pw-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@practice.com"
            required
            autoComplete="email"
          />
        </div>
        {error && (
          <p className="pw-lead" style={{ margin: 0, color: 'var(--error)', fontSize: '0.9rem' }}>
            {error}
          </p>
        )}
        <button className="pw-btn" type="submit">
          Sign in
        </button>
      </form>
    </div>
  )
}
