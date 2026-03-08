import { Outlet, NavLink, Link } from 'react-router-dom'

function TherapistNav() {
  const linkClass = ({ isActive }) =>
    `pw-link ${isActive ? 'pw-linkPrimary' : ''}`

  return (
    <div className="pw-nav">
      <div className="pw-container pw-nav-inner">
        <Link className="pw-brand" to="/app">
          <div className="pw-logo" aria-hidden="true">
            <div className="pw-logoMark" />
          </div>
          <div className="pw-brandText">
            <div className="pw-brandTitle">Patchwerx</div>
            <div className="pw-brandSub">Therapist portal</div>
          </div>
        </Link>

        <div className="pw-links" aria-label="Therapist">
          <NavLink to="/app/waitlist" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/app/settings" className={linkClass}>
            Settings
          </NavLink>
          <NavLink to="/app/billing" className={linkClass}>
            Billing
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default function TherapistAppLayout() {
  return (
    <div className="pw-page">
      <div className="pw-bg" />
      <TherapistNav />

      <main className="pw-container pw-main">
        <div className="pw-card pw-route">
          <Outlet />
        </div>
      </main>

      <footer className="pw-footer">© {new Date().getFullYear()} Patchwerx</footer>
    </div>
  )
}
