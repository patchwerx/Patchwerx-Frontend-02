import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import TherapistSignup from './pages/TherapistSignup'
import ClientSignup from './pages/ClientSignup'
import TherapistLogin from './pages/TherapistLogin'
import Dashboard from './pages/Dashboard'
import Waitlist from './pages/Waitlist'

function Nav() {
  const baseLink = 'pw-link'
  const linkClass = ({ isActive }) => `${baseLink} ${isActive ? 'isActive' : ''}`

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
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/pricing" className={linkClass}>
              Pricing
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>

            <NavLink to="/app" className={linkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
            <Link to="/signup/therapist" className="pw-link pw-linkPrimary">
              Start setup
            </Link>
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
          path="/app"
          element={
            <Shell>
              <Dashboard />
            </Shell>
          }
        />
        <Route
          path="/app/waitlist"
          element={
            <Shell>
              <Waitlist />
            </Shell>
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
    </BrowserRouter>
  )
}