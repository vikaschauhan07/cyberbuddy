import { useCallback, useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import AdminConsole from './pages/AdminConsole'
import ForgotPassword from './pages/ForgotPassword'
import Login from './pages/Login'
import MfaChallenge from './pages/MfaChallenge'
import ResetPassword from './pages/ResetPassword'
import { clearSession, readSession, writeSession } from './utils/authSession'

function AppRoutes() {
  const navigate = useNavigate()
  const [session, setSession] = useState(() => readSession())
  const [pendingAuth, setPendingAuth] = useState(null)
  const [recovery, setRecovery] = useState(null)

  const isAuthed = Boolean(session?.mfaVerifiedAt)

  const authActions = useMemo(
    () => ({
      beginSignIn(email) {
        setPendingAuth({
          email,
          reason: 'login',
          requestedAt: new Date().toISOString(),
        })
        navigate('/mfa')
      },
      completeMfa(email) {
        const nextSession = {
          email,
          role: 'Security Administrator',
          signedInAt: new Date().toISOString(),
          mfaVerifiedAt: new Date().toISOString(),
        }
        writeSession(nextSession)
        setSession(nextSession)
        setPendingAuth(null)
        navigate('/dashboard')
      },
      beginRecovery(email) {
        setRecovery({
          email,
          otpVerified: false,
          passwordPrepared: false,
        })
        navigate('/forgot-password')
      },
      verifyRecoveryOtp() {
        setRecovery((current) => ({ ...current, otpVerified: true }))
      },
      preparePasswordReset() {
        setRecovery((current) => ({ ...current, passwordPrepared: true }))
        navigate('/reset-password')
      },
      completeReset() {
        setRecovery(null)
        navigate('/login', { state: { resetComplete: true } })
      },
    }),
    [navigate],
  )

  const signOut = useCallback(() => {
    clearSession()
    setSession(null)
    navigate('/login')
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthed ? '/dashboard' : '/login'} replace />} />
      <Route path="/login" element={<Login onBeginSignIn={authActions.beginSignIn} />} />
      <Route
        path="/mfa"
        element={
          <MfaChallenge
            pendingAuth={pendingAuth}
            onCompleteMfa={authActions.completeMfa}
          />
        }
      />
      <Route
        path="/forgot-password"
        element={
          <ForgotPassword
            recovery={recovery}
            onBeginRecovery={authActions.beginRecovery}
            onPreparePasswordReset={authActions.preparePasswordReset}
            onVerifyRecoveryOtp={authActions.verifyRecoveryOtp}
          />
        }
      />
      <Route
        path="/reset-password"
        element={
          <ResetPassword
            recovery={recovery}
            onCompleteReset={authActions.completeReset}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthed ? (
            <AdminConsole session={session} onSignOut={signOut} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/console" element={<Navigate to={isAuthed ? '/dashboard' : '/login'} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
