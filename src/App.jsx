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
              <div className="pw-brandSub">Calm scheduling, fewer gaps.</div>
            </div>
          </Link>

          <nav className="pw-links" aria-label="Primary">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            {!isClient && (
              <NavLink to="/pricing" className={linkClass}>
                Pricing
              </NavLink>
            )}
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>

            {isAuthenticated ? (
              <>
                {isTherapist && (
                  <>
                    <NavLink to="/app/waitlist" className={linkClass}>
                      Dashboard
                    </NavLink>
                    <NavLink to="/app/settings" className={linkClass}>
                      Calendar
                    </NavLink>
                  </>
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

      <footer className="pw-footer">© {new Date().getFullYear()} Patchwerx</footer>
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
              <RequireTherapist>
                <Shell>
                  <Settings />
                </Shell>
              </RequireTherapist>
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