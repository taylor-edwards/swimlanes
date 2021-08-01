import { forwardRef } from 'react'
import styles from '../styles/Button.module.scss'

const styleTypes = {
  default: styles.default,
  emphasis: styles.emphasis,
}

const Button = forwardRef(
  ({ children, className = '', slim, type = 'default', ...props }, ref) => (
    <button
      className={[
        styles.btn,
        styleTypes[type],
        slim ? styles.slim : '',
        className,
      ].join(' ')}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  )
)

export default Button
