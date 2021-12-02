import { useEffect } from 'react'
import Head from 'next/head'
import { MODES, THEMES } from '../constants'
import { useTheme } from '../store'

const Theme = ({ children, themeOverride, modeOverride }) => {
  const [theme, setTheme] = useTheme()

  // Move this effect to middleware to eliminate its implied singleton
  // requirement on this component's usage
  useEffect(() => {
    if (!children) {
      if (theme !== null) {
        // setTheme('aero')
        document.body.classList.add(theme)
      }
      return () => document.body.classList.remove(theme)
    }
  }, [theme])

  // Look up the path to the CSS file for the current theme, if any
  const t = THEMES[themeOverride ?? theme]
  const m = MODES[modeOverride] ?? ''
  return (
    <>
      <Head>
        {t && <link key={`theme--${t}`} rel="stylesheet" href={`/themes/${t}.css`} />}
      </Head>
      {children && <div className={`${t ?? themeOverride ?? ''} ${m}`}>{children}</div>}
    </>
  )
}

export default Theme
