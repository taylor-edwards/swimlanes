import { forwardRef, useMemo } from 'react'
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
  autoCompletions = [],
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

      case 'Tab': {
        const match = matchingCompletions[0]
        if (value && value.length > 0 && match) {
          e.preventDefault()
          onInput(match)
        }
        break
      }

      default:
        break
    }
    onKeyDown(e)
  }

  const matchingCompletions = useMemo(() =>
    !value || value.length === 0
      ? []
      : autoCompletions.filter(str => str.startsWith(value)),
    [autoCompletions, value],
  )

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
        <div className={[styles.container, className].join(' ')}>
          <input
            {...props}
            className={styles.input}
            type="text"
          />
          <ul className={styles.completions}>
            {matchingCompletions.map(str => (
              <li key={str} className={styles.match}>{str}</li>
            ))}
          </ul>
        </div>
      )
  }
})

export default Input
