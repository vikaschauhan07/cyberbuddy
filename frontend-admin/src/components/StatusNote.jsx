import { CircleAlert, CircleCheck } from 'lucide-react'

export default function StatusNote({ tone = 'info', children }) {
  const Icon = tone === 'success' ? CircleCheck : CircleAlert

  return (
    <div className={`status-note ${tone}`} role="status">
      <Icon size={18} aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}
