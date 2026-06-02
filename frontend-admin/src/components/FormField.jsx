export default function FormField({ icon: Icon, label, children }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <div className="input-shell">
        {Icon && <Icon size={18} aria-hidden="true" />}
        {children}
      </div>
    </label>
  )
}
