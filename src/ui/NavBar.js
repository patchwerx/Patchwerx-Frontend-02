import { Link } from 'react-router-dom'
import { useBrandStyles } from './useBrandStyles'

export default function NavBar({ links = [] }) {
  const styles = useBrandStyles()

  return (
    <div style={styles.brandRow}>
      <div style={styles.brandLeft}>
        <div style={styles.logo} aria-hidden="true">
          <div style={styles.logoMark} />
        </div>
        <div>
          <h1 style={styles.title}>Patchwerx</h1>
          <p style={styles.subtitle}>Calm scheduling, fewer gaps.</p>
        </div>
      </div>

      <nav style={styles.nav} aria-label="Primary">
        {links.map((l) => (
          <Link key={l.to} to={l.to} style={styles.navLink}>
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
