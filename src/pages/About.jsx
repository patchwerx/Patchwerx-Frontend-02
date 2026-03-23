export default function About() {
  return (
    <div style={{ paddingBottom: 28 }}>
      {/* What Patchwerx Is */}
      <section
        className="pw-hero"
        style={{
          paddingTop: 32,
          paddingBottom: 32,
          rowGap: 22,
          background: 'var(--bg-elevated)',
          borderRadius: 12,
          paddingLeft: 18,
          paddingRight: 18,
          border: '1px solid var(--brown-border)',
          boxShadow: 'var(--shadow-card-on-card)',
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <h1 className="pw-h1" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.08, margin: 0 }}>
            Patchwerx: Automated rebooking for therapists
          </h1>
          <p className="pw-lead" style={{ marginTop: 16, fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 640 }}>
            Patchwerx is a simple tool designed to help therapists refill canceled appointments.
          </p>
          <p style={{ marginTop: 14, marginBottom: 0, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
            Cancellations are a normal part of the job, but they mean less time doing the work that matters most. Therapists usually try to solve this by reaching out to people manually. Patchwerx does that for you.
          </p>
          <p style={{ marginTop: 14, marginBottom: 0, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
            If someone cancels or doesn't confirm, Patchwerx lets other clients know. If someone wants the spot, they can claim it and the appointment is rebooked.
          </p>
        </div>
      </section>

      {/* Built for Small Practices */}
      <section style={{ marginTop: 28 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 12 }}>
          Built for Small Practices
        </h2>
        <div className="pw-panel" style={{ padding: 20, maxWidth: 640 }}>
          <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
            Patchwerx is designed specifically for independent therapists and small practices. It focuses on solving one problem well: helping you recover canceled sessions without adding more work to your day. There are no complicated systems or new workflows to learn. Once it's connected to your calendar, it simply runs in the background.
          </p>
        </div>
      </section>
    </div>
  )
}
