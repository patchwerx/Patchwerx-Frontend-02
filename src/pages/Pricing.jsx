export default function Pricing() {
  return (
    <div style={{ paddingBottom: 28 }}>
      {/* Hero */}
      <section
        className="pw-hero"
        style={{
          paddingTop: 28,
          paddingBottom: 28,
          rowGap: 22,
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <div className="pw-kicker" style={{ marginBottom: 14 }}>Pricing</div>
          <h1 className="pw-h1" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.08, margin: 0 }}>
            Simple Pricing
          </h1>
          <p className="pw-lead" style={{ marginTop: 16, fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 640 }}>
            You only pay when Patchwerx successfully fills a canceled session.
          </p>
        </div>

        {/* Price panel */}
        <aside className="pw-panel" style={{ padding: 20, maxWidth: 360, textAlign: 'center' }}>
          <div style={{ fontSize: '2.6rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.1 }}>
            $5
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: 4, color: 'var(--ink)' }}>
            per rebooked appointment
          </div>
          <div style={{ marginTop: 14, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>
            That means: no monthly subscription, no setup fees, no cost for canceled sessions that stay empty. If Patchwerx fills the slot, it costs $5. If it doesn't, you pay nothing.
          </div>
        </aside>
      </section>

      {/* Micro calculator */}
      <section style={{ marginTop: 18 }}>
        <div className="pw-panel" style={{ padding: 18, maxWidth: 560 }}>
          <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
            Even filling just 4 sessions per month is often $600–$1,000 in recovered revenue.
          </p>
        </div>
      </section>

      {/* Why This Model Works */}
      <section style={{ marginTop: 26 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 12 }}>Why This Model Works</h2>
        <div className="pw-panel" style={{ padding: 18, maxWidth: 720 }}>
          <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
            Most scheduling tools charge a monthly subscription whether they help you or not. Patchwerx only charges when it creates value for your practice. That keeps things simple and aligned with your success.
          </p>
        </div>
      </section>
    </div>
  )
}
