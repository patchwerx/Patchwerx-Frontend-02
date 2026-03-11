import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCognitoAuth } from '../context/CognitoAuthContext'
import { isCognitoConfigured, getRedirectUri } from '../config/cognito'

export default function TherapistLogin() {
  const { isAuthenticated, isTherapist, isLoading, login } = useCognitoAuth()
  const navigate = useNavigate()
  const [redirectError, setRedirectError] = useState(null)
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (isLoading) return
    if (isAuthenticated && isTherapist) {
      navigate('/app', { replace: true })
    }
  }, [isLoading, isAuthenticated, isTherapist, navigate])

  const handleSignIn = async () => {
    setRedirectError(null)
    setRedirecting(true)
    try {
      await login()
      // If we get here without redirecting, something is wrong (e.g. discovery failed)
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
        <h2>Therapist login</h2>
        <p className="pw-lead">Loading…</p>
      </div>
    )
  }

  if (!isCognitoConfigured) {
    return (
      <div>
        <h2>Therapist login</h2>
        <p className="pw-lead" style={{ color: 'var(--error)' }}>
          Sign-in is not configured. Set REACT_APP_COGNITO_HOSTED_UI_DOMAIN and REACT_APP_COGNITO_CLIENT_ID in your environment.
        </p>
      </div>
    )
  }

  const callbackUrl = getRedirectUri()

  return (
    <div>
      <h2>Therapist login</h2>
      <p className="pw-lead">
        Sign in with your Patchwerx account to access your dashboard and waitlist.
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

      <p className="pw-lead" style={{ marginTop: 24, fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
        If Cognito shows &quot;something went wrong&quot;, add this <strong>exact</strong> callback URL in AWS Cognito → App integration → your app → Hosted UI → Allowed callback URLs:
        <br />
        <code style={{ wordBreak: 'break-all', display: 'inline-block', marginTop: 6 }}>
          {callbackUrl}
        </code>
        <br />
        Also enable <strong>Authorization code grant</strong> under Allowed OAuth Flows.
      </p>
    </div>
  )
}
