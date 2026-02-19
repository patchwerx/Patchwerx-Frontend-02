export default function About() {
  return (
    <div style={{ paddingBottom: 28 }}>
      {/* HERO */}
      <section
        className="pw-hero"
        style={{
          paddingTop: 32,
          paddingBottom: 32,
          rowGap: 22,
          background:
            'linear-gradient(180deg, rgba(220,245,235,0.6), rgba(240,250,245,0.6))',
          borderRadius: 16,
          paddingLeft: 18,
          paddingRight: 18,
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <div
            className="pw-kicker"
            style={{
              fontWeight: 800,
              fontSize: '1.05rem',
              lineHeight: 1.3,
              color: 'rgba(12,74,58,0.9)',
              marginBottom: 14,
            }}
          >
            About Patchwerx
          </div>

          <h1
            className="pw-h1"
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              margin: 0,
              color: 'rgba(6,46,32,0.95)',
            }}
          >
            Built to reduce gaps in therapy schedules.
          </h1>

          <p
            className="pw-lead"
            style={{
              marginTop: 16,
              fontSize: '1.15rem',
              lineHeight: 1.7,
              color: 'rgba(6,46,32,0.85)',
              fontWeight: 520,
              maxWidth: 640,
            }}
          >
            Patchwerx helps therapists keep their schedules full without the
            manual work. When a client cancels, we automatically offer the
            opening to the right people and confirm the first one who accepts.
          </p>
        </div>

        {/* Calendar image panel */}
        <aside
          className="pw-panel"
          style={{
            padding: 14,
            maxWidth: 420,
            background: 'rgba(230,250,240,0.9)',
            border: '1px solid rgba(16,185,129,0.18)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe"
            alt="Calendar planning"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 12,
              display: 'block',
            }}
          />
          <div
            style={{
              marginTop: 10,
              fontSize: '0.95rem',
              color: 'rgba(6,46,32,0.75)',
              lineHeight: 1.5,
              fontWeight: 520,
            }}
          >
            Patchwerx watches your calendar and fills openings automatically.
          </div>
        </aside>
      </section>

      {/* Core principles */}
      <section className="pw-grid3" style={{ marginTop: 24, gap: 16 }}>
        {[
          {
            t: 'Simple by design',
            d: 'Connect your calendar, set a few rules, and Patchwerx handles the rest.',
          },
          {
            t: 'Built for small practices',
            d: 'Designed for solo therapists and small teams who want fewer gaps and less admin.',
          },
          {
            t: 'Calendar-first',
            d: 'Everything starts with your real schedule—no separate booking system.',
          },
        ].map((x) => (
          <div
            key={x.t}
            className="pw-panel"
            style={{
              padding: 18,
              background: 'rgba(236,253,245,0.85)',
              border: '1px solid rgba(16,185,129,0.15)',
            }}
          >
            <div
              style={{
                fontSize: '1.05rem',
                fontWeight: 950,
                marginBottom: 8,
                color: 'rgba(6,46,32,0.92)',
              }}
            >
              {x.t}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'rgba(6,46,32,0.82)',
                fontWeight: 520,
              }}
            >
              {x.d}
            </p>
          </div>
        ))}
      </section>

      {/* Closing section */}
      <section style={{ marginTop: 26 }}>
        <div
          className="pw-panel"
          style={{
            padding: 18,
            maxWidth: 720,
            background: 'rgba(220,245,235,0.7)',
            border: '1px solid rgba(16,185,129,0.18)',
          }}
        >
          <div
            style={{
              fontWeight: 950,
              fontSize: '1.2rem',
              color: 'rgba(6,46,32,0.92)',
              marginBottom: 8,
            }}
          >
            The goal
          </div>
          <p
            style={{
              margin: 0,
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'rgba(6,46,32,0.84)',
              fontWeight: 520,
            }}
          >
            Therapy schedules are sensitive and hard to manage when
            cancellations happen. Patchwerx exists to quietly handle those
            moments—so therapists can focus on clients instead of logistics.
          </p>
        </div>
      </section>
    </div>
  )
}
