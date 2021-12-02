import { forwardRef } from 'react'
import { Emphasis } from './Typography'
import styles from '../styles/Button.module.scss'

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
      'btn',
      active ? styles.active : '',
      slim ? styles.slim : '',
      className,
    ].join(' ')}
    {...props}
    ref={ref}
  >
    <Emphasis>{children}</Emphasis>
  </button>
)

export default forwardRef(Button)
