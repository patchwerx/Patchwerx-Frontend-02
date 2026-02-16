import { useState } from 'react'

export default function TherapistLogin() {
  const [email, setEmail] = useState('')

  const submit = (e) => {
    e.preventDefault()
    // placeholder: wire to real auth later
    alert(`Logged in (stub) as ${email}`)
  }

  return (
    <div>
      <h2>Login</h2>
      <p className="pw-lead">Stub login for now — we’ll connect real auth next.</p>

      <form className="pw-form" onSubmit={submit}>
        <div>
          <label className="pw-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="pw-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>
        <button className="pw-btn" type="submit">
          Sign in
        </button>
      </form>
    </div>
  )
}
