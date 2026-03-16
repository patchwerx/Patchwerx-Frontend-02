import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const RETURN_KEY = 'pw_ms_reconnect_return'
const PENDING_KEY = 'pw_ms_connect_pending'

/**
 * Confidential client flow: the user never lands here with a code from Microsoft.
 * Microsoft redirects to the BACKEND; the backend exchanges the code and then
 * redirects the user here with ?calendar_connected=1&return_to=... or
 * ?calendar_connect_error=1&return_to=...&message=...
 *
 * This page only handles that success/error redirect and sends the user to return_to.
 */
export default function MicrosoftCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState(null)

  const calendarConnected = searchParams.get('calendar_connected')
  const calendarConnectError = searchParams.get('calendar_connect_error')
  const returnTo = searchParams.get('return_to') || sessionStorage.getItem(RETURN_KEY) || '/app/settings'
  const message = searchParams.get('message')

  useEffect(() => {
    if (calendarConnected === '1') {
      localStorage.setItem('pw_ms_connected', 'true')
      sessionStorage.removeItem(PENDING_KEY)
      sessionStorage.removeItem(RETURN_KEY)
      setStatus('success')
      navigate(returnTo, { replace: true })
      return
    }

    if (calendarConnectError === '1') {
      setStatus('error')
      setErrorMessage(decodeURIComponent(message || 'Calendar connection failed.'))
      return
    }

    // No backend redirect params: user may have bookmarked this URL or arrived by mistake.
    setStatus('error')
    setErrorMessage('No calendar connection result. Start calendar connection from Settings or therapist setup.')
  }, [calendarConnected, calendarConnectError, returnTo, message, navigate])

  if (status === 'error') {
    return (
      <div className="pw-card pw-route" style={{ padding: 28 }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '1.25rem' }}>
          Calendar connection failed
        </h2>
        <p style={{ color: 'var(--error)', margin: '0 0 16px' }}>
          {errorMessage}
        </p>
        <a href="/signup/therapist" className="pw-link">
          Back to therapist setup
        </a>
        {' · '}
        <a href="/app/settings" className="pw-link">
          Calendar
        </a>
      </div>
    )
  }

  return (
    <div className="pw-card pw-route" style={{ padding: 28 }}>
      <p className="pw-lead" style={{ margin: 0 }}>
        Completing calendar connection…
      </p>
    </div>
  )
}
