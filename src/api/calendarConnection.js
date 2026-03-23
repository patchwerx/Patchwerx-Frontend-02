import { useState, useCallback, useEffect } from 'react'
import { buildApiUrl, hasApiBase } from '../utils/apiBase'

/**
 * Calendar connection API.
 *
 * Backend: GET /calendar-connection?email=<therapist email> (same pattern as /clients).
 * Response must include therapist_id so Settings can refresh the Microsoft connection.
 */

/**
 * @param {string|null} therapistEmail - Therapist email (Cognito) for auth
 * @returns {Promise<{ connection_status: string, webhook_expires_at?: string|null, last_synced_at?: string|null, reauth_required_at?: string|null, last_error?: string|null, last_error_at?: string|null, provider?: string } | null>}
 */
export async function getCalendarConnection(therapistEmail) {
  if (!hasApiBase() || !therapistEmail) return null
  const url = buildApiUrl(`/calendar-connection?email=${encodeURIComponent(therapistEmail)}`)
  const res = await fetch(url)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(res.status === 401 ? 'Unauthorized' : `Failed to load calendar connection (${res.status})`)
  const data = await res.json()
  return normalizeConnection(data)
}

/**
 * Normalize backend shape to a consistent frontend shape (snake_case from DB).
 * @param {Record<string, unknown>} raw
 */
function normalizeConnection(raw) {
  return {
    id: raw.id ?? raw.connection_id,
    therapist_id: raw.therapist_id ?? raw.therapistId ?? null,
    provider: raw.provider ?? 'MICROSOFT',
    connection_status: raw.connection_status ?? raw.status ?? 'DISCONNECTED',
    status: raw.status ?? raw.connection_status ?? 'DISCONNECTED',
    webhook_expires_at: raw.webhook_expires_at ?? null,
    last_synced_at: raw.last_synced_at ?? null,
    reauth_required_at: raw.reauth_required_at ?? null,
    last_error: raw.last_error ?? null,
    last_error_at: raw.last_error_at ?? null,
    subscription_id: raw.subscription_id ?? null,
    created_at: raw.created_at ?? null,
    updated_at: raw.updated_at ?? null,
  }
}

/**
 * React hook: fetch calendar connection for the current therapist.
 * @param {string|null} therapistEmail
 * @returns {{ connection: ReturnType<typeof normalizeConnection> | null, loading: boolean, error: string | null, refetch: () => Promise<void> }}
 */
export function useCalendarConnection(therapistEmail) {
  const [connection, setConnection] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(/** @type {string | null} */ (null))
  const apiConfigured = hasApiBase()

  const fetchConnection = useCallback(async () => {
    if (!apiConfigured || !therapistEmail) {
      setConnection(null)
      setLoading(false)
      setError(therapistEmail ? 'Missing API configuration.' : null)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await getCalendarConnection(therapistEmail)
      setConnection(data)
      if (data?.therapist_id) {
        localStorage.setItem('pw_therapist_id', data.therapist_id)
      }
    } catch (e) {
      setConnection(null)
      const msg = e?.message ?? 'Could not load calendar connection.'
      const isCorsOrNetwork = msg === 'Failed to fetch' || (typeof msg === 'string' && msg.toLowerCase().includes('cors'))
      setError(isCorsOrNetwork
        ? 'Calendar connection request failed (CORS or network). For local dev, set REACT_APP_DEV_PROXY=1 in .env.local, or configure API Gateway CORS for http://localhost:3000.'
        : msg)
    } finally {
      setLoading(false)
    }
  }, [apiConfigured, therapistEmail])

  useEffect(() => {
    fetchConnection()
  }, [fetchConnection])

  return { connection, loading, error, refetch: fetchConnection }
}
