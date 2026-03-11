/**
 * AWS Cognito config.
 * Therapist pool: REACT_APP_COGNITO_HOSTED_UI_DOMAIN + REACT_APP_COGNITO_CLIENT_ID
 * Client pool (separate): REACT_APP_COGNITO_CLIENT_HOSTED_UI_DOMAIN + REACT_APP_COGNITO_CLIENT_CLIENT_ID
 * Optional: REACT_APP_COGNITO_REDIRECT_URI (defaults to origin + /auth/callback).
 */
const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID || ''
const hostedUiDomain = (process.env.REACT_APP_COGNITO_HOSTED_UI_DOMAIN || '').replace(/\/$/, '')

const clientPoolClientId = process.env.REACT_APP_COGNITO_CLIENT_CLIENT_ID || ''
const clientPoolHostedUiDomain = (process.env.REACT_APP_COGNITO_CLIENT_HOSTED_UI_DOMAIN || '').replace(/\/$/, '')

export function getRedirectUri() {
  return (
    process.env.REACT_APP_COGNITO_REDIRECT_URI ||
    (typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '')
  )
}

const redirectUri = getRedirectUri()

/**
 * Same Hosted UI authorize URL pattern for both therapist and client pools.
 * Uses Classic Hosted UI: /oauth2/authorize with authorization code.
 */
const AUTHORIZE_SCOPE = 'openid email'

export function buildAuthorizeUrl(pool = 'therapist') {
  const state = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
  sessionStorage.setItem('pw_cognito_state', state)
  sessionStorage.setItem('pw_cognito_pool', pool)

  const isClientPool = pool === 'client'
  const domain = isClientPool ? clientPoolHostedUiDomain : hostedUiDomain
  const cid = isClientPool ? clientPoolClientId : clientId

  const redirectUri = getRedirectUri()
  const params = new URLSearchParams({
    client_id: cid,
    response_type: 'code',
    scope: AUTHORIZE_SCOPE,
    redirect_uri: redirectUri,
    state,
  })
  const url = `${domain}/oauth2/authorize?${params.toString()}`

  if (process.env.NODE_ENV === 'development' && isClientPool) {
    console.log('[Cognito client login]', { pool: 'client', domain, client_id: cid, redirect_uri: redirectUri, url })
  }

  return url
}

export const cognitoConfig = {
  clientId,
  hostedUiDomain,
  redirectUri,
  scope: 'openid email phone profile',
}

export const cognitoClientPoolConfig = {
  clientId: clientPoolClientId,
  hostedUiDomain: clientPoolHostedUiDomain,
  redirectUri,
  scope: AUTHORIZE_SCOPE,
}

/** Use manual Hosted UI redirect. Therapist pool. */
export const useManualCognitoRedirect = Boolean(hostedUiDomain && clientId)
export const isCognitoConfigured = Boolean(hostedUiDomain && clientId && redirectUri)

/** Client pool configured (for client login). */
export const isClientPoolConfigured = Boolean(clientPoolHostedUiDomain && clientPoolClientId)

// Legacy OIDC config for react-oidc-context (used when not using manual redirect)
const region = process.env.REACT_APP_COGNITO_REGION || 'us-east-1'
const userPoolId = process.env.REACT_APP_COGNITO_USER_POOL_ID || ''
const authority =
  process.env.REACT_APP_COGNITO_AUTHORITY ||
  (userPoolId && region ? `https://cognito-idp.${region}.amazonaws.com/${userPoolId}` : '')

export const cognitoOidcConfig = {
  authority,
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: 'code',
  scope: 'openid email phone profile',
  automaticSilentRenew: true,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname)
  },
}
