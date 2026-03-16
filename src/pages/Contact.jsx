export default function Contact() {
  return (
    <div style={{ paddingBottom: 28 }}>
      <section
        className="pw-hero"
        style={{
          paddingTop: 28,
          paddingBottom: 28,
          rowGap: 18,
          background: '#f8f4ed',
          borderRadius: 12,
          paddingLeft: 18,
          paddingRight: 18,
          border: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <h1 className="pw-h1" style={{ margin: 0 }}>Contact</h1>
          <p className="pw-lead" style={{ marginTop: 14, marginBottom: 12 }}>
            Have questions about Patchwerx? We're happy to help.
          </p>
          <p style={{ margin: 0, marginBottom: 20, fontSize: '1rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>
            If you're interested in using Patchwerx in your practice or just want to learn more, send us a message and we'll get back to you.
          </p>
          <p style={{ margin: '0 0 6px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>Email</p>
          <p style={{ margin: 0, marginBottom: 16, fontSize: '1.1rem' }}>
            <a href="mailto:brandon@patchwerx.com" className="pw-link pw-linkPrimary" style={{ fontWeight: 600 }}>
              brandon@patchwerx.com
            </a>
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
            Tell us a little about your practice and what you're looking for. We'll follow up shortly.
          </p>
        </div>
      </section>
    </div>
  )
}
