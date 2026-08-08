import { BrowserRouter, Routes, Route, NavLink, Link, Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CognitoAuthProvider, useCognitoAuth } from './context/CognitoAuthContext'
import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import TherapistSignup from './pages/TherapistSignup'
import ClientSignup from './pages/ClientSignup'
import Login from './pages/Login'
import Waitlist from './pages/Waitlist'
import Settings from './pages/Settings'
import CognitoCallback from './pages/CognitoCallback'
import MicrosoftCallback from './pages/MicrosoftCallback'
import Profile from './pages/Profile'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import SmsConsent from './pages/SmsConsent'

function RequireTherapist({ children }) {
  const { isAuthenticated, isTherapist, isLoading } = useCognitoAuth()
  const location = useLocation()
  if (isLoading) {
    return (
      <div className="pw-card pw-route" style={{ padding: 24 }}>
        <p className="pw-lead">Loading…</p>
      </div>
    )
  }
  if (!isAuthenticated) {
    const redirect = encodeURIComponent(location.pathname)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }
  if (!isTherapist) {
    return <Navigate to="/" replace />
  }
  return children
}

function RequireClient({ children }) {
  const { isAuthenticated, isClient, isLoading } = useCognitoAuth()
  const location = useLocation()
  if (isLoading) {
    return (
      <div className="pw-card pw-route" style={{ padding: 24 }}>
        <p className="pw-lead">Loading…</p>
      </div>
    )
  }
  if (!isAuthenticated) {
    const redirect = encodeURIComponent(location.pathname)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }
  if (!isClient) {
    return <Navigate to="/" replace />
  }
  return children
}

function Nav() {
  const baseLink = 'pw-link'
  const linkClass = ({ isActive }) => `${baseLink} ${isActive ? 'isActive' : ''}`
  const { isAuthenticated, isTherapist, isClient, logout } = useCognitoAuth()

  return (
    <header className="pw-nav" role="banner">
      <div className="pw-container">
        <div className="pw-nav-inner">
          <Link className="pw-brand" to="/">
            <div className="pw-logo" aria-hidden="true">
              <img src="/logo.png" alt="" className="pw-logoImg" />
            </div>
            <div className="pw-brandText">
              <div className="pw-brandTitle">Patchwerx</div>
              <div className="pw-brandSub">Automatic SMS rebooking for appointments</div>
            </div>
          </Link>

          <nav className="pw-links" aria-label="Primary">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>

            {isAuthenticated ? (
              <>
                {isTherapist && (
                  <NavLink to="/app/waitlist" className={linkClass}>
                    Dashboard
                  </NavLink>
                )}
                {!isClient && (
                  <NavLink to="/app/settings" className={linkClass}>
                    Calendar
                  </NavLink>
                )}
                {isClient && (
                  <NavLink to="/client" className={linkClass}>
                    Dashboard
                  </NavLink>
                )}
                <button
                  type="button"
                  className="pw-link"
                  onClick={logout}
                  style={{ border: 'none', cursor: 'pointer', font: 'inherit' }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/app/settings" className={linkClass}>
                  Calendar
                </NavLink>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

function Shell({ children }) {
  return (
    <div className="pw-page">
      <div className="pw-bg" />
      <Nav />

      <main className="pw-main">
        <div className="pw-container">
          <motion.div
            className="pw-card pw-route"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      <footer className="pw-footer">
        <div
          className="pw-footer-legal"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px 14px',
            marginBottom: 10,
          }}
        >
          <Link to="/terms" className="pw-link">
            Terms of Service
          </Link>
          <span aria-hidden="true" style={{ color: 'var(--ink-faint)', userSelect: 'none' }}>
            ·
          </span>
          <Link to="/privacy" className="pw-link">
            Privacy Policy
          </Link>
        </div>
        <div>© {new Date().getFullYear()} Patchwerx Technologies LLC</div>
      </footer>
    </div>
  )
}

// Confidential calendar flow: Microsoft redirects to the backend, not here. Home has no code handling.
function HomeOrMicrosoftRedirect() {
  return (
    <Shell>
      <Home />
    </Shell>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CognitoAuthProvider>
        <Routes>
          <Route path="/" element={<HomeOrMicrosoftRedirect />} />
          <Route
            path="/about"
            element={
              <Shell>
                <About />
              </Shell>
            }
          />
          <Route
            path="/pricing"
            element={
              <Shell>
                <Pricing />
              </Shell>
            }
          />
          <Route
            path="/contact"
            element={
              <Shell>
                <Contact />
              </Shell>
            }
          />
          <Route
            path="/terms"
            element={
              <Shell>
                <TermsOfService />
              </Shell>
            }
          />
          <Route
            path="/privacy"
            element={
              <Shell>
                <PrivacyPolicy />
              </Shell>
            }
          />
          <Route
            path="/sms-consent"
            element={
              <Shell>
                <SmsConsent />
              </Shell>
            }
          />

          <Route
            path="/signup/therapist"
            element={
              <Shell>
                <TherapistSignup />
              </Shell>
            }
          />
          <Route
            path="/signup/client"
            element={
              <Shell>
                <ClientSignup />
              </Shell>
            }
          />
          <Route
            path="/login"
            element={
              <Shell>
                <Login />
              </Shell>
            }
          />
          <Route path="/login/client" element={<Navigate to="/login" replace />} />
          <Route path="/login/therapist" element={<Navigate to="/login" replace />} />

          <Route
            path="/auth/callback"
            element={
              <Shell>
                <CognitoCallback />
              </Shell>
            }
          />
          <Route
            path="/auth/microsoft/callback"
            element={
              <Shell>
                <MicrosoftCallback />
              </Shell>
            }
          />

          <Route
            path="/app"
            element={
              <RequireTherapist>
                <Navigate to="/app/waitlist" replace />
              </RequireTherapist>
            }
          />
          <Route
            path="/app/waitlist"
            element={
              <RequireTherapist>
                <Shell>
                  <Waitlist />
                </Shell>
              </RequireTherapist>
            }
          />
          <Route
            path="/app/settings"
            element={
              <Shell>
                <Settings />
              </Shell>
            }
          />

          <Route
            path="/client"
            element={
              <RequireClient>
                <Shell>
                  <Profile />
                </Shell>
              </RequireClient>
            }
          />

          <Route
            path="*"
            element={
              <Shell>
                <Home />
              </Shell>
            }
          />
        </Routes>
      </CognitoAuthProvider>
    </BrowserRouter>
  )
}