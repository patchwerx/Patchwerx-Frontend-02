// Minimal placeholder auth. Replace with real JWT/session logic.
const THERAPIST_KEY = 'pw_is_therapist_authed'
const CLIENT_KEY = 'pw_is_client_authed'

export const auth = {
  isTherapistAuthed() {
    return localStorage.getItem(THERAPIST_KEY) === 'true'
  },
  isClientAuthed() {
    return localStorage.getItem(CLIENT_KEY) === 'true'
  },
  setTherapistAuthed(v) {
    localStorage.setItem(THERAPIST_KEY, v ? 'true' : 'false')
  },
  setClientAuthed(v) {
    localStorage.setItem(CLIENT_KEY, v ? 'true' : 'false')
  },
}
