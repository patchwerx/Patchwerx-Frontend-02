import { useBrandStyles } from '../../ui/useBrandStyles'

export default function About() {
  const styles = useBrandStyles()

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <h2 style={styles.h2}>About Patchwerx</h2>
      <p style={styles.subtleText}>
        Patchwerx is built for small practices that want fewer gaps and less
        scheduling friction. We connect to your calendar, detect openings, and
        coordinate outreach—reliably and respectfully.
      </p>
    </div>
  )
}
