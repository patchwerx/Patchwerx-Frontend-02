/**
 * Fires a POST request to the /graph/subscriptions/connect endpoint to verify the API
 * (and graphSubscriptions Lambda) is reachable and invoked.
 *
 * Usage (REST API often needs a stage in the path):
 *   $env:REACT_APP_API_BASE_URL="https://jb8wajnms2.execute-api.us-east-1.amazonaws.com/prod"; node scripts/trigger-graph-subscriptions.js
 *
 * Or set stage separately (appended to base):
 *   $env:REACT_APP_API_BASE_URL="https://jb8wajnms2.execute-api.us-east-1.amazonaws.com"; $env:STAGE="prod"; node scripts/trigger-graph-subscriptions.js
 *
 * Optional: THERAPIST_ID=uuid, REDIRECT_URI=...
 */

const base = process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, '')
const stage = process.env.STAGE?.replace(/^\//, '')
const apiBase = stage ? `${base}/${stage}` : base
const therapistId = process.env.THERAPIST_ID || '00000000-0000-0000-0000-000000000000'

if (!base) {
  console.error('Set REACT_APP_API_BASE_URL. For REST API, include stage (e.g. .../prod) or set STAGE=prod')
  process.exit(1)
}

const url = `${apiBase}/graph/subscriptions/connect`
const body = {
  therapist_id: therapistId,
  code: 'test-code-will-fail-exchange',
  redirect_uri: process.env.REDIRECT_URI || 'http://localhost:3000',
}

console.log('POST', url)
console.log('Body:', JSON.stringify(body, null, 2))

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})
  .then(async (res) => {
    console.log('Status:', res.status, res.statusText)
    const text = await res.text()
    let parsed
    try {
      parsed = JSON.parse(text)
      console.log('Response:', JSON.stringify(parsed, null, 2))
    } catch {
      console.log('Response (raw):', text)
    }
    if (!res.ok) {
      process.exitCode = 1
    }
  })
  .catch((err) => {
    console.error('Request failed:', err.message)
    process.exit(1)
  })
