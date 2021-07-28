import { forwardRef } from 'react'
import styles from '../styles/Button.module.scss'

const styleTypes = {
  default: styles.default,
  emphasis: styles.emphasis,
}

const Button = forwardRef(
  ({ children, className, type = 'default', ...props }, ref) => (
    <button
      className={[styles.btn, styleTypes[type]].join(' ')}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  )
)

export default Button
