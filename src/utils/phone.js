/**
 * Normalize various phone number formats to E.164.
 * Accepts: (555) 555-5555, 555-555-5555, 555.555.5555, +1 555 555 5555,
 * 5555555555, 1-555-555-5555, etc.
 * US/Canada: 10 digits → +1xxxxxxxxxx; 11 digits starting with 1 → +1 + 10 digits.
 * @param {string} input - Raw user input (any format)
 * @returns {{ e164: string } | { error: string }} - E.164 string or validation error
 */
export function toE164(input) {
  if (input == null || typeof input !== 'string') {
    return { error: 'Phone number is required.' }
  }
  const digits = input.replace(/\D/g, '')
  if (digits.length === 0) {
    return { error: 'Enter a valid phone number.' }
  }
  if (digits.length === 10) {
    return { e164: `+1${digits}` }
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return { e164: `+1${digits.slice(1)}` }
  }
  if (digits.length > 11 && digits.startsWith('1')) {
    return { e164: `+1${digits.slice(1, 11)}` }
  }
  if (digits.length >= 11 && digits.length <= 15) {
    return { e164: `+${digits}` }
  }
  return { error: 'Enter a valid phone number (e.g. 555-555-5555 or +1 555 555 5555).' }
}
