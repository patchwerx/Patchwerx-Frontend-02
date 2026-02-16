import { useBrandStyles } from '../../ui/useBrandStyles'

export default function Settings() {
  const styles = useBrandStyles()
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <h2 style={styles.h2}>Settings</h2>
      <p style={styles.subtleText}>
        Calendar connection, notification settings, account info.
      </p>
    </div>
  )
}
