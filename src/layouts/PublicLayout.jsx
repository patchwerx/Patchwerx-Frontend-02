import { Outlet, NavLink, Link } from 'react-router-dom'

function TopNav() {
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
            <div className="pw-brandSub">Fill canceled sessions automatically.</div>
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
          <NavLink to="/login/therapist" className={linkClass}>
            Login
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default function PublicLayout() {
  return (
    <div className="pw-page">
      <div className="pw-bg" />
      <TopNav />

      <main className="pw-container pw-main">
        <div className="pw-card pw-route">
          <Outlet />
        </div>
      </main>

      <footer className="pw-footer">
        <div style={{ maxWidth: 560, margin: '0 auto', fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 8 }}>
          Patchwerx helps therapists refill canceled sessions automatically by offering open times to clients who want earlier appointments.
        </div>
        © {new Date().getFullYear()} Patchwerx
      </footer>
    </div>
  )
}
