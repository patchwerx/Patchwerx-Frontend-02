import { useBrandStyles } from '../../ui/useBrandStyles'

export default function Dashboard() {
  const styles = useBrandStyles()
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <h2 style={styles.h2}>Dashboard</h2>
      <p style={styles.subtleText}>
        Summary of today, recent cancellations, and successful rebookings.
      </p>
    </div>
  )
}
