import {
  Activity,
  BadgeCheck,
  CircleAlert,
  KeyRound,
  LockKeyhole,
  MailCheck,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
} from 'lucide-react'

export const ADMIN_EMAIL = 'admin@cybersafebuddy.com'
export const DEMO_OTP = '246810'

export const authTimeline = [
  {
    title: 'Password accepted',
    description: 'The admin password only starts the session request.',
    icon: KeyRound,
  },
  {
    title: 'OTP required',
    description: 'Every admin sign-in must pass a one-time code challenge.',
    icon: Smartphone,
  },
  {
    title: 'Session hardened',
    description: 'The console opens only after a verified MFA step.',
    icon: ShieldCheck,
  },
]

export const recoveryTimeline = [
  {
    title: 'Find account',
    description: 'Submit the admin email for recovery.',
    icon: MailCheck,
  },
  {
    title: 'Verify OTP',
    description: 'Confirm ownership before changing credentials.',
    icon: BadgeCheck,
  },
  {
    title: 'Reset password',
    description: 'Create a new password and confirm with OTP.',
    icon: LockKeyhole,
  },
]

export const consoleMetrics = [
  { label: 'Auth events', value: '128', trend: '+14 today', icon: Activity },
  { label: 'MFA coverage', value: '100%', trend: 'Required every time', icon: ShieldCheck },
  { label: 'Pending reviews', value: '7', trend: '2 high priority', icon: CircleAlert },
  { label: 'Admin seats', value: '4', trend: 'All verified', icon: UserRoundCheck },
]

export const recentEvents = [
  {
    title: 'MFA challenge completed',
    detail: 'Primary admin confirmed OTP from trusted email channel.',
    time: '2 min ago',
    tone: 'success',
  },
  {
    title: 'Password reset requested',
    detail: 'Recovery flow locked until OTP validation succeeds.',
    time: '18 min ago',
    tone: 'warning',
  },
  {
    title: 'Content editor opened',
    detail: 'Tool override panel accessed after fresh MFA verification.',
    time: '42 min ago',
    tone: 'neutral',
  },
]
