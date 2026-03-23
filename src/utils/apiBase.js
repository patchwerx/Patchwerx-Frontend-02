/**
 * Build URLs for calls to REACT_APP_API_BASE_URL.
 *
 * In **development**, set `REACT_APP_DEV_PROXY=1` in `.env.local` so requests go to
 * `/__pw-api/...` on the same origin; `setupProxy.js` forwards them to the real API.
 * That avoids browser CORS when API Gateway does not send Access-Control-Allow-Origin.
 *
 * In **production**, URLs are always absolute (`https://...execute-api.../path`).
 */

/**
 * @returns {boolean}
 */
export function hasApiBase() {
  return Boolean(String(process.env.REACT_APP_API_BASE_URL || '').trim())
}

/**
 * @param {string} pathAndQuery - Must start with `/`, e.g. `/client/profile?email=x`
 * @returns {string}
 */
export function buildApiUrl(pathAndQuery) {
  const base = String(process.env.REACT_APP_API_BASE_URL || '').replace(/\/$/, '')
  const path = pathAndQuery.startsWith('/') ? pathAndQuery : `/${pathAndQuery}`

  const useDevProxy =
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_DEV_PROXY === '1' &&
    base

  if (useDevProxy) {
    return `/__pw-api${path}`
  }

  if (!base) {
    return path
  }

  return `${base}${path}`
}
