import { forwardRef } from 'react'
import styles from '../styles/Card.module.scss'

const Card = ({ children, className = '', ...props }, ref) => (
  <div
    className={`card--wrapper ${styles.wrapper} ${className}`}
    ref={ref}
    {...props}
  >
    <div className={`card ${styles.card}`}>{children}</div>
  </div>
)

export default forwardRef(Card)
