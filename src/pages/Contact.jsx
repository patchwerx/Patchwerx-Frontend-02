export default function Contact() {
  return (
    <div style={{ paddingBottom: 28 }}>
      <section className="pw-contact-section">
        <div className="pw-contact-inner">
          <h1 className="pw-h1" style={{ margin: 0 }}>
            Contact
          </h1>
          <p className="pw-lead" style={{ marginTop: 14, marginBottom: 12 }}>
            Have questions about Patchwerx? We’re happy to help.
          </p>
          <p
            style={{
              margin: 0,
              marginBottom: 20,
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'var(--ink-muted)',
            }}
          >
            Interested in using Patchwerx for your business—or want to learn more? Reach out by email and we’ll get back
            to you.
          </p>

          <div
            className="pw-panel"
            style={{
              padding: 18,
              marginBottom: 0,
              background: 'var(--bg-card-alt)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: -2,
                background: 'radial-gradient(360px 160px at 20% 20%, var(--accent-glow), transparent 60%)',
                filter: 'blur(2px)',
                opacity: 0.9,
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative' }}>
              <div style={{ fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: 6 }}>Email us!</div>
              <div style={{ fontSize: '1.08rem', lineHeight: 1.4 }}>
                <a
                  href="mailto:brandon@patchwerx.com"
                  className="pw-link pw-linkPrimary"
                  style={{ fontWeight: 700 }}
                >
                  brandon@patchwerx.com
                </a>
              </div>
              <div style={{ marginTop: 10, fontSize: '0.95rem', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                Tell us what you offer and what you’re hoping Patchwerx can take off your plate. We’ll follow up shortly.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
