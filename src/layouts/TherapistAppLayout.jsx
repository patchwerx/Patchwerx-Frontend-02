import { Outlet } from 'react-router-dom'
import { useBrandStyles } from '../ui/useBrandStyles'
import NavBar from '../ui/NavBar'

export default function TherapistAppLayout() {
  const styles = useBrandStyles()

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.card}>
          <NavBar
            links={[
              { to: '/app', label: 'Dashboard' },
              { to: '/app/waitlist', label: 'Waitlist' },
              { to: '/app/settings', label: 'Settings' },
              { to: '/app/billing', label: 'Billing' },
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
