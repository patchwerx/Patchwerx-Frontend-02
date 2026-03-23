/**
 * CRA dev server only. Proxies /__pw-api/* → REACT_APP_API_BASE_URL (see src/utils/apiBase.js).
 * Enable with REACT_APP_DEV_PROXY=1 in .env.local
 */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function setupProxy(app) {
  const raw = process.env.REACT_APP_API_BASE_URL
  if (!raw || process.env.REACT_APP_DEV_PROXY !== '1') return

  const target = String(raw).replace(/\/$/, '')

  app.use(
    '/__pw-api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: true,
      pathRewrite: { '^/__pw-api': '' },
    })
  )
}
