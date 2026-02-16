import { Outlet } from 'react-router-dom'
import { useBrandStyles } from '../ui/useBrandStyles'
import NavBar from '../ui/NavBar'

export default function ClientAppLayout() {
  const styles = useBrandStyles()

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.card}>
          <NavBar
            links={[
              { to: '/client', label: 'Profile' },
              { to: '/client/preferences', label: 'Preferences' },
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
