import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCognitoAuth } from '../context/CognitoAuthContext'
import { isCognitoConfigured, isClientPoolConfigured } from '../config/cognito'

export default function Login() {
  const { isAuthenticated, isTherapist, isClient, isLoading, login } = useCognitoAuth()
  const navigate = useNavigate()
  const [redirecting, setRedirecting] = useState(null) // 'therapist' | 'client' | null

  useEffect(() => {
    if (isLoading) return
    if (isAuthenticated && isTherapist) {
      navigate('/app/waitlist', { replace: true })
      return
    }
    if (isAuthenticated && isClient) {
      navigate('/client', { replace: true })
    }
  }, [isLoading, isAuthenticated, isTherapist, isClient, navigate])

  const handleTherapist = () => {
    setRedirecting('therapist')
    login('therapist').catch(() => setRedirecting(null))
  }

  const handleClient = () => {
    setRedirecting('client')
    login('client').catch(() => setRedirecting(null))
  }

  if (isLoading) {
    return (
      <div className="pw-login-page">
        <h1 className="pw-h1" style={{ margin: 0 }}>Login</h1>
        <p className="pw-lead pw-login-muted" style={{ marginTop: 12 }}>Loading…</p>
      </div>
    )
  }

  return (
    <div className="pw-login-page">
      <h1 className="pw-h1" style={{ margin: 0, marginBottom: 8 }}>Login</h1>
      <p className="pw-lead pw-login-subtitle" style={{ marginTop: 0, marginBottom: 28 }}>
        Sign in or create an account. Choose your role below.
      </p>

      <div className="pw-login-columns">
        <div
          className="pw-panel pw-login-role-panel"
          style={{
            opacity: isCognitoConfigured ? 1 : 0.6,
          }}
        >
          <h2 style={{ margin: '0 0 12px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>
            Provider
          </h2>
          <p className="pw-lead pw-login-role-lead">
            You offer appointments, connect Outlook, and manage your list of people who want openings.
          </p>
          <button
            type="button"
            className="pw-btn pw-btn-login"
            onClick={handleTherapist}
            disabled={!!redirecting || !isCognitoConfigured}
          >
            {redirecting === 'therapist' ? 'Redirecting…' : 'Sign up or sign in'}
          </button>
          {!isCognitoConfigured && (
            <p className="pw-login-error" style={{ marginTop: 12, fontSize: '0.85rem' }}>
              Not configured
            </p>
          )}
        </div>

        <div
          className="pw-panel pw-login-role-panel"
          style={{
            opacity: isClientPoolConfigured ? 1 : 0.6,
          }}
        >
          <h2 style={{ margin: '0 0 12px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>
            Guest
          </h2>
          <p className="pw-lead pw-login-role-lead">
            You’re on someone’s list for SMS about open times and can pick up a slot when it’s offered.
          </p>
          <button
            type="button"
            className="pw-btn pw-btn-login"
            onClick={handleClient}
            disabled={!!redirecting || !isClientPoolConfigured}
          >
            {redirecting === 'client' ? 'Redirecting…' : 'Sign up or sign in'}
          </button>
          {!isClientPoolConfigured && (
            <p className="pw-login-error" style={{ marginTop: 12, fontSize: '0.85rem' }}>
              Not configured
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
