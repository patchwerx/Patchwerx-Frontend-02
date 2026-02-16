import { Navigate, useLocation } from 'react-router-dom'
import { auth } from '../lib/auth'

export default function RequireAuth({ role, children }) {
  const location = useLocation()

  const ok =
    role === 'therapist' ? auth.isTherapistAuthed() : auth.isClientAuthed()

  if (!ok) {
    const to = role === 'therapist' ? '/login/therapist' : '/login/client'
    return <Navigate to={to} replace state={{ from: location.pathname }} />
  }

  return children
}
