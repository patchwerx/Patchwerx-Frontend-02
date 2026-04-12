/**
 * Calendar connect: confidential client flow only.
 * Microsoft redirects to the BACKEND with the auth code; the backend redeems it
 * with client_id + client_secret and then redirects the user to the frontend.
 * The frontend never sees or handles the authorization code.
 *
 * Azure: register the BACKEND callback URL as a Web redirect URI, e.g.:
 *   https://<api-id>.execute-api.<region>.amazonaws.com/<stage>/auth/microsoft/callback
 * Same redirect_uri in: Azure app registration and backend token request.
 *
 * Backend must implement GET /auth/microsoft/callback?code=...&state=...
 * - Decode state (base64url JSON): { t: therapist_id, r: return_to, f: frontend_origin }.
 * - Exchange code for tokens (client_id, client_secret, code, redirect_uri).
 * - Redirect browser to: frontend_origin + '/auth/microsoft/callback?calendar_connected=1&return_to=' + encodeURIComponent(return_to)
 *   or on error: frontend_origin + '/auth/microsoft/callback?calendar_connect_error=1&return_to=...&message=' + encodeURIComponent(msg)
 */

const clientId = process.env.REACT_APP_AAD_CLIENT_ID
const authority =
  process.env.REACT_APP_AAD_AUTHORITY || 'https://login.microsoftonline.com/common'

const tenant = (() => {
  const match = authority.match(/login\.microsoftonline\.com\/([^/]+)/)
  return match ? match[1] : 'common'
})()

const SCOPES = [
  'openid',
  'profile',
  'offline_access',
  'User.Read',
  'Calendars.Read',
  'Calendars.ReadWrite',
].join(' ')

// const SCOPES = [
//   'openid',
//   'profile',
//   'offline_access',
//   'User.Read',
//   'Calendars.Read',
// ].join(' ')

/**
 * Backend callback URL (where Microsoft redirects with the code).
 * Must match Azure Web redirect URI and the backend route that handles the redirect.
 */
export function getCalendarConnectRedirectUri() {
  const apiBase = process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, '')
  if (!apiBase) return ''
  return `${apiBase}/auth/microsoft/callback`
}

/**
 * Encode state for backend: backend will decode to get therapist_id, return_to, and frontend_origin.
 * Backend uses this to exchange the code and then redirect the user to frontend_origin + return_to.
 */
function encodeState(payload) {
  const json = JSON.stringify(payload)
  const base64 = typeof btoa !== 'undefined'
    ? btoa(unescape(encodeURIComponent(json)))
    : ''
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/**
 * Build Microsoft /authorize URL for confidential client flow.
 * redirect_uri is the BACKEND URL; state carries therapist_id and return_to for the backend.
 *
 * @param {string} redirectUri - Backend callback URL (from getCalendarConnectRedirectUri())
 * @param {{ therapistId: string, returnTo: string }} options - Backend uses these to attach the connection and redirect the user
 * @returns {{ url: string }}
 */
export function buildCalendarConnectAuthorizeUrl(redirectUri, { therapistId, returnTo }) {
  const frontendOrigin = typeof window !== 'undefined' ? window.location.origin : ''
  const state = encodeState({
    t: therapistId,
    r: returnTo || '/app/settings',
    f: frontendOrigin,
  })
  const authUrl =
    `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize?` +
    new URLSearchParams({
      client_id: clientId || '',
      response_type: 'code',
      redirect_uri: redirectUri,
      response_mode: 'query',
      scope: SCOPES,
      state,
    }).toString()
  return { url: authUrl }
}

/**
 * No-op for compatibility. State is validated by the backend in the confidential flow.
 */
export function validateAndClearCalendarConnectState() {
  return true
}

export function isCalendarConnectAuthConfigured() {
  return Boolean(clientId && process.env.REACT_APP_API_BASE_URL)
}
