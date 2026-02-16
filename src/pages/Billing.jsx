import { useBrandStyles } from '../../ui/useBrandStyles'

export default function Billing() {
  const styles = useBrandStyles()
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <h2 style={styles.h2}>Billing</h2>
      <p style={styles.subtleText}>
        This month’s successful rebookings + estimated charges.
      </p>
    </div>
  )
}
