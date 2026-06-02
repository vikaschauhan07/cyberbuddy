import { ShieldCheck } from 'lucide-react'
import { authTimeline } from '../data/authFlow'

export default function AuthLayout({ eyebrow, title, subtitle, children, sideTitle, sideCopy }) {
  return (
    <main className="auth-page">
      <section className="auth-brand-panel" aria-label="CyberSafeBuddy admin security model">
        <div className="brand-mark">
          <ShieldCheck size={28} aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow">CyberSafeBuddy Admin</p>
          <h1>{sideTitle}</h1>
          <p className="brand-copy">{sideCopy}</p>
        </div>
        <div className="security-timeline">
          {authTimeline.map((item) => {
            const Icon = item.icon
            return (
              <div className="timeline-row" key={item.title}>
                <span className="timeline-icon">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
              </div>
            )
          })}
        </div>
        <div className="admin-proof">
          <span>Policy</span>
          <strong>Fresh OTP on every privileged entry</strong>
        </div>
      </section>

      <section className="auth-card" aria-labelledby="auth-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="auth-heading">{title}</h2>
        <p className="auth-subtitle">{subtitle}</p>
        {children}
      </section>
    </main>
  )
}
