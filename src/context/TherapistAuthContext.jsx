import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'pw_therapist_session'

const TherapistAuthContext = createContext(null)

export function TherapistAuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const loadSession = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const data = JSON.parse(raw)
      if (data?.email) setUser({ email: data.email })
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    loadSession()
  }, [loadSession])

  const login = useCallback((email) => {
    const trimmed = (email || '').trim().toLowerCase()
    if (!trimmed) return false
    const session = { email: trimmed, createdAt: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    setUser({ email: trimmed })
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  }

  return (
    <TherapistAuthContext.Provider value={value}>
      {children}
    </TherapistAuthContext.Provider>
  )
}

export function useTherapistAuth() {
  const ctx = useContext(TherapistAuthContext)
  if (!ctx) throw new Error('useTherapistAuth must be used within TherapistAuthProvider')
  return ctx
}
