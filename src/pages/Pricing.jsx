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
          <h1 className="pw-h1" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.08, margin: 0 }}>
            Simple Pricing
          </h1>
          <p className="pw-lead" style={{ marginTop: 16, fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 640 }}>
            You only pay when Patchwerx successfully fills a canceled appointment.
          </p>

          {/* Micro calculator (moved left of hero) */}
          <section style={{ marginTop: 18 }}>
            <div className="pw-panel" style={{ padding: 18, maxWidth: 560 }}>
              <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
                If Patchwerx doesn’t help you stay booked, then it’s free.
              </p>
            </div>
          </section>

          {/* Why This Model Works (moved left of hero) */}
          <section style={{ marginTop: 26 }}>
            <h2 className="pw-sectionTitle" style={{ marginBottom: 12 }}>Why This Model Works</h2>
            <div className="pw-panel" style={{ padding: 18, maxWidth: 720 }}>
              <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                Most scheduling tools charge a monthly subscription whether they help you or not. Patchwerx only charges when it actually helps. That keeps things simple and aligned with your success.
              </p>
            </div>
          </section>
        </div>

        {/* Price panel */}
        <aside
          className="pw-panel"
          style={{
            padding: 20,
            maxWidth: 420,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: -2,
              background:
                'radial-gradient(420px 190px at 20% 10%, var(--accent-glow), transparent 60%)',
              filter: 'blur(2px)',
              opacity: 0.9,
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '2.6rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.1 }}>
              $5
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: 4, color: 'var(--ink)' }}>
              per rebooked appointment,
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: 0, color: 'var(--ink)' }}>
              billed monthly
            </div>

            <div style={{ marginTop: 14, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>
              No subscription. No setup fees. If the slot stays empty, you pay nothing.
            </div>

            {/* Simple visual breakdown */}
            <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
              <div
                style={{
                  borderRadius: 16,
                  padding: 12,
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card-alt)',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>
                    Filled slot
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                    You pay $5 per rebook
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    color: 'var(--sage)',
                    padding: '6px 10px',
                    borderRadius: 999,
                    border: '1px solid rgba(125, 139, 111, 0.35)',
                    background: 'rgba(125, 139, 111, 0.12)',
                  }}
                >
                  $5
                </div>
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: 12,
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card-alt)',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>
                    Empty slot
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                    You pay $0
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    color: 'var(--ink-muted)',
                    padding: '6px 10px',
                    borderRadius: 999,
                    border: '1px solid rgba(60, 52, 44, 0.22)',
                    background: 'rgba(60, 52, 44, 0.06)',
                  }}
                >
                  $0
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
