import styles from '../styles/Typography.module.scss'

export const Body = ({
  children,
  className = '',
  inline = false,
  ...props
}) => {
  const p = {
    ...props,
    className: `body ${styles.body} ${className}`,
  }
  if (inline) {
    return <span {...p}>{children}</span>
  }
  return <p {...p}>{children}</p>
}

export const Caption = ({
  children,
  className = '',
  block = false,
  ...props
}) => {
  const p = {
    ...props,
    className: `caption ${styles.caption} ${className}`,
  }
  if (block) {
    return <p {...p}>{children}</p>
  }
  return <span {...p}>{children}</span>
}

export const Heading = ({ children, className = '', level, ...props }) => {
  const p = {
    ...props,
    className: `heading ${styles.heading} ${className}`,
  }
  switch (parseInt(level)) {
    case 1:
      return <h1 {...p}>{children}</h1>
    case 2:
      return <h2 {...p}>{children}</h2>
    case 3:
      return <h3 {...p}>{children}</h3>
    case 4:
      return <h4 {...p}>{children}</h4>
    case 5:
      return <h5 {...p}>{children}</h5>
    case 6:
      return <h6 {...p}>{children}</h6>
    default:
      return <p {...p}>{children}</p>
  }
}

export const Emphasis = ({
  children,
  className = '',
  block = false,
  ...props
}) => {
  const p = {
    ...props,
    className: `emphasis ${styles.emphasis} ${className}`,
  }
  if (block) {
    return <p {...p}>{children}</p>
  }
  return <span {...p}>{children}</span>
}
