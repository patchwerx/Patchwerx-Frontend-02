import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="pw-home-page" style={{ paddingBottom: 40 }}>
      <style>{`
        @keyframes pwFloat {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(0, -8px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes pwGlow {
          0%   { opacity: .7; transform: scale(1); }
          50%  { opacity: .9; transform: scale(1.02); }
          100% { opacity: .7; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pw-motion, .pw-motion * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Hero */}
      <section className="pw-hero" style={{ paddingTop: 32, paddingBottom: 36, rowGap: 24, alignItems: 'center' }}>
        <div style={{ maxWidth: 640 }}>
          <p className="pw-kicker" style={{ marginBottom: 12 }}>
            Calm scheduling, fewer gaps
          </p>
          <h1 className="pw-h1" style={{ margin: 0, fontSize: 'clamp(2.25rem, 4.5vw, 3rem)', lineHeight: 1.1 }}>
            Patchwerx
          </h1>
          <p className="pw-lead" style={{ marginTop: 16, marginBottom: 0, fontSize: '1.1rem', maxWidth: '32em' }}>
            SaaS that integrates your platforms and automatically reschedules another client from your priority waitlist when someone cancels—so your calendar stays full.
          </p>
          <div className="pw-ctaRow" style={{ marginTop: 24 }}>
            <Link className="pw-link pw-linkPrimary" to="/signup/therapist">
              Start therapist setup
            </Link>
            <Link className="pw-link" to="/signup/client">
              Join the waitlist
            </Link>
          </div>

          {/* Stats */}
          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            <div
              className="pw-panel"
              style={{
                padding: '14px 18px',
                background: 'var(--bg-card)',
                border: '1px solid rgba(139, 115, 85, 0.35)',
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '0.02em', color: 'var(--error)' }}>
                30%
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginTop: 4, lineHeight: 1.4 }}>
                no-show rate <strong>without</strong> Patchwerx
              </div>
            </div>
            <div
              className="pw-panel"
              style={{
                padding: '14px 18px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '0.02em', color: 'var(--accent)' }}>
                5%
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginTop: 4, lineHeight: 1.4 }}>
                no-show rate <strong>with</strong> Patchwerx
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <aside
          className="pw-panel pw-panel-elevated pw-motion"
          style={{
            padding: 24,
            maxWidth: 420,
            overflow: 'hidden',
            position: 'relative',
            transform: 'translateZ(0)',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: -2,
              background: 'radial-gradient(500px 240px at 30% 20%, rgba(201,169,98,0.12), transparent 55%)',
              filter: 'blur(2px)',
              pointerEvents: 'none',
              animation: 'pwGlow 4s ease-in-out infinite',
              opacity: 0.9,
            }}
          />
          <div style={{ position: 'relative', animation: 'pwFloat 5s ease-in-out infinite' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, letterSpacing: '0.02em', color: 'var(--ink)' }}>
              How it works
            </h3>
            <ol style={{ marginTop: 16, marginBottom: 0, paddingLeft: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
              {[
                { n: 1, title: 'Confirm or deny', desc: '24–48 hr before each appointment we send reminders (e.g. via Twilio) so clients confirm or cancel.' },
                { n: 2, title: 'Fill the slot', desc: 'If a client cancels or doesn’t confirm within 24 hours of start, we text your waitlist in priority order (high → medium → low) until someone accepts.' },
                { n: 3, title: 'Calendar + notify', desc: 'When someone accepts, the event is added to your Google or Outlook calendar and you get a notification.' },
              ].map((step) => (
                <li
                  key={step.n}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '32px 1fr',
                    alignItems: 'start',
                    gap: 12,
                    padding: 14,
                    borderRadius: 8,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: '#1c1916',
                      background: 'var(--accent)',
                      border: '1px solid var(--accent)',
                    }}
                  >
                    {step.n}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>{step.title}</div>
                    <div style={{ marginTop: 2, fontSize: '0.875rem', color: 'var(--ink-muted)' }}>{step.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
            <div
              style={{
                marginTop: 16,
                padding: 12,
                borderRadius: 8,
                background: 'rgba(154,123,79,0.12)',
                border: '1px solid var(--border)',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              <span>Slot opened → waitlist notified</span>
              <span style={{ fontWeight: 700 }}>Rebooked</span>
            </div>
          </div>
        </aside>
      </section>

      {/* Benefits */}
      <section className="pw-section" style={{ marginTop: 8 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 16 }}>
          Why Patchwerx
        </h2>
        <div className="pw-grid3" style={{ gap: 16 }}>
          {[
            { title: 'Automatic outreach', desc: 'We send confirmations and reach out to your waitlist by SMS. First yes gets the slot—no back-and-forth.' },
            { title: 'Priority waitlist', desc: 'Your caseload (name, phone, priority: high / medium / low). We contact in order until the slot is claimed.' },
            { title: 'Calendar sync', desc: 'Rebookings appear on your Google or Outlook calendar; you’re notified when a session is filled.' },
          ].map((item) => (
            <div
              key={item.title}
              className="pw-panel"
              style={{
                padding: 20,
                borderLeft: '4px solid var(--accent)',
                background: 'var(--bg-card)',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)' }}>
                {item.title}
              </h3>
              <p style={{ margin: '8px 0 0', fontSize: '0.95rem', lineHeight: 1.55, color: 'var(--ink-muted)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ marginTop: 32 }}>
        <div
          className="pw-panel pw-panel-elevated"
          style={{
            padding: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)' }}>
              Ready to fill cancellations?
            </div>
            <div style={{ marginTop: 4, fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
              Set up in minutes. Pay only when we rebook a session.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className="pw-link pw-linkPrimary" to="/signup/therapist">
              Get started
            </Link>
            <Link className="pw-link" to="/signup/client">
              Join waitlist
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
