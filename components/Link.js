import { Emphasis } from './Typography'

const Link = ({ children, className = '', ...props }) => (
  <a className={`link ${className}`} {...props}>
    <Emphasis>{children}</Emphasis>
  </a>
)

export default Emphasis
