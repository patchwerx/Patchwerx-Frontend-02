/**
 * Client dashboard / profile — therapist name + appointments.
 *
 * URL: GET {REACT_APP_API_BASE_URL}/client/profile?email={client_email}
 * (In dev with REACT_APP_DEV_PROXY=1, uses /__pw-api/client/profile — see src/utils/apiBase.js)
 *
 * Response JSON (snake_case or camelCase accepted):
 * {
 *   "therapist": { "first_name": "Jane", "last_name": "Smith" },
 *   "appointments": [
 *     { "id": "uuid", "status": "CONFIRMED" | "OPEN_REBOOKING", "starts_at": "...", "title": "Session" }
 *   ]
 * }
 */

import { buildApiUrl, hasApiBase } from '../utils/apiBase'

/**
 * @param {string|null} clientEmail - Signed-in client Cognito email
 * @returns {Promise<{ therapist: { first_name: string, last_name: string }, appointments: object[] } | null>}
 */
export async function getClientProfile(clientEmail) {
  if (!hasApiBase() || !clientEmail) return null

  const url = buildApiUrl(`/client/profile?email=${encodeURIComponent(clientEmail)}`)
  const res = await fetch(url)
  if (res.status === 401) throw new Error('Unauthorized')
  if (!res.ok) {
    const text = await res.text()
    let msg = `Request failed (${res.status})`
    try {
      const j = text ? JSON.parse(text) : null
      msg = j?.message ?? j?.error ?? msg
    } catch {
      if (text) msg = text.slice(0, 200)
    }
    throw new Error(msg)
  }

  const data = await res.json()
  const therapistRaw = data?.therapist ?? data?.therapist_profile ?? {}
  const therapist = {
    first_name: therapistRaw.first_name ?? therapistRaw.firstName ?? '',
    last_name: therapistRaw.last_name ?? therapistRaw.lastName ?? '',
  }

  const rawList = Array.isArray(data?.appointments)
    ? data.appointments
    : Array.isArray(data?.appointment_list)
      ? data.appointment_list
      : []

  const appointments = rawList.map((a, i) => ({
    id: a.id ?? a.appointment_id ?? `apt-${i}`,
    status: String(a.status ?? a.appointment_status ?? '').toUpperCase(),
    starts_at: a.starts_at ?? a.startsAt ?? a.start_time ?? a.startTime ?? null,
    ends_at: a.ends_at ?? a.endsAt ?? a.end_time ?? null,
    title: a.title ?? a.label ?? 'Session',
  }))

  return { therapist, appointments }
}
