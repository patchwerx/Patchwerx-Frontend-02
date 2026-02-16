import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import PublicLayout from '../layouts/PublicLayout'
import TherapistAppLayout from '../layouts/TherapistAppLayout'
import ClientAppLayout from '../layouts/ClientAppLayout'
import RequireAuth from './RequireAuth'

import Home from '../pages/public/Home'
import About from '../pages/public/About'
import Pricing from '../pages/public/Pricing'
import Contact from '../pages/public/Contact'

import TherapistSignup from '../pages/auth/TherapistSignup'
import TherapistLogin from '../pages/auth/TherapistLogin'
import ClientSignup from '../pages/auth/ClientSignup'
import ClientLogin from '../pages/auth/ClientLogin'

import TherapistDashboard from '../pages/therapist/Dashboard'
import Waitlist from '../pages/therapist/Waitlist'
import Settings from '../pages/therapist/Settings'
import Billing from '../pages/therapist/Billing'

import ClientProfile from '../pages/client/Profile'
import ClientPreferences from '../pages/client/Preferences'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth */}
          <Route path="/signup/therapist" element={<TherapistSignup />} />
          <Route path="/login/therapist" element={<TherapistLogin />} />
          <Route path="/signup/client" element={<ClientSignup />} />
          <Route path="/login/client" element={<ClientLogin />} />
        </Route>

        {/* Therapist app */}
        <Route
          path="/app"
          element={
            <RequireAuth role="therapist">
              <TherapistAppLayout />
            </RequireAuth>
          }
        >
          <Route index element={<TherapistDashboard />} />
          <Route path="waitlist" element={<Waitlist />} />
          <Route path="settings" element={<Settings />} />
          <Route path="billing" element={<Billing />} />
        </Route>

        {/* Client app */}
        <Route
          path="/client"
          element={
            <RequireAuth role="client">
              <ClientAppLayout />
            </RequireAuth>
          }
        >
          <Route index element={<ClientProfile />} />
          <Route path="preferences" element={<ClientPreferences />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
