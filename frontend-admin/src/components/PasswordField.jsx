import { useState } from 'react'
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import FormField from './FormField'

export default function PasswordField({
  autoComplete,
  label,
  onChange,
  placeholder,
  value,
}) {
  const [visible, setVisible] = useState(false)
  const Icon = visible ? EyeOff : Eye

  return (
    <FormField icon={LockKeyhole} label={label}>
      <div className="password-control">
        <input
          autoComplete={autoComplete}
          onChange={onChange}
          placeholder={placeholder}
          type={visible ? 'text' : 'password'}
          value={value}
        />
        <button
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="icon-button"
          onClick={() => setVisible((current) => !current)}
          title={visible ? 'Hide password' : 'Show password'}
          type="button"
        >
          <Icon size={18} aria-hidden="true" />
        </button>
      </div>
    </FormField>
  )
}
