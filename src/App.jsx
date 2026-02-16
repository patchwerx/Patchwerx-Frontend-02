import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import TherapistSignup from './pages/TherapistSignup'
import TherapistLogin from './pages/TherapistLogin'
import Dashboard from './pages/Dashboard'
import Waitlist from './pages/Waitlist'

function Nav() {
  const linkClass = ({ isActive }) =>
    `pw-link ${isActive ? 'pw-linkPrimary' : ''}`

  return (
    <div className="pw-nav">
      <div className="pw-container pw-nav-inner">
        <Link className="pw-brand" to="/">
          <div className="pw-logo" aria-hidden="true">
            <div className="pw-logoMark" />
          </div>
          <div className="pw-brandText">
            <div className="pw-brandTitle">Patchwerx</div>
            <div className="pw-brandSub">Calm scheduling, fewer gaps.</div>
          </div>
        </Link>

        <div className="pw-links" aria-label="Primary">
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/pricing" className={linkClass}>
            Pricing
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <NavLink to="/signup/therapist" className={linkClass}>
            Therapist signup
          </NavLink>
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
        </div>
      </div>
    </div>
  )
}

function Shell({ children }) {
  return (
    <div className="pw-page">
      <div className="pw-bg" />
      <Nav />
      <main className="pw-container pw-main">
        <div className="pw-card pw-route">{children}</div>
      </main>
      <footer className="pw-footer">
        © {new Date().getFullYear()} Patchwerx
      </footer>
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
          path="/login"
          element={
            <Shell>
              <TherapistLogin />
            </Shell>
          }
        />

        {/* “App” pages (stubbed for now) */}
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
