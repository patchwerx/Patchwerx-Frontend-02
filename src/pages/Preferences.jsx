import { useBrandStyles } from '../../ui/useBrandStyles'

export default function Preferences() {
  const styles = useBrandStyles()
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <h2 style={styles.h2}>Preferences</h2>
      <p style={styles.subtleText}>
        Availability windows, opt-in status, and contact preferences.
      </p>
    </div>
  )
}
