import { forwardRef } from 'react'
import styles from '../styles/Button.module.scss'

const styleTypes = {
  default: styles.default,
  emphasis: styles.emphasis,
  pill: styles.pill,
}

const Button = ({
  children,
  className = '',
  active = false,
  slim = false,
  type = 'default',
  ...props
}, ref) => (
  <button
    className={[
      styles.btn,
      styleTypes[type],
      active ? styles.active : '',
      slim ? styles.slim : '',
      className,
    ].join(' ')}
    {...props}
    ref={ref}
  >
    {children}
  </button>
)

export default forwardRef(Button)
