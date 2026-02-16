import { useBrandStyles } from '../../ui/useBrandStyles'

export default function Pricing() {
  const styles = useBrandStyles()

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <h2 style={styles.h2}>Pricing</h2>
      <p style={styles.subtleText}>
        Simple pay-as-you-go: pay only for successful rebookings. (You can
        refine pricing later—this page can stay intentionally simple in v1.)
      </p>
    </div>
  )
}
