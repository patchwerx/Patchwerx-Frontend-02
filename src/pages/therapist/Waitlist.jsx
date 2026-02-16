import { useBrandStyles } from '../../ui/useBrandStyles'

export default function Waitlist() {
  const styles = useBrandStyles()
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <h2 style={styles.h2}>Waitlist</h2>
      <p style={styles.subtleText}>
        Drag-and-drop priority ordering (implement next), add/remove clients,
        contact preferences.
      </p>
    </div>
  )
}
