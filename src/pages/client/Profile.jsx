import { useBrandStyles } from '../../ui/useBrandStyles'

export default function Profile() {
  const styles = useBrandStyles()
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <h2 style={styles.h2}>Profile</h2>
      <p style={styles.subtleText}>
        View and edit your info (name, phone/email), pause notifications, etc.
      </p>
    </div>
  )
}
