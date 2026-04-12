/**
 * Decorative hero graphic for the About page (right column).
 * Pure layout/CSS—no external image assets.
 */
function AboutHeroVisual() {
  const connector = (
    <div
      aria-hidden
      style={{
        width: 2,
        height: 20,
        margin: '0 auto',
        borderRadius: 2,
        background: 'linear-gradient(180deg, var(--accent) 0%, rgba(125, 139, 111, 0.25) 100%)',
      }}
    />
  )

  return (
    <div
      aria-hidden="true"
      className="pw-about-visual"
      style={{
        width: '100%',
        maxWidth: 420,
        borderRadius: 16,
        border: '1px solid var(--border)',
        background:
          'linear-gradient(165deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 42%), var(--bg-card-alt)',
        boxShadow: 'var(--shadow-soft)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -2,
          background: 'radial-gradient(340px 200px at 85% 15%, var(--accent-glow), transparent 55%)',
          filter: 'blur(2px)',
          pointerEvents: 'none',
          opacity: 0.9,
        }}
      />
      <div style={{ position: 'relative', padding: 22 }}>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'var(--ink)',
            letterSpacing: '0.03em',
            marginBottom: 4,
          }}
        >
          How it fits together
        </div>
        <p
          style={{
            margin: '0 0 18px',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            color: 'var(--ink-muted)',
          }}
        >
          Outlook holds your real schedule. Patchwerx sits in the middle running reminders and rebooking. Clients get
          the nudges and can claim open times.
        </p>

        {/* Step 1 — Outlook */}
        <div
          style={{
            borderRadius: 14,
            padding: 14,
            background: 'rgba(125, 139, 111, 0.1)',
            border: '1px solid rgba(125, 139, 111, 0.28)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--sage)', letterSpacing: '0.04em' }}>
              OUTLOOK
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-faint)' }}>Your calendar</span>
          </div>
          <div
            style={{
              marginTop: 10,
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 4,
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '1',
                  borderRadius: 6,
                  background:
                    i === 2 || i === 3
                      ? 'rgba(125, 139, 111, 0.45)'
                      : 'rgba(122, 99, 72, 0.12)',
                  border:
                    i === 2 || i === 3
                      ? '1px solid rgba(125, 139, 111, 0.5)'
                      : '1px solid rgba(122, 99, 72, 0.15)',
                }}
              />
            ))}
          </div>
        </div>

        {connector}

        {/* Step 2 — Patchwerx between Outlook and Clients */}
        <div
          style={{
            borderRadius: 14,
            padding: '14px 16px',
            background: 'var(--accent-soft)',
            border: '1px solid rgba(125, 139, 111, 0.35)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--sage-muted)', letterSpacing: '0.06em' }}>
            PATCHWERX
          </div>
          <div style={{ marginTop: 8, fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.4 }}>
            Reminders &amp; rebooking
          </div>
          <div style={{ marginTop: 6, fontSize: '0.8rem', color: 'var(--ink-muted)', lineHeight: 1.45 }}>
            Confirms openings, lines up who&apos;s next when someone passes
          </div>
        </div>

        {connector}

        {/* Step 3 — Clients */}
        <div
          style={{
            borderRadius: 14,
            padding: 14,
            background: 'rgba(255, 255, 255, 0.35)',
            border: '1px solid var(--brown-border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
            <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--brown-muted)', letterSpacing: '0.04em' }}>
              CLIENTS
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-faint)' }}>SMS &amp; replies</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background:
                    i === 1 ? 'linear-gradient(145deg, var(--accent) 0%, #6d7a62 100%)' : 'rgba(122, 99, 72, 0.18)',
                  border: i === 1 ? '2px solid rgba(125, 139, 111, 0.55)' : '1px solid rgba(122, 99, 72, 0.2)',
                  boxShadow: i === 1 ? '0 2px 8px var(--accent-glow)' : 'none',
                }}
              />
            ))}
            <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginLeft: 4 }}>
              People who can take the next slot
            </span>
          </div>
          <div
            style={{
              marginTop: 12,
              paddingTop: 10,
              borderTop: '1px dashed rgba(122, 99, 72, 0.25)',
              fontSize: '0.82rem',
              lineHeight: 1.45,
              color: 'var(--ink)',
              fontStyle: 'italic',
            }}
          >
            &ldquo;Opening at 2:00 Thursday—reply YES to grab it.&rdquo;
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <div style={{ paddingBottom: 28 }}>
      <section
        style={{
          paddingTop: 32,
          paddingBottom: 32,
          background: 'var(--bg-elevated)',
          borderRadius: 12,
          paddingLeft: 18,
          paddingRight: 18,
          border: '1px solid var(--brown-border)',
          boxShadow: 'var(--shadow-card-on-card)',
        }}
      >
        <div className="pw-about-heroGrid">
          <div style={{ maxWidth: 720, minWidth: 0 }}>
            <h1 className="pw-h1" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.08, margin: 0 }}>
              Patchwerx: Appointments, Outlook, and SMS—working together
            </h1>
            <p className="pw-lead" style={{ marginTop: 16, fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 640 }}>
              Patchwerx is a small, focused product for anyone who sells time: connect Microsoft Outlook, send SMS
              reminders so people confirm their slot, and when they don’t, help that opening find a new home.
            </p>
            <p style={{ marginTop: 14, marginBottom: 0, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
              Cancellations and no-shows happen in every line of work. Most of us patch the schedule with manual texts and
              crossed fingers. Patchwerx automates the polite nudges and the “who’s next?” part.
            </p>
            <p style={{ marginTop: 14, marginBottom: 0, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
              If someone drops out or doesn’t confirm, Patchwerx can offer that time to people who’ve said they want an
              earlier slot—so you stay booked and your calendar stays honest.
            </p>

            <div style={{ marginTop: 28 }}>
              <h2 className="pw-sectionTitle" style={{ marginBottom: 12 }}>
                Built for solo pros and small teams
              </h2>
              <div className="pw-panel" style={{ padding: 20 }}>
                <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
                  Patchwerx isn’t trying to replace your whole stack—it does one thing well: keep your offered times from
                  evaporating when life gets in the way. No new workflow to memorize. Connect Outlook, line up who should
                  hear about openings, and let SMS plus rebooking logic handle the rest.
                </p>
              </div>
            </div>
          </div>

          <AboutHeroVisual />
        </div>
      </section>
    </div>
  )
}
