/**
 * @typedef {Object} CalendarConnection
 * @property {string} [id]
 * @property {string} [therapist_id]
 * @property {'GOOGLE'|'MICROSOFT'} [provider]
 * @property {'CONNECTED'|'NEEDS_REAUTH'|'DISCONNECTED'} connection_status
 * @property {'CONNECTED'|'NEEDS_REAUTH'|'DISCONNECTED'} [status]
 * @property {string|null} [webhook_expires_at] - ISO datetime
 * @property {string|null} [last_synced_at] - ISO datetime
 * @property {string|null} [reauth_required_at] - ISO datetime
 * @property {string|null} [last_error]
 * @property {string|null} [last_error_at] - ISO datetime
 * @property {string|null} [subscription_id]
 * @property {string|null} [created_at]
 * @property {string|null} [updated_at]
 */

export {}
