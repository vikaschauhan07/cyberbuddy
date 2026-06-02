import { useState } from 'react'
import { ArrowRight, AtSign } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import OtpInput from '../components/OtpInput'
import StatusNote from '../components/StatusNote'
import { ADMIN_EMAIL, DEMO_OTP, recoveryTimeline } from '../data/authFlow'

export default function ForgotPassword({
  recovery,
  onBeginRecovery,
  onPreparePasswordReset,
  onVerifyRecoveryOtp,
}) {
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  function handleEmailSubmit(event) {
    event.preventDefault()
    if (!email.includes('@')) {
      setError('Enter a valid admin email to request the recovery OTP.')
      return
    }
    setError('')
    onBeginRecovery(email)
  }

  function handleOtpSubmit(event) {
    event.preventDefault()
    if (otp !== DEMO_OTP) {
      setError('Recovery OTP did not match. Use the latest recovery code.')
      return
    }
    setError('')
    onVerifyRecoveryOtp()
    onPreparePasswordReset()
  }

  return (
    <AuthLayout
      eyebrow="Account recovery"
      sideCopy="Recovery also requires OTP, so a stolen inbox or guessed password cannot directly change admin access."
      sideTitle="Recover access without weakening MFA."
      subtitle={recovery ? `Recovery OTP sent to ${recovery.email}. Demo OTP: ${DEMO_OTP}.` : 'Start with the admin email. OTP verification is required before any password change.'}
      title={recovery ? 'Verify recovery OTP' : 'Forgot password'}
    >
      <div className="mini-steps" aria-label="Recovery steps">
        {recoveryTimeline.map((item) => {
          const Icon = item.icon
          return (
            <span className="mini-step" key={item.title}>
              <Icon size={15} aria-hidden="true" />
              {item.title}
            </span>
          )
        })}
      </div>
      {error && <StatusNote>{error}</StatusNote>}
      {!recovery ? (
        <form className="auth-form" onSubmit={handleEmailSubmit}>
          <FormField icon={AtSign} label="Admin email">
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
            />
          </FormField>
          <button className="primary-action" type="submit">
            Send recovery OTP
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleOtpSubmit}>
          <OtpInput label="Recovery passcode" value={otp} onChange={setOtp} />
          <button className="primary-action" type="submit">
            Verify and reset password
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </form>
      )}
    </AuthLayout>
  )
}
