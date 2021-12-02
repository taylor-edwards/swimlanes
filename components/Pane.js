import styles from '../styles/Pane.module.scss'
import { useTheme } from '../store'

const Pane = ({ className = '', children, themeOverride }) => {
  const [theme] = useTheme()
  const t = themeOverride ?? theme
  return (
    <div className={`pane--wrapper ${styles.wrapper} ${className}`}>
      {t === 'yogurt' && (
        <svg
          viewBox="0 0 5000 1000"
          preserveAspectRatio="none"
          className="bg-wiggle"
        >
          <defs>
            <linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="gradient-fill">
              <stop stopColor="hsla(var(--hsl), 0.75)" offset="0%" />
              <stop stopColor="hsla(var(--hsl), 0)" offset="100%" />
            </linearGradient>

            <mask id="wiggle-mask" fill="#fff">
              <path d="M5000,1000 L0,1000 L0,337.955829 C1216.49485,-112.651943 1216.49485,-112.651943 2500,337.955829 C3783.50515,788.563602 3783.50515,788.563602 5000,337.955829 L5000,1000 Z"></path>
            </mask>

            <rect
              id="wiggle"
              fill="url(#gradient-fill)"
              mask="url(#wiggle-mask)"
              x="0"
              y="0"
              width="5000"
              height="1000"
            ></rect>
          </defs>

          <use xlinkHref="#wiggle"></use>
          <use xlinkHref="#wiggle"></use>
        </svg>
      )}
      <div className={`pane ${styles.pane}`}>{children}</div>
    </div>
  )
}

export default Pane
