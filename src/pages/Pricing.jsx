export default function Pricing() {
  return (
    <div style={{ paddingBottom: 28 }}>
      {/* HERO */}
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
            Pay only when a session is rebooked.
          </h1>
          <p className="pw-lead" style={{ marginTop: 16, fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 640 }}>
            Patchwerx charges a simple, transparent fee: <strong>$5 per
            successfully rebooked session</strong>. If we don’t fill the
            opening, you don’t pay.
          </p>
        </div>

        {/* Price panel */}
        <aside className="pw-panel" style={{ padding: 20, maxWidth: 360, textAlign: 'center' }}>
          <div style={{ fontSize: '2.6rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.1 }}>
            $5
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: 4, color: 'var(--ink)' }}>
            per successful rebooking
          </div>
          <div style={{ marginTop: 14, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>
            Billed monthly based on the number of sessions we actually fill.
          </div>
        </aside>
      </section>

      {/* How billing works */}
      <section className="pw-grid3" style={{ marginTop: 22, gap: 16 }}>
        {[
          {
            t: 'Only successful fills',
            d: 'You’re charged only when a canceled session is actually rebooked.',
          },
          {
            t: 'Monthly billing',
            d: 'At the end of each month, we total your successful rebookings and send one simple invoice.',
          },
          {
            t: 'No subscriptions',
            d: 'No base fee, no contracts, and no charges for unused slots.',
          },
        ].map((x) => (
          <div key={x.t} className="pw-panel" style={{ padding: 18 }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 8, color: 'var(--ink)' }}>
              {x.t}
            </div>
            <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
              {x.d}
            </p>
          </div>
        ))}
      </section>

      {/* Closing panel */}
      <section style={{ marginTop: 26 }}>
        <div className="pw-panel" style={{ padding: 18, maxWidth: 720 }}>
          <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: 8 }}>
            Aligned incentives
          </div>
          <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
            Patchwerx only gets paid when we help fill an opening. That means
            our incentives are simple: more confirmed sessions for you, and no
            extra costs when your schedule stays the same.
          </p>
        </div>
      </section>
    </div>
  )
}
