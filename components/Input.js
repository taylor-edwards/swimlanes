import { forwardRef } from 'react'
import { noop } from '../util'
import styles from '../styles/Input.module.scss'

const Input = forwardRef(({
  className = '',
  type = 'text',
  value,
  onChange = noop,
  onEnter = noop,
  onEsc = noop,
  onInput = noop,
  onKeyDown = noop,
  ignoreShiftKey = false,
  ...inheritedProps
}, ref) => {
  const handleChange = e => {
    onChange(e)
    const nextValue = e.currentTarget.value
    if (nextValue !== value) {
      onInput(nextValue)
    }
  }

  const handleKeyDown = e => {
    switch (e.key) {
      case 'Enter':
        // allow Enter key inputs if user is holding Shift
        if (!e.shiftKey || ignoreShiftKey) {
          e.preventDefault()
          onEnter(value)
        }
        break

      case 'Escape':
        e.preventDefault()
        onEsc(value)
        break

      default:
        break
    }
    onKeyDown(e)
  }

  const props = {
    ...inheritedProps,
    ref,
    value,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
  }

  switch (type) {
    case 'textarea':
      return (
        <textarea
          {...props}
          className={[styles.input, styles.textarea, className].join(' ')}
        />
      )

    // TODO: handle number, date, file, etc inputs
    
    case 'text': // fallthrough
    default:
      return (
        <input
          {...props}
          className={[styles.input, className].join(' ')}
          type="text"
        />
      )
  }
})

export default Input
