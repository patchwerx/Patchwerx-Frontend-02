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
          <div className="pw-kicker" style={{ marginBottom: 14 }}>
            About Patchwerx
          </div>
          <h1 className="pw-h1" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.08, margin: 0 }}>
            What Patchwerx Is
          </h1>
          <p className="pw-lead" style={{ marginTop: 16, fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 640 }}>
            Patchwerx is a simple tool designed to help therapists refill canceled appointments.
          </p>
          <p style={{ marginTop: 14, marginBottom: 0, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
            Cancellations are a normal part of running a practice, but they often lead to lost revenue and wasted time. Therapists usually try to solve this by texting clients, checking waitlists, or manually coordinating schedules. Patchwerx handles that process automatically.
          </p>
          <p style={{ marginTop: 14, marginBottom: 0, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
            When a session opens up, Patchwerx offers the time to other clients who have opted in for earlier appointments. If someone wants the spot, they can claim it and the appointment is rebooked. No manual outreach. No schedule juggling. Just fewer empty hours in your calendar.
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

      {/* Respectful Client Communication */}
      <section style={{ marginTop: 28 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 12 }}>
          Respectful Client Communication
        </h2>
        <div className="pw-panel" style={{ padding: 20, maxWidth: 640 }}>
          <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
            Patchwerx only contacts clients who want earlier openings. Clients opt in to receive notifications about new appointment availability, and they can stop receiving those messages anytime. The goal is to make rescheduling easier for both therapists and clients.
          </p>
        </div>
      </section>
    </div>
  )
}
