import { motion } from 'framer-motion'

const cardHover = { y: -6 }
const cardSpring = { type: 'spring', stiffness: 280, damping: 22 }

// Placeholder data until client/therapist and appointments APIs are connected
const placeholderTherapist = {
  name: 'Your therapist',
  practice: 'Practice name',
}
const placeholderAppointments = [
  { id: 1, date: 'Mar 15, 2025', time: '10:00 AM', label: 'Session' },
  { id: 2, date: 'Mar 22, 2025', time: '2:00 PM', label: 'Session' },
]

export default function Profile() {
  const cardStyle = {
    padding: '18px 20px',
    borderRadius: 12,
    background: '#f8f4ed',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow-soft)',
  }

  return (
    <div
      style={{
        paddingBottom: 40,
        paddingTop: 2,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 12,
        background: 'var(--bg-card)',
      }}
    >
      <section style={{ paddingTop: 4, paddingBottom: 24 }}>
        <h1 className="pw-h1" style={{ margin: '0 0 24px 0' }}>
          Dashboard
        </h1>

        {/* Their therapist */}
        <h2 className="pw-h1" style={{ fontSize: '1.35rem', margin: '0 0 12px 0' }}>
          Their therapist
        </h2>
        <p className="pw-lead" style={{ marginBottom: 16, fontSize: '1rem', color: 'var(--ink-muted)' }}>
          The practice you’re on the waitlist with.
        </p>
        <motion.div
          style={{ ...cardStyle, marginBottom: 28, maxWidth: 400 }}
          whileHover={cardHover}
          transition={cardSpring}
        >
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>
            {placeholderTherapist.name}
          </div>
          <div style={{ marginTop: 6, fontSize: '0.95rem', color: 'var(--ink-muted)', fontWeight: 600 }}>
            {placeholderTherapist.practice}
          </div>
        </motion.div>

        {/* Upcoming appointments */}
        <h2 className="pw-h1" style={{ fontSize: '1.35rem', margin: '0 0 12px 0' }}>
          Upcoming appointments
        </h2>
        <p className="pw-lead" style={{ marginBottom: 16, fontSize: '1rem', color: 'var(--ink-muted)' }}>
          Your scheduled sessions. Confirm or cancel when you receive a reminder.
        </p>
        <div
          className="pw-panel"
          style={{
            background: 'var(--bg-elevated)',
            borderRadius: 12,
            border: '1px solid var(--brown-border)',
            boxShadow: 'var(--shadow-card-on-card)',
            overflow: 'hidden',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {placeholderAppointments.map((apt) => (
              <li
                key={apt.id}
                style={{
                  padding: '18px 20px',
                  borderBottom: '1px solid var(--border)',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 12,
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '1rem' }}>{apt.label}</div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', marginTop: 4 }}>
                    {apt.date} · {apt.time}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {placeholderAppointments.length === 0 && (
            <p style={{ padding: 24, margin: 0, color: 'var(--ink-faint)', fontSize: '0.95rem' }}>
              No upcoming appointments.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
