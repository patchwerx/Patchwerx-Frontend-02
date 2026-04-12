import { Outlet, NavLink, Link } from 'react-router-dom'

function ClientNav() {
  const linkClass = ({ isActive }) =>
    `pw-link ${isActive ? 'pw-linkPrimary' : ''}`

  return (
    <div className="pw-nav">
      <div className="pw-container pw-nav-inner">
        <Link className="pw-brand" to="/client">
          <div className="pw-logo" aria-hidden="true">
            <div className="pw-logoMark" />
          </div>
          <div className="pw-brandText">
            <div className="pw-brandTitle">Patchwerx</div>
            <div className="pw-brandSub">Guest portal</div>
          </div>
        </Link>

        <div className="pw-links" aria-label="Guest">
          <NavLink to="/client" end className={linkClass}>
            Profile
          </NavLink>
          <NavLink to="/client/preferences" className={linkClass}>
            Preferences
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default function ClientAppLayout() {
  return (
    <div className="pw-page">
      <div className="pw-bg" />
      <ClientNav />

      <main className="pw-container pw-main">
        <div className="pw-card pw-route">
          <Outlet />
        </div>
      </main>

      <footer className="pw-footer">© {new Date().getFullYear()} Patchwerx Technologies LLC</footer>
    </div>
  )
}
