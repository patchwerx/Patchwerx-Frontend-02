import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ paddingBottom: 28 }}>
      {/* LOCAL KEYFRAMES (simple + smooth) */}
      <style>{`
        @keyframes pwFloat {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(0, -10px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes pwGlow {
          0%   { opacity: .65; transform: scale(1); }
          50%  { opacity: .95; transform: scale(1.03); }
          100% { opacity: .65; transform: scale(1); }
        }
        @keyframes pwSheen {
          0%   { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
          20%  { opacity: .55; }
          50%  { opacity: .25; }
          100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
        }
        @keyframes pwPulseDot {
          0% { transform: scale(1); opacity: .85; }
          55% { transform: scale(1.45); opacity: .45; }
          100% { transform: scale(1); opacity: .85; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pw-motion, .pw-motion * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="pw-hero" style={{ paddingTop: 26, paddingBottom: 26, rowGap: 18 }}>
        {/* LEFT */}
        <div style={{ maxWidth: 720 }}>
          <h1
            style={{
              margin: '14px 0 0',
              fontSize: 'clamp(2.2rem, 4.4vw, 3.25rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              color: 'rgba(2,6,23,0.93)',
              textShadow: '0 1px 0 rgba(255,255,255,0.7)',
            }}
          >
            Patchwerx
          </h1>

          <p
            style={{
              marginTop: 12,
              fontSize: '1.08rem',
              lineHeight: 1.65,
              color: 'rgba(2,6,23,0.82)',
              fontWeight: 520,
              maxWidth: 640,
              textShadow: '0 1px 0 rgba(255,255,255,0.6)',
            }}
          >
            Patchwerx spots an open slot, texts eligible clients, and books the first yes—then updates your calendar.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <Link className="pw-link pw-linkPrimary" to="/signup/therapist">
              Start therapist setup
            </Link>
            <Link className="pw-link" to="/signup/client">
              Join the waitlist
            </Link>
          </div>

          {/* BIG BOLD PERCENTAGES */}
          <div
            style={{
              marginTop: 14,
              display: 'grid',
              gap: 10,
              color: 'rgba(2,6,23,0.90)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 16,
                background: 'rgba(255, 169, 169, 0.7)',
                border: '1px solid rgba(255,255,255,0.55)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
              }}
            >
              <span
                style={{
                  fontSize: '2.05rem',
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                }}
              >
                30%
              </span>
              <span
                style={{
                  fontSize: '1.02rem',
                  fontWeight: 750,
                  color: 'rgba(2,6,23,0.82)',
                }}
              >
                no-show rate <span style={{ fontWeight: 800 }}>without Patchwerx</span>
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 16,
                background: 'rgba(47,224,166,0.18)',
                border: '1px solid rgba(255,255,255,0.55)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
              }}
            >
              <span
                style={{
                  fontSize: '2.05rem',
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                }}
              >
                5%
              </span>
              <span
                style={{
                  fontSize: '1.02rem',
                  fontWeight: 750,
                  color: 'rgba(2,6,23,0.82)',
                }}
              >
                no-show rate <span style={{ fontWeight: 800 }}>with Patchwerx</span>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: VISUAL + MOTION */}
        <aside
          className="pw-panel pw-motion"
          style={{
            padding: 18,
            maxWidth: 480,
            overflow: 'hidden',
            position: 'relative',
            transform: 'translateZ(0)',
          }}
        >
          {/* animated glow layer */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: -2,
              background:
                'radial-gradient(700px 320px at 15% 10%, rgba(47,224,166,0.42), transparent 55%), radial-gradient(700px 320px at 90% 30%, rgba(59,130,246,0.34), transparent 60%), radial-gradient(700px 320px at 40% 95%, rgba(250,204,21,0.20), transparent 62%)',
              filter: 'blur(2px)',
              pointerEvents: 'none',
              animation: 'pwGlow 3.6s ease-in-out infinite',
              opacity: 0.85,
            }}
          />

          {/* floating "calendar" card */}
          <div
            style={{
              position: 'relative',
              animation: 'pwFloat 4.8s ease-in-out infinite',
            }}
          >
            <div style={{ fontWeight: 950, fontSize: '1.05rem', color: 'rgba(2,6,23,0.92)' }}>
              How it works
            </div>

            <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
              {[
                { n: '1', t: 'Detect', d: 'Open slot appears.' },
                { n: '2', t: 'Offer', d: 'Clients get a text.' },
                { n: '3', t: 'Book', d: 'First yes is booked.' },
              ].map((x) => (
                <div
                  key={x.n}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '36px 1fr',
                    alignItems: 'start',
                    gap: 10,
                    padding: 12,
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.90), rgba(255,255,255,0.66))',
                    border: '1px solid rgba(255,255,255,0.60)',
                    boxShadow: '0 14px 34px rgba(0,0,0,0.10)',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 950,
                      color: 'rgba(2,6,23,0.86)',
                      background:
                        x.n === '1'
                          ? 'rgba(47,224,166,0.26)'
                          : x.n === '2'
                            ? 'rgba(59,130,246,0.20)'
                            : 'rgba(250,204,21,0.20)',
                      border: '1px solid rgba(255,255,255,0.65)',
                    }}
                  >
                    {x.n}
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, color: 'rgba(2,6,23,0.90)' }}>{x.t}</div>
                    <div style={{ marginTop: 2, color: 'rgba(2,6,23,0.78)', fontWeight: 650 }}>
                      {x.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* animated status strip */}
            <div
              style={{
                marginTop: 14,
                padding: 12,
                borderRadius: 16,
                background:
                  'linear-gradient(90deg, rgba(47,224,166,0.18), rgba(59,130,246,0.14), rgba(250,204,21,0.14))',
                border: '1px solid rgba(255,255,255,0.60)',
                color: 'rgba(2,6,23,0.82)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <span>📅 3:00pm opened</span>
              <span style={{ fontWeight: 950 }}>Booked ✅</span>
            </div>
          </div>
        </aside>
      </section>

      {/* BENEFITS (short, colorful, no dead space) */}
      <section className="pw-grid3" style={{ marginTop: 18, gap: 14 }}>
        {[
          {
            t: 'Automatic outreach',
            d: 'No back-and-forth.',
            bg: 'linear-gradient(135deg, rgba(47,224,166,0.18), rgba(255,255,255,0.82))',
            edge: 'rgba(47,224,166,0.55)',
          },
          {
            t: 'Therapist control',
            d: 'Rules + priorities.',
            bg: 'linear-gradient(135deg, rgba(59,130,246,0.14), rgba(255,255,255,0.82))',
            edge: 'rgba(59,130,246,0.45)',
          },
          {
            t: 'Fewer gaps',
            d: 'Steadier weeks.',
            bg: 'linear-gradient(135deg, rgba(250,204,21,0.14), rgba(255,255,255,0.82))',
            edge: 'rgba(250,204,21,0.45)',
          },
        ].map((x) => (
          <div
            key={x.t}
            className="pw-panel"
            style={{
              padding: 16,
              background: x.bg,
              borderLeft: `4px solid ${x.edge}`,
              boxShadow: '0 14px 38px rgba(0,0,0,0.12)',
            }}
          >
            <div style={{ fontWeight: 950, color: 'rgba(2,6,23,0.92)' }}>{x.t}</div>
            <div style={{ marginTop: 6, color: 'rgba(2,6,23,0.78)', fontWeight: 650 }}>
              {x.d}
            </div>
          </div>
        ))}
      </section>

      {/* CTA STRIP (simple + compact) */}
      <section style={{ marginTop: 18 }}>
        <div
          className="pw-panel"
          style={{
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.90), rgba(255,255,255,0.70))',
          }}
        >
          <div style={{ fontWeight: 900, color: 'rgba(2,6,23,0.90)' }}>
            Ready to fill cancellations?
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