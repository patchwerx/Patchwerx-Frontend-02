import { Link, NavLink } from 'react-router-dom'

export default function NavBar({ links = [] }) {
  return (
    <div className="pw-nav">
      <div className="pw-container">
        <div className="pw-nav-inner">
          <Link to="/" className="pw-brand" aria-label="Patchwerx home">
            <div className="pw-logo" aria-hidden="true">
              <img
                src="/logo.png"
                alt=""
                className="pw-logoImg"
                draggable="false"
              />
            </div>
            <div className="pw-brandText">
              <div className="pw-brandTitle">Patchwerx</div>
              <div className="pw-brandSub">Calm scheduling, fewer gaps.</div>
            </div>
          </Link>

          <nav className="pw-links" aria-label="Primary">
            {links.map((l) => {
              const base = l.primary ? 'pw-link pw-linkPrimary' : 'pw-link'
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'} // prevents "/" from being active on every route
                  className={({ isActive }) =>
                    `${base} ${isActive ? 'pw-linkActive' : ''}`
                  }
                >
                  {l.label}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
