import { Outlet } from 'react-router-dom'
import { useBrandStyles } from '../ui/useBrandStyles'
import NavBar from '../ui/NavBar'

export default function PublicLayout() {
  const styles = useBrandStyles()

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.card}>
          <NavBar
            links={[
              { to: '/', label: 'Home' },
              { to: '/pricing', label: 'Pricing' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
              { to: '/login/therapist', label: 'Therapist login' },
            ]}
          />
          <div style={styles.divider} />
          <Outlet />
        </div>

        <div style={styles.footer}>© {new Date().getFullYear()} Patchwerx</div>
      </div>
    </div>
  )
}
