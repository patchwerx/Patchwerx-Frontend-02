import { cognitoConfig, cognitoClientPoolConfig } from '../config/cognito'
import { getRoleFromProfile } from './cognitoClaims'

const MANUAL_SESSION_KEY = 'pw_cognito_user'
const STATE_KEY = 'pw_cognito_state'
const POOL_KEY = 'pw_cognito_pool'

function decodeJwtPayload(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    return payload
  } catch {
    return null
  }
}

/**
 * Exchange authorization code for tokens. Uses Cognito Hosted UI token endpoint.
 * @param {string} code - Authorization code from callback URL
 * @param {string} redirectUri - Must match the redirect_uri used in the authorize request
 * @param {'therapist' | 'client'} [pool='therapist'] - Which user pool (determines token endpoint)
 * @returns {Promise<{ profile: object, role: string|null, id_token: string }>}
 */
export async function exchangeCodeForTokens(code, redirectUri, pool = 'therapist') {
  const config = pool === 'client' ? cognitoClientPoolConfig : cognitoConfig
  const { hostedUiDomain, clientId } = config
  if (!hostedUiDomain || !clientId) throw new Error(`Cognito ${pool} pool not configured`)

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    code,
    redirect_uri: redirectUri,
  })

  const res = await fetch(`${hostedUiDomain}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Token exchange failed: ${res.status} ${text}`)
  }

  const data = await res.json()
  const idToken = data.id_token
  if (!idToken) throw new Error('No id_token in response')

  const profile = decodeJwtPayload(idToken)
  if (!profile) throw new Error('Invalid id_token')

  const roleFromToken = getRoleFromProfile(profile)
  const role = roleFromToken ?? (pool === 'client' ? 'client' : 'therapist')
  return { profile, role, id_token: idToken }
}

export function getStoredState() {
  try {
    return sessionStorage.getItem(STATE_KEY)
  } catch {
    return null
  }
}

export function getStoredPool() {
  try {
    const p = sessionStorage.getItem(POOL_KEY)
    return p === 'client' ? 'client' : 'therapist'
  } catch {
    return 'therapist'
  }
}

export function clearStoredState() {
  try {
    sessionStorage.removeItem(STATE_KEY)
    sessionStorage.removeItem(POOL_KEY)
  } catch {}
}

export function saveManualSession(profile, role) {
  try {
    sessionStorage.setItem(MANUAL_SESSION_KEY, JSON.stringify({ profile, role }))
  } catch {}
}

export function loadManualSession() {
  try {
    const raw = sessionStorage.getItem(MANUAL_SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearManualSession() {
  try {
    sessionStorage.removeItem(MANUAL_SESSION_KEY)
  } catch {}
}
