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

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 24,
          width: '100%',
        }}
      >
        <div
          className="pw-panel"
          style={{
            padding: 24,
            textAlign: 'center',
            opacity: isCognitoConfigured ? 1 : 0.6,
            minWidth: 605,
            flex: '1 1 0',
          }}
        >
          <h2 style={{ margin: '0 0 12px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>
            Therapist
          </h2>
          <p className="pw-lead" style={{ margin: '0 0 20px', marginLeft: 45, fontSize: '0.95rem', color: 'var(--ink-muted)', textAlign: 'center' }}>
            For practice owners and clinicians.
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
          className="pw-panel"
          style={{
            padding: 24,
            textAlign: 'center',
            opacity: isClientPoolConfigured ? 1 : 0.6,
            minWidth: 605,
            flex: '1 1 0',
          }}
        >
          <h2 style={{ margin: '0 0 12px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>
            Client
          </h2>
          <p className="pw-lead" style={{ margin: '0 0 20px', marginLeft: 45, fontSize: '0.95rem', color: 'var(--ink-muted)', textAlign: 'center' }}>
            For clients on a therapist’s waitlist.
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
