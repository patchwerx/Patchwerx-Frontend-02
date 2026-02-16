import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1 className="pw-h1">Automatic rebooking when sessions cancel.</h1>
      <p className="pw-lead">
        Patchwerx helps therapists fill last-minute openings by contacting the
        right clients at the right time — without manual back-and-forth.
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
        <Link className="pw-link pw-linkPrimary" to="/signup/therapist">
          Start therapist setup
        </Link>
        <Link className="pw-link" to="/app">
          View therapist dashboard
        </Link>
        <Link className="pw-link" to="/client">
          Client portal
        </Link>
      </div>
    </div>
  )
}
