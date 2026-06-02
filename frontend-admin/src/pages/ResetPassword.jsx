import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import OtpInput from '../components/OtpInput'
import PasswordField from '../components/PasswordField'
import StatusNote from '../components/StatusNote'
import { DEMO_OTP } from '../data/authFlow'

export default function ResetPassword({ recovery, onCompleteReset }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  if (!recovery?.otpVerified) return <Navigate to="/forgot-password" replace />

  function handleSubmit(event) {
    event.preventDefault()
    if (password.length < 10) {
      setError('Use at least 10 characters for the new admin password.')
      return
    }
    if (password !== confirmPassword) {
      setError('The password confirmation does not match.')
      return
    }
    if (otp !== DEMO_OTP) {
      setError('Final OTP did not match. Confirm the latest reset code.')
      return
    }
    setError('')
    onCompleteReset()
  }

  return (
    <AuthLayout
      eyebrow="Final reset check"
      sideCopy="Password reset requires one more OTP confirmation before the credential is accepted."
      sideTitle="Change the password only after verified recovery."
      subtitle={`Resetting password for ${recovery.email}. Demo OTP: ${DEMO_OTP}.`}
      title="Create new password"
    >
      {error && <StatusNote>{error}</StatusNote>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <PasswordField
          autoComplete="new-password"
          label="New password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Minimum 10 characters"
          value={password}
        />
        <PasswordField
          autoComplete="new-password"
          label="Confirm password"
          onChange={(event) => setConfirmPassword(event.target.value)}
          value={confirmPassword}
        />
        <OtpInput label="Reset confirmation passcode" value={otp} onChange={setOtp} />
        <button className="primary-action" type="submit">
          Complete password reset
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </form>
    </AuthLayout>
  )
}
