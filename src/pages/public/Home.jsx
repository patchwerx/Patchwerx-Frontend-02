import { Link } from 'react-router-dom'
import { useBrandStyles } from '../../ui/useBrandStyles'

export default function Home() {
  const styles = useBrandStyles()

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <h2 style={styles.h2}>Automatic rebooking when sessions cancel.</h2>
      <p style={styles.subtleText}>
        Patchwerx helps therapists fill last-minute openings by contacting the
        right clients at the right time—without manual back-and-forth.
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
        <Link to="/signup/therapist" style={styles.navLink}>
          Start as a therapist
        </Link>
        <Link to="/login/therapist" style={styles.navLink}>
          Therapist login
        </Link>
        <Link to="/login/client" style={styles.navLink}>
          Client login
        </Link>
      </div>
    </div>
  )
}
