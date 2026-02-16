import { useBrandStyles } from '../../ui/useBrandStyles'

export default function Contact() {
  const styles = useBrandStyles()

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <h2 style={styles.h2}>Contact</h2>
      <p style={styles.subtleText}>
        Email support: <strong>support@patchwerx.com</strong> (placeholder)
      </p>
    </div>
  )
}
