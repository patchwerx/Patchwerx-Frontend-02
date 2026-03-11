import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCognitoAuth } from '../context/CognitoAuthContext'
import { isClientPoolConfigured } from '../config/cognito'

export default function ClientLogin() {
  const { isAuthenticated, isClient, isLoading, login } = useCognitoAuth()
  const navigate = useNavigate()
  const [redirectError, setRedirectError] = useState(null)
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (isLoading) return
    if (isAuthenticated && isClient) {
      navigate('/client', { replace: true })
    }
  }, [isLoading, isAuthenticated, isClient, navigate])

  const handleSignIn = async () => {
    setRedirectError(null)
    setRedirecting(true)
    try {
      await login('client')
      setRedirectError('Redirect did not start. Check the browser console.')
    } catch (err) {
      console.error('Sign-in redirect failed:', err)
      setRedirectError(err?.message || 'Could not start sign-in. Check the console for details.')
    } finally {
      setRedirecting(false)
    }
  }

  if (isLoading) {
    return (
      <div>
        <h2>Client login</h2>
        <p className="pw-lead">Loading…</p>
      </div>
    )
  }

  if (!isClientPoolConfigured) {
    return (
      <div>
        <h2>Client login</h2>
        <p className="pw-lead" style={{ color: 'var(--error)' }}>
          Client sign-in is not configured. Set REACT_APP_COGNITO_CLIENT_HOSTED_UI_DOMAIN and REACT_APP_COGNITO_CLIENT_CLIENT_ID in your environment.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2>Client login</h2>
      <p className="pw-lead">
        Sign in to view your account and preferences.
      </p>

      {redirectError && (
        <p className="pw-lead" style={{ marginBottom: 12, color: 'var(--error)', fontSize: '0.9rem' }}>
          {redirectError}
        </p>
      )}

      <button
        className="pw-btn"
        type="button"
        onClick={handleSignIn}
        disabled={redirecting}
      >
        {redirecting ? 'Redirecting…' : 'Sign in with Patchwerx'}
      </button>
    </div>
  )
}
