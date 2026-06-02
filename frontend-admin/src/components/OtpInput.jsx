const OTP_LENGTH = 6

export default function OtpInput({ value, onChange, label = 'One-time passcode' }) {
  const digits = value.padEnd(OTP_LENGTH, ' ').slice(0, OTP_LENGTH).split('')

  function handleChange(index, nextValue) {
    const clean = nextValue.replace(/\D/g, '').slice(-1)
    const nextDigits = value.padEnd(OTP_LENGTH, ' ').slice(0, OTP_LENGTH).split('')
    nextDigits[index] = clean || ' '
    onChange(nextDigits.join('').replace(/\s/g, ''))

    if (clean) {
      const nextInput = document.querySelector(`[data-otp-index="${index + 1}"]`)
      nextInput?.focus()
    }
  }

  function handleKeyDown(index, event) {
    if (event.key !== 'Backspace' || digits[index].trim()) return
    const previousInput = document.querySelector(`[data-otp-index="${index - 1}"]`)
    previousInput?.focus()
  }

  return (
    <fieldset className="otp-fieldset">
      <legend>{label}</legend>
      <div className="otp-grid">
        {digits.map((digit, index) => (
          <input
            aria-label={`OTP digit ${index + 1}`}
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            className="otp-box"
            data-otp-index={index}
            inputMode="numeric"
            key={index}
            maxLength={1}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            pattern="[0-9]*"
            type="text"
            value={digit.trim()}
          />
        ))}
      </div>
    </fieldset>
  )
}
