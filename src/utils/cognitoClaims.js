/**
 * Derive role from a plain profile object (e.g. decoded JWT payload).
 * @param {Record<string, unknown>} profile
 * @returns {'therapist' | 'client' | null}
 */
export function getRoleFromProfile(profile) {
  if (!profile || typeof profile !== 'object') return null
  const groups = profile['cognito:groups']
  if (Array.isArray(groups)) {
    if (groups.some((g) => String(g).toLowerCase() === 'therapists')) return 'therapist'
    if (groups.some((g) => String(g).toLowerCase() === 'clients')) return 'client'
  }
  if (typeof groups === 'string' && groups.toLowerCase() === 'therapists') return 'therapist'
  if (typeof groups === 'string' && groups.toLowerCase() === 'clients') return 'client'
  const customRole = profile['custom:role']
  if (customRole) {
    const r = String(customRole).toLowerCase()
    if (r === 'therapist') return 'therapist'
    if (r === 'client') return 'client'
  }
  return null
}

/**
 * Derive therapist/client role from Cognito user (ID token claims).
 * Supports:
 * - cognito:groups containing "therapists" or "clients"
 * - custom:role attribute "therapist" or "client"
 * @param {import('oidc-client-ts').User} user - User from useAuth()
 * @returns {'therapist' | 'client' | null}
 */
export function getRoleFromUser(user) {
  if (!user?.profile) return null
  return getRoleFromProfile(user.profile)
}
