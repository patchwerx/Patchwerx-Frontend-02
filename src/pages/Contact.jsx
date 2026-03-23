export default function Contact() {
  return (
    <div style={{ paddingBottom: 28 }}>
      <section
        className="pw-hero"
        style={{
          paddingTop: 28,
          paddingBottom: 28,
          rowGap: 18,
          background: 'var(--bg-elevated)',
          borderRadius: 12,
          paddingLeft: 18,
          paddingRight: 18,
          border: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(18px, 3vw, 34px)',
            alignItems: 'start',
            width: '100%',
          }}
        >
          {/* Left: contact email */}
          <div style={{ width: '100%' }}>
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
              Interested in using Patchwerx in your practice—or want to learn more? Send a message and we’ll get back to you.
            </p>

            <div
              className="pw-panel"
              style={{
                padding: 18,
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
                    href="mailto:support@patchwerx.com"
                    className="pw-link pw-linkPrimary"
                    style={{ fontWeight: 700 }}
                  >
                    support@patchwerx.com
                  </a>
                </div>
                <div style={{ marginTop: 10, fontSize: '0.95rem', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                  Tell us a little about your practice and what you’re looking for. We’ll follow up shortly.
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>
      </section>
    </div>
  )
}

function ContactForm() {
  const onSubmit = async (e) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    const errorEl = form.querySelector('[data-error="true"]')
    const successEl = form.querySelector('[data-success="true"]')
    if (errorEl) errorEl.textContent = ''
    if (successEl) successEl.textContent = ''

    if (!name) {
      if (errorEl) errorEl.textContent = 'Please enter your name.'
      return
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (errorEl) errorEl.textContent = 'Please enter a valid email address.'
      return
    }
    if (!message || message.length < 10) {
      if (errorEl) errorEl.textContent = 'Please include a short message (at least 10 characters).'
      return
    }

    // No backend endpoint exists in this repo, so we submit by opening the user's email client.
    const to = 'brandon@patchwerx.com'
    const subject = `Patchwerx Contact - ${name}`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message,
      '',
      '---',
      'Sent from the Patchwerx website form.',
    ].join('\n')

    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto

    if (successEl) successEl.textContent = 'Thanks! Your email client should open to send the message.'
  }

  return (
    <div
      className="pw-panel"
      style={{
        padding: 20,
        width: '100%',
        justifySelf: 'end',
        maxWidth: 520,
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontWeight: 900, fontFamily: 'var(--font-heading)', fontSize: '1.12rem' }}>
          Send a message
        </div>

        <label className="pw-label" htmlFor="pw-contact-name">
          Your name
        </label>
        <input
          id="pw-contact-name"
          name="name"
          className="pw-input"
          type="text"
          placeholder="Jane Doe"
          autoComplete="name"
          required
        />

        <label className="pw-label" htmlFor="pw-contact-email">
          Email
        </label>
        <input
          id="pw-contact-email"
          name="email"
          className="pw-input"
          type="email"
          placeholder="jane@practice.com"
          autoComplete="email"
          required
        />

        <label className="pw-label" htmlFor="pw-contact-message">
          What can we help with?
        </label>
        <textarea
          id="pw-contact-message"
          name="message"
          className="pw-input"
          placeholder="Tell us about your practice and what you're looking for..."
          rows={5}
          required
          style={{ resize: 'vertical' }}
        />

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 4 }}>
          <button type="submit" className="pw-btn" style={{ borderRadius: 'var(--radius-pill)' }}>
            Send message
          </button>
          <span style={{ fontSize: '0.92rem', color: 'var(--ink-muted)' }}>
            Or email <a className="pw-link" href="mailto:brandon@patchwerx.com" style={{ fontWeight: 700 }}>directly</a>
          </span>
        </div>

        <div data-error="true" style={{ minHeight: 18, color: 'var(--error)', fontSize: '0.92rem', fontWeight: 700 }} />
        <div data-success="true" style={{ minHeight: 18, color: 'var(--sage-muted)', fontSize: '0.92rem', fontWeight: 700 }} />
      </form>
    </div>
  )
}

