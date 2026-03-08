export default function Contact() {
  return (
    <div style={{ paddingBottom: 28 }}>
      <section
        className="pw-hero"
        style={{
          paddingTop: 28,
          paddingBottom: 28,
          rowGap: 18,
          background: 'var(--bg-card)',
          borderRadius: 12,
          paddingLeft: 18,
          paddingRight: 18,
          border: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <div className="pw-kicker" style={{ marginBottom: 12 }}>Get in touch</div>
          <h1 className="pw-h1" style={{ margin: 0 }}>Contact</h1>
          <p className="pw-lead" style={{ marginTop: 14, marginBottom: 20 }}>
            Reach out for support, billing questions, or partnership inquiries. We typically reply within a business day.
          </p>
          <p style={{ margin: 0, fontSize: '1.1rem' }}>
            <a href="mailto:brandon@patchwerx.com" className="pw-link pw-linkPrimary" style={{ fontWeight: 600 }}>
              brandon@patchwerx.com
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
