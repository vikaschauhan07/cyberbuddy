import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, AtSign } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import PasswordField from '../components/PasswordField'
import StatusNote from '../components/StatusNote'
import { ADMIN_EMAIL } from '../data/authFlow'

export default function Login({ onBeginSignIn }) {
  const location = useLocation()
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.includes('@') || password.length < 8) {
      setError('Use an admin email and a password with at least 8 characters.')
      return
    }
    setError('')
    onBeginSignIn(email)
  }

  return (
    <AuthLayout
      eyebrow="Secure sign in"
      sideCopy="Admin access starts with credentials, then pauses for OTP verification every time."
      sideTitle="Control access before anyone reaches the console."
      subtitle="Enter your admin credentials. A fresh MFA challenge will follow before the console opens."
      title="Admin login"
    >
      {location.state?.resetComplete && (
        <StatusNote tone="success">Password reset completed. Sign in to start a new MFA challenge.</StatusNote>
      )}
      {error && <StatusNote>{error}</StatusNote>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField icon={AtSign} label="Admin email">
          <input
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
          />
        </FormField>
        <PasswordField
          autoComplete="current-password"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Minimum 8 characters"
          value={password}
        />
        <button className="primary-action" type="submit">
          Continue to MFA
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </form>
      <div className="auth-links">
        <Link to="/forgot-password">Forgot password</Link>
        <span>MFA is mandatory for every admin session.</span>
      </div>
    </AuthLayout>
  )
}
