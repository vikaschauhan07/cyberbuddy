import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ArrowRight, RotateCw } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import OtpInput from '../components/OtpInput'
import StatusNote from '../components/StatusNote'
import { DEMO_OTP } from '../data/authFlow'

export default function MfaChallenge({ pendingAuth, onCompleteMfa }) {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [sentAt, setSentAt] = useState(() => new Date())

  if (!pendingAuth) return <Navigate to="/login" replace />

  function handleSubmit(event) {
    event.preventDefault()
    if (otp !== DEMO_OTP) {
      setError('The OTP did not match. Use the latest six-digit code.')
      return
    }
    onCompleteMfa(pendingAuth.email)
  }

  function resendCode() {
    setOtp('')
    setError('')
    setSentAt(new Date())
  }

  return (
    <AuthLayout
      eyebrow="MFA required"
      sideCopy="A password alone cannot open admin tools. This challenge is created for every sign-in attempt."
      sideTitle="Verify the person holding the admin account."
      subtitle={`Code sent for ${pendingAuth.email}. Demo OTP: ${DEMO_OTP}.`}
      title="Enter one-time passcode"
    >
      {error && <StatusNote>{error}</StatusNote>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <OtpInput value={otp} onChange={setOtp} />
        <div className="form-meta">
          <span>Issued {sentAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <button className="ghost-action" onClick={resendCode} type="button">
            <RotateCw size={16} aria-hidden="true" />
            Resend
          </button>
        </div>
        <button className="primary-action" type="submit">
          Verify and open console
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </form>
    </AuthLayout>
  )
}
