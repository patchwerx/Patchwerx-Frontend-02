import { BrowserRouter, Routes, Route, NavLink, Link, Navigate, useLocation } from 'react-router-dom'
import { CognitoAuthProvider, useCognitoAuth } from './context/CognitoAuthContext'
import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import TherapistSignup from './pages/TherapistSignup'
import ClientSignup from './pages/ClientSignup'
import TherapistLogin from './pages/TherapistLogin'
import ClientLogin from './pages/ClientLogin'
import Dashboard from './pages/Dashboard'
import Waitlist from './pages/Waitlist'
import CognitoCallback from './pages/CognitoCallback'
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
    return <Navigate to={`/login/client?redirect=${redirect}`} replace />
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
            <NavLink to="/pricing" className={linkClass}>
              Pricing
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
                {isClient && (
                  <NavLink to="/client" className={linkClass}>
                    My account
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
                  Therapist login
                </NavLink>
                <NavLink to="/login/client" className={linkClass}>
                  Client login
                </NavLink>
                <Link to="/signup/therapist" className="pw-link pw-linkPrimary">
                  Start setup
                </Link>
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
          <div className="pw-card pw-route">{children}</div>
        </div>
      </main>

      <footer className="pw-footer">© {new Date().getFullYear()} Patchwerx</footer>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CognitoAuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Shell>
                <Home />
              </Shell>
            }
          />
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
                <TherapistLogin />
              </Shell>
            }
          />
          <Route
            path="/login/client"
            element={
              <Shell>
                <ClientLogin />
              </Shell>
            }
          />

          <Route
            path="/auth/callback"
            element={
              <Shell>
                <CognitoCallback />
              </Shell>
            }
          />

          <Route
            path="/app"
            element={
              <RequireTherapist>
                <Shell>
                  <Dashboard />
                </Shell>
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