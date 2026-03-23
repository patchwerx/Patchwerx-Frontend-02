import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCognitoAuth } from '../context/CognitoAuthContext'

const cardHover = { y: -6 }
const cardSpring = { type: 'spring', stiffness: 280, damping: 22 }

export default function Home() {
  const { login } = useCognitoAuth()
  const [redirecting, setRedirecting] = useState(false)

  const handleTherapistSignUp = () => {
    setRedirecting(true)
    login('therapist').catch(() => setRedirecting(false))
  }

  const handleClientSignUp = () => {
    setRedirecting(true)
    login('client').catch(() => setRedirecting(false))
  }

  return (
    <div className="pw-home-page" style={{ paddingBottom: 40 }}>
      <style>{`
        @keyframes pwFloat {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(0, -6px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes pwGlow {
          0%   { opacity: .6; transform: scale(1); }
          50%  { opacity: .85; transform: scale(1.02); }
          100% { opacity: .6; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pw-motion, .pw-motion * { animation: none !important; transition: none !important; }
        }

        @media (max-width: 900px) {
          /* Collapse hero into a single column so the right visual doesn't squeeze text */
          .pw-home-heroGrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Hero */}
      <section
        style={{
          display: 'block',
          width: '100%',
          paddingTop: 32,
          paddingBottom: 32,
          paddingLeft: 18,
          paddingRight: 18,
          marginBottom: 28,
          background: 'var(--bg-elevated)',
          borderRadius: 12,
          border: '1px solid var(--brown-border)',
          boxShadow: 'var(--shadow-card-on-card)',
        }}
      >
        <div className="pw-home-heroGrid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: 'clamp(16px, 3vw, 34px)',
            alignItems: 'start',
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <h1 className="pw-h1" style={{ margin: 0 }}>
              Patchwerx helps you fill open spots—without the busywork
            </h1>
            <p
              className="pw-lead"
              style={{ marginTop: 16, marginBottom: 12, fontSize: '1.08rem', lineHeight: 1.7, maxWidth: '36em' }}
            >
              When someone cancels, Patchwerx offers that time to clients who’d love an earlier visit. You stay in control, we help the slot get filled.
            </p>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>
              No chasing people by text. No juggling a waitlist by hand—just a calmer calendar.
            </p>
            <p style={{ marginTop: 16, marginBottom: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--ink)' }}>
              Cancellations add up fast. Patchwerx is here to help you turn more of those gaps back into real sessions.
            </p>
          </div>

          {/* Right visual: quick “before/after” calendar card */}
          <div
            aria-hidden="true"
            style={{
              width: '100%',
              maxWidth: 420,
              borderRadius: 16,
              border: '1px solid var(--border)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 45%), var(--bg-card-alt)',
              boxShadow: 'var(--shadow-soft)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: -2,
                background: 'radial-gradient(380px 160px at 20% 10%, var(--accent-glow), transparent 58%)',
                filter: 'blur(1px)',
                pointerEvents: 'none',
                opacity: 0.95,
              }}
            />

            <div style={{ position: 'relative', padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.02em' }}>
                  From empty to booked
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--sage)', whiteSpace: 'nowrap' }}>Today</div>
              </div>

              <div style={{ marginTop: 14, display: 'grid', gap: 12 }}>
                <div
                  style={{
                    borderRadius: 14,
                    background: 'rgba(184, 84, 80, 0.08)',
                    border: '1px solid rgba(184, 84, 80, 0.22)',
                    padding: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ fontWeight: 800, color: 'var(--error)' }}>Before</div>
                    <div style={{ fontWeight: 800, color: 'var(--ink-muted)', fontSize: '0.9rem' }}>Empty hour</div>
                  </div>
                  <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ height: 10, borderRadius: 999, background: 'rgba(184, 84, 80, 0.22)' }} />
                    <div style={{ height: 10, borderRadius: 999, background: 'rgba(184, 84, 80, 0.16)' }} />
                    <div style={{ gridColumn: '1 / -1', height: 10, borderRadius: 999, background: 'rgba(184, 84, 80, 0.12)' }} />
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: 14,
                    background: 'rgba(125, 139, 111, 0.12)',
                    border: '1px solid rgba(125, 139, 111, 0.28)',
                    padding: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ fontWeight: 800, color: 'var(--sage)' }}>After</div>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.9rem' }}>Rebooked</div>
                  </div>
                  <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ height: 10, borderRadius: 999, background: 'rgba(125, 139, 111, 0.38)' }} />
                    <div style={{ height: 10, borderRadius: 999, background: 'rgba(125, 139, 111, 0.22)' }} />
                    <div style={{ gridColumn: '1 / -1', height: 10, borderRadius: 999, background: 'rgba(125, 139, 111, 0.16)' }} />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12, fontSize: '0.9rem', lineHeight: 1.55, color: 'var(--ink-muted)' }}>
                We reach out to clients for you so you can focus on care, not phone tag.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <div className="pw-ctaRow" style={{ marginBottom: 32 }}>
        <button
          type="button"
          className="pw-link pw-linkPrimary"
          onClick={handleTherapistSignUp}
          disabled={redirecting}
          style={{ cursor: redirecting ? 'wait' : 'pointer', font: 'inherit' }}
        >
          {redirecting ? 'One moment…' : 'Therapist sign up'}
        </button>
        <button
          type="button"
          className="pw-link"
          onClick={handleClientSignUp}
          disabled={redirecting}
          style={{
            background: 'var(--accent)',
            color: 'var(--sage-on)',
            border: '1px solid var(--accent)',
            cursor: redirecting ? 'wait' : 'pointer',
            font: 'inherit',
          }}
        >
          {redirecting ? 'One moment…' : 'Client sign up'}
        </button>
      </div>

      {/* How it works */}
      <section id="how-it-works" className="pw-home-section" style={{ marginBottom: 36 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 16 }}>How it works</h2>
        <motion.div
          className="pw-panel pw-panel-elevated pw-motion pw-panel-how"
          style={{ padding: 24, maxWidth: '100%', overflow: 'hidden', position: 'relative', transform: 'translateZ(0)' }}
          whileHover={cardHover}
          transition={cardSpring}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: -2,
              background: 'radial-gradient(500px 240px at 30% 20%, var(--accent-glow), transparent 55%)',
              filter: 'blur(2px)', pointerEvents: 'none', animation: 'pwGlow 4s ease-in-out infinite', opacity: 0.9,
            }}
          />
          <div style={{ position: 'relative' }}>
            <ol className="pw-steps" style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
              {[
                { n: 1, title: 'Someone cancels', desc: 'A spot opens on your calendar.' },
                { n: 2, title: 'We reach out', desc: 'Clients who want an earlier time get a heads-up about the opening.' },
                { n: 3, title: 'Someone books it', desc: 'The slot gets claimed and you’re back on the books.' },
              ].map((step) => (
                <li key={step.n} className="pw-step">
                  <span className="pw-stepNum">{step.n}</span>
                  <div>
                    <div className="pw-featureTitle" style={{ fontSize: '0.98rem' }}>{step.title}</div>
                    <div className="pw-featureText" style={{ marginTop: 4, fontSize: '0.875rem' }}>{step.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="pw-home-section" style={{ marginBottom: 36 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 16 }}>Why people like it</h2>
        <div className="pw-grid3">
          {[
            { title: 'Fill your calendar', desc: 'A filled slot beats an empty one—simple as that.' },
            { title: 'Less admin', desc: 'Spend less time coordinating and more time helping clients.' },
            { title: 'Set it and go', desc: 'Quick setup and little maintenance.' },
          ].map((item, i) => (
            <motion.div key={item.title} className={`pw-panel ${i === 0 ? 'pw-panel-accent' : i === 1 ? 'pw-panel-accent-grey' : 'pw-panel-brown'}`} whileHover={cardHover} transition={cardSpring}>
              <h3 className="pw-featureTitle">{item.title}</h3>
              <p className="pw-featureText">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Psychological safety */}
      <section className="pw-home-section" style={{ marginBottom: 36 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 16 }}>What therapists love most about Patchwerx</h2>
        <div className="pw-panel" style={{ padding: 20 }}>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink-muted)' }}>
            <li><strong style={{ color: 'var(--ink)' }}>No monthly fee.</strong> You pay when a canceled slot actually gets rebooked.</li>
            <li><strong style={{ color: 'var(--ink)' }}>Clients opt in.</strong> Only people who want earlier times hear from us.</li>
            <li><strong style={{ color: 'var(--ink)' }}>Completely automatic.</strong> After you connect, we stay quietly in the background.</li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pw-home-section">
        <motion.div
          className="pw-panel pw-panel-elevated pw-cta-panel"
          style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}
          whileHover={cardHover}
          transition={cardSpring}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)' }}>Ready to fill more open spots?</div>
            <div style={{ marginTop: 4, fontSize: '0.9rem', color: 'var(--ink-muted)' }}>We’d love to help you turn cancellations into real sessions—so you can keep your energy where it matters.</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="pw-link pw-linkPrimary"
              onClick={handleTherapistSignUp}
              disabled={redirecting}
              style={{ cursor: redirecting ? 'wait' : 'pointer', font: 'inherit' }}
            >
              {redirecting ? 'One moment…' : 'Therapist sign up'}
            </button>
            <Link className="pw-link" to="/contact">Contact us</Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
