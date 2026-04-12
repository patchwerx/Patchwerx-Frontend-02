import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCognitoAuth } from '../context/CognitoAuthContext'
import { isCognitoConfigured } from '../config/cognito'

const REDIRECT_ERROR_DELAY_MS = 2500

export default function TherapistLogin() {
  const { isAuthenticated, isTherapist, isLoading, login } = useCognitoAuth()
  const navigate = useNavigate()
  const [redirectError, setRedirectError] = useState(null)
  const [redirecting, setRedirecting] = useState(false)
  const redirectErrorTimeoutRef = useRef(null)

  useEffect(() => {
    if (isLoading) return
    if (isAuthenticated && isTherapist) {
      navigate('/app/waitlist', { replace: true })
    }
  }, [isLoading, isAuthenticated, isTherapist, navigate])

  useEffect(() => {
    return () => {
      if (redirectErrorTimeoutRef.current) clearTimeout(redirectErrorTimeoutRef.current)
    }
  }, [])

  const handleSignIn = async () => {
    setRedirectError(null)
    setRedirecting(true)
    try {
      await login()
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
        <h2>Provider sign-in</h2>
        <p className="pw-lead pw-login-muted">Loading…</p>
      </div>
    )
  }

  if (!isCognitoConfigured) {
    return (
      <div className="pw-login-page">
        <p className="pw-login-welcome">Welcome to Patchwerx!</p>
        <h2>Provider sign-in</h2>
        <p className="pw-lead pw-login-error">
          Sign-in is not configured. Set REACT_APP_COGNITO_HOSTED_UI_DOMAIN and REACT_APP_COGNITO_CLIENT_ID in your environment.
        </p>
      </div>
    )
  }

  return (
    <div className="pw-login-page">
      <p className="pw-login-welcome">Welcome to Patchwerx!</p>
      <h2>Provider sign-in</h2>
      <p className="pw-lead pw-login-subtitle">
        For people who publish appointments and connect Outlook. Click below to open our secure sign-in—sign in or create an account in one flow.
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
        Prefer to set up your account first? <Link to="/signup/therapist" className="pw-link">Start setup</Link>, then come back here to sign in anytime.
      </p>
    </div>
  )
}
