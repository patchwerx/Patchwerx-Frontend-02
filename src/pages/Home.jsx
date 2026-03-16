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
        <div style={{ maxWidth: 720 }}>
          <h1 className="pw-h1" style={{ margin: 0 }}>
            Patchwerx: Automatic Rescheduling for Therapists
          </h1>
          <p className="pw-lead" style={{ marginTop: 16, marginBottom: 12, fontSize: '1.08rem', lineHeight: 1.7, maxWidth: '36em' }}>
            Patchwerx fills last-minute cancellations by offering the open time to other clients who want an earlier appointment.
          </p>
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>
            No manual texting. No managing waitlists. Just fewer empty hours in your calendar.
          </p>
          <p style={{ marginTop: 16, marginBottom: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--ink)' }}>
            Most therapists lose $500–$2,000 per month to cancellations. Patchwerx helps you recover that revenue automatically.
          </p>
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
          {redirecting ? 'Redirecting…' : 'Therapist Sign-Up'}
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
          {redirecting ? 'Redirecting…' : 'Client Sign-Up'}
        </button>
      </div>

      {/* The Problem */}
      <section className="pw-home-section" style={{ marginBottom: 36 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 12 }}>Cancellations Cost More Than Just Time</h2>
        <div className="pw-panel" style={{ padding: 20, maxWidth: 640 }}>
          <p style={{ margin: '0 0 12px', fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
            Every therapist deals with cancellations. But refilling those openings usually means texting multiple clients, checking who might want the time, coordinating schedules manually, and hoping someone responds in time. Most of the time, the slot stays empty—that means lost revenue and wasted time.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="pw-home-section" style={{ marginBottom: 36 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 16 }}>How Patchwerx Works</h2>
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
                { n: 1, title: 'A session opens up', desc: 'A client cancels an appointment.' },
                { n: 2, title: 'Clients are notified', desc: 'Patchwerx offers the time to clients who want earlier appointments.' },
                { n: 3, title: 'The slot fills', desc: 'A client claims the opening and the session is rebooked.' },
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
            <p style={{ marginTop: 16, marginBottom: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)' }}>
              Your calendar stays full without extra work.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="pw-home-section" style={{ marginBottom: 36 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 16 }}>Why Therapists Use Patchwerx</h2>
        <div className="pw-grid3">
          {[
            { title: 'Recover lost revenue', desc: 'Last-minute cancellations don\'t have to mean lost income.' },
            { title: 'Save hours of admin work', desc: 'No more texting clients or managing waitlists manually.' },
            { title: 'Runs in the background', desc: 'Once connected, Patchwerx works quietly behind the scenes.' },
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
        <h2 className="pw-sectionTitle" style={{ marginBottom: 16 }}>Designed to Be Simple and Respectful</h2>
        <div className="pw-panel" style={{ padding: 20 }}>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink-muted)' }}>
            <li><strong style={{ color: 'var(--ink)' }}>No subscriptions.</strong> You only pay when Patchwerx successfully fills a canceled session.</li>
            <li><strong style={{ color: 'var(--ink)' }}>Clients opt in.</strong> Only clients who want earlier openings receive notifications.</li>
            <li><strong style={{ color: 'var(--ink)' }}>Nothing new to manage.</strong> Once connected, Patchwerx runs quietly in the background.</li>
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section className="pw-home-section" style={{ marginBottom: 36 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 16 }}>Simple Pricing</h2>
        <div className="pw-panel pw-panel-elevated" style={{ padding: 24, maxWidth: 480 }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent)' }}>$5 per rebooked appointment</div>
          <p style={{ marginTop: 12, marginBottom: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>
            If Patchwerx fills the slot, it costs $5. If it doesn't, you pay nothing. Even filling just 4 sessions per month is often $600–$1,000 in recovered revenue.
          </p>
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
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)' }}>Stop losing revenue to cancellations</div>
            <div style={{ marginTop: 4, fontSize: '0.9rem', color: 'var(--ink-muted)' }}>Patchwerx helps therapists refill canceled appointments automatically so you can stay focused on your clients.</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="pw-link pw-linkPrimary"
              onClick={handleTherapistSignUp}
              disabled={redirecting}
              style={{ cursor: redirecting ? 'wait' : 'pointer', font: 'inherit' }}
            >
              {redirecting ? 'Redirecting…' : 'Therapist Sign-Up'}
            </button>
            <Link className="pw-link" to="/contact">Contact us</Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
