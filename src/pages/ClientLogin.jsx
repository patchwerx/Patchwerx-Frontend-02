import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCognitoAuth } from '../context/CognitoAuthContext'
import { isClientPoolConfigured } from '../config/cognito'

const REDIRECT_ERROR_DELAY_MS = 2500

export default function ClientLogin() {
  const { isAuthenticated, isClient, isLoading, login } = useCognitoAuth()
  const navigate = useNavigate()
  const [redirectError, setRedirectError] = useState(null)
  const [redirecting, setRedirecting] = useState(false)
  const redirectErrorTimeoutRef = useRef(null)

  useEffect(() => {
    if (isLoading) return
    if (isAuthenticated && isClient) {
      navigate('/client', { replace: true })
    }
  }, [isLoading, isAuthenticated, isClient, navigate])

  useEffect(() => {
    return () => {
      if (redirectErrorTimeoutRef.current) clearTimeout(redirectErrorTimeoutRef.current)
    }
  }, [])

  const handleSignIn = async () => {
    setRedirectError(null)
    setRedirecting(true)
    try {
      await login('client')
      redirectErrorTimeoutRef.current = setTimeout(() => {
        setRedirectError('Redirect did not start. Check the browser console.')
        setRedirecting(false)
      }, REDIRECT_ERROR_DELAY_MS)
    } catch (err) {
      console.error('Sign-in redirect failed:', err)
      setRedirectError(err?.message || 'Could not start sign-in. Check the console for details.')
      setRedirecting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="pw-login-page">
        <p className="pw-login-welcome">Welcome to Patchwerx!</p>
        <h2>Guest sign-in</h2>
        <p className="pw-lead pw-login-muted">Loading…</p>
      </div>
    )
  }

  if (!isClientPoolConfigured) {
    return (
      <div className="pw-login-page">
        <p className="pw-login-welcome">Welcome to Patchwerx!</p>
        <h2>Guest sign-in</h2>
        <p className="pw-lead pw-login-error">
          Guest sign-in is not configured. Set REACT_APP_COGNITO_CLIENT_HOSTED_UI_DOMAIN and REACT_APP_COGNITO_CLIENT_CLIENT_ID in your environment.
        </p>
      </div>
    )
  }

  return (
    <div className="pw-login-page">
      <p className="pw-login-welcome">Welcome to Patchwerx!</p>
      <h2>Guest sign-in</h2>
      <p className="pw-lead pw-login-subtitle">
        For people who joined a provider’s list for SMS about openings. Click below for secure sign-in or account creation.
      </p>

      {redirectError && (
        <p className="pw-login-error-text" role="alert">
          {redirectError}
        </p>
      )}

      <button
        className="pw-btn pw-btn-login"
        type="button"
        onClick={handleSignIn}
        disabled={redirecting}
      >
        {redirecting ? 'Redirecting…' : 'Sign in or sign up'}
      </button>

      <p className="pw-login-note">
        New to the list? <Link to="/signup/client" className="pw-link">Join here</Link> first, then come back to sign in once you have an account.
      </p>
    </div>
  )
}
