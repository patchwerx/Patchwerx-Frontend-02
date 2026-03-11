import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react'
import { useAuth } from 'react-oidc-context'
import { getRoleFromUser } from '../utils/cognitoClaims'
import {
  useManualCognitoRedirect,
  buildAuthorizeUrl,
  getRedirectUri,
  isCognitoConfigured,
  isClientPoolConfigured,
} from '../config/cognito'
import {
  loadManualSession,
  clearManualSession,
  clearStoredState,
} from '../utils/cognitoTokenExchange'

const CognitoAuthContext = createContext(null)

export function CognitoAuthProvider({ children }) {
  const auth = useAuth()
  const [manualUser, setManualUserState] = useState(() => loadManualSession())

  useEffect(() => {
    const session = loadManualSession()
    if (session) setManualUserState(session)
  }, [])

  const setManualUser = useCallback((session) => {
    setManualUserState(session)
  }, [])

  const value = useMemo(() => {
    const useManual = useManualCognitoRedirect && manualUser
    const user = useManual
      ? { profile: manualUser.profile }
      : auth.user
    const role = user ? (useManual ? manualUser.role : getRoleFromUser(auth.user)) : null

    const login = (pool = 'therapist') => {
      if (pool === 'client' && isClientPoolConfigured) {
        const url = buildAuthorizeUrl('client')
        window.location.href = url
        return Promise.resolve()
      }
      if ((pool === 'therapist' && useManualCognitoRedirect && isCognitoConfigured)) {
        const url = buildAuthorizeUrl('therapist')
        window.location.href = url
        return Promise.resolve()
      }
      return auth.signinRedirect()
    }

    const logout = () => {
      clearManualSession()
      clearStoredState()
      setManualUserState(null)
      if (auth.user) auth.signoutRedirect()
    }

    // If authenticated with no role (e.g. no Cognito group set), treat as therapist so
    // therapist login gives dashboard access. Only explicit "client" role is restricted.
    const isTherapist = role === 'therapist' || (!!user && role !== 'client')
    const isClient = role === 'client'

    return {
      user,
      isAuthenticated: !!(user && (useManual ? manualUser : !auth.error)),
      isLoading: useManual ? false : auth.isLoading,
      error: useManual ? null : auth.error,
      isTherapist,
      isClient,
      role,
      login,
      logout,
      setManualUser,
    }
  }, [auth.user, auth.error, auth.isLoading, auth.signinRedirect, auth.signoutRedirect, manualUser, setManualUser])

  return (
    <CognitoAuthContext.Provider value={value}>
      {children}
    </CognitoAuthContext.Provider>
  )
}

export function useCognitoAuth() {
  const ctx = useContext(CognitoAuthContext)
  if (!ctx) throw new Error('useCognitoAuth must be used within CognitoAuthProvider')
  return ctx
}
