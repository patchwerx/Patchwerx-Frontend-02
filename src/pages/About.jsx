export default function About() {
  return (
    <div style={{ paddingBottom: 28 }}>
      {/* Overview */}
      <section
        className="pw-hero"
        style={{
          paddingTop: 32,
          paddingBottom: 32,
          rowGap: 22,
          background: 'var(--bg-card)',
          borderRadius: 12,
          paddingLeft: 18,
          paddingRight: 18,
          border: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <div className="pw-kicker" style={{ marginBottom: 14 }}>
            About Patchwerx
          </div>
          <h1 className="pw-h1" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.08, margin: 0 }}>
            How Patchwerx works
          </h1>
          <p className="pw-lead" style={{ marginTop: 16, fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 640 }}>
            Patchwerx is a SaaS that integrates multiple platforms to automatically reschedule another client based on your designated priority profile when a cancellation happens.
          </p>
        </div>

        <aside className="pw-panel pw-panel-elevated" style={{ padding: 14, maxWidth: 420 }}>
          <img
            src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe"
            alt="Calendar planning"
            style={{ width: '100%', height: 'auto', borderRadius: 8, display: 'block' }}
          />
          <div style={{ marginTop: 10, fontSize: '0.95rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>
            We fill openings from your waitlist and sync with your calendar.
          </div>
        </aside>
      </section>

      {/* Step 1, 2, 3 */}
      <section style={{ marginTop: 28 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 20 }}>
          The process
        </h2>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 20 }}>
          {[
            {
              n: 1,
              title: 'Confirm or deny',
              body: 'Communications are sent 24–48 hours in advance (e.g. via Twilio) so clients can confirm or deny their appointment.',
            },
            {
              n: 2,
              title: 'Fill the slot from your waitlist',
              body: 'If a client cancels or fails to confirm within 24 hours of the appointment start time, we reach out to your waitlist to see who wants the now-available slot. The waitlist is your caseload: name, phone number, and priority (high, medium, low). We send text messages in order of priority. If nobody claims the slot, we send more SMS to the waitlist and so on, until someone accepts or the round is done.',
            },
            {
              n: 3,
              title: 'Calendar and notification',
              body: 'When someone on the waitlist accepts the appointment, an event is automatically added to your Google Calendar or Outlook calendar, and you receive a notification of the successful rebooking.',
            },
          ].map((step) => (
            <li
              key={step.n}
              className="pw-panel"
              style={{
                padding: 20,
                display: 'grid',
                gridTemplateColumns: '40px 1fr',
                gap: 16,
                alignItems: 'start',
                borderLeft: '4px solid var(--accent)',
                background: 'var(--bg-card)',
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#1c1916',
                  background: 'var(--accent)',
                }}
              >
                {step.n}
              </span>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>
                  Step {step.n}: {step.title}
                </h3>
                <p style={{ margin: '10px 0 0', fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Onboarding & Upkeep */}
      <section style={{ marginTop: 32 }}>
        <h2 className="pw-sectionTitle" style={{ marginBottom: 8 }}>
          Onboarding & upkeep (Google Calendar)
        </h2>
        <p style={{ marginBottom: 24, fontSize: '1rem', lineHeight: 1.6, color: 'var(--ink-muted)', maxWidth: 640 }}>
          Setup happens once at signup for both therapist and client. Ongoing upkeep is as-needed—therapists often do it weekly; clients in line with how often they have appointments.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {/* Onboarding */}
          <div className="pw-panel pw-panel-elevated" style={{ padding: 20 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)' }}>
              Onboarding (one-time)
            </h3>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
              <p style={{ margin: '0 0 10px', fontWeight: 600, color: 'var(--ink)' }}>Therapist</p>
              <ul style={{ margin: '0 0 16px', paddingLeft: 20 }}>
                <li>Sign up on the website and create an account</li>
                <li>Link Google Calendar to Patchwerx (click a link and allow access)</li>
                <li>In external booking tools (e.g. Calendly), set them to “watch” the new Google Calendar Patchwerx created for conflicts, and to write new events to the calendar named Patchwerx</li>
                <li>Wait for clients to opt in by signing up on the website</li>
              </ul>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Client</p>
              <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                <li>Sign up on the website and create an account; this links your account to your therapist’s</li>
              </ul>
            </div>
          </div>

          {/* Upkeep */}
          <div className="pw-panel" style={{ padding: 20 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)' }}>
              Upkeep (as-needed)
            </h3>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
              <p style={{ margin: '0 0 10px', fontWeight: 600, color: 'var(--ink)' }}>Therapist</p>
              <ul style={{ margin: '0 0 16px', paddingLeft: 20 }}>
                <li>Set each client’s priority ranking as needed</li>
                <li>Remove clients when you stop seeing them</li>
                <li>Guide new clients on how to sign up</li>
              </ul>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Client</p>
              <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                <li>Confirm appointments when prompted</li>
                <li>Watch for appointment opportunities when you want to be considered for openings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section style={{ marginTop: 28 }}>
        <div className="pw-panel" style={{ padding: 18, maxWidth: 720 }}>
          <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: 8 }}>
            The goal
          </div>
          <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
            Therapy schedules are sensitive and cancellations are disruptive. Patchwerx handles confirmations and refills from your priority waitlist so you can focus on clients instead of logistics.
          </p>
        </div>
      </section>
    </div>
  )
}
