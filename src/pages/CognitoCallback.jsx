import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'
import { useCognitoAuth } from '../context/CognitoAuthContext'
import { getRoleFromUser } from '../utils/cognitoClaims'
import {
  useManualCognitoRedirect,
  getRedirectUri,
  isCognitoConfigured,
  isClientPoolConfigured,
} from '../config/cognito'
import {
  exchangeCodeForTokens,
  getStoredState,
  getStoredPool,
  clearStoredState,
  saveManualSession,
} from '../utils/cognitoTokenExchange'

export default function CognitoCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const auth = useAuth()
  const { setManualUser } = useCognitoAuth()
  const [error, setError] = useState(null)

  const code = searchParams.get('code')
  const state = searchParams.get('state')

  useEffect(() => {
    if (error) return

    if (code && state) {
      const storedState = getStoredState()
      const pool = getStoredPool()
      clearStoredState()
      if (storedState !== state) {
        setError('Invalid state. Please try signing in again.')
        return
      }
      const poolConfigured = pool === 'client' ? isClientPoolConfigured : (useManualCognitoRedirect && isCognitoConfigured)
      if (!poolConfigured) {
        setError('Sign-in configuration error. Please try again.')
        return
      }
      exchangeCodeForTokens(code, getRedirectUri(), pool)
        .then(({ profile, role }) => {
          saveManualSession(profile, role)
          setManualUser({ profile, role })
          if (role === 'therapist') navigate('/app', { replace: true })
          else if (role === 'client') navigate('/client', { replace: true })
          else navigate('/', { replace: true })
        })
        .catch((err) => {
          console.error('Token exchange failed:', err)
          setError(err?.message || 'Sign-in failed')
        })
      return
    }

    if (auth.error) {
      setError(auth.error.message || 'Sign-in failed')
      return
    }
    if (!auth.isLoading && auth.user) {
      const role = getRoleFromUser(auth.user)
      if (role === 'therapist') navigate('/app', { replace: true })
      else if (role === 'client') navigate('/client', { replace: true })
      else navigate('/', { replace: true })
    }
  }, [code, state, auth.isLoading, auth.user, auth.error, navigate, setManualUser])

  if (error) {
    return (
      <div className="pw-card pw-route" style={{ padding: 24 }}>
        <h2>Sign-in error</h2>
        <p className="pw-lead" style={{ color: 'var(--error)' }}>{error}</p>
        <a href="/" className="pw-link">Return home</a>
      </div>
    )
  }

  return (
    <div className="pw-card pw-route" style={{ padding: 24 }}>
      <p className="pw-lead">Completing sign-in…</p>
    </div>
  )
}
