import { useEffect } from 'react'
import { themes } from '../constants'
import { useTheme } from '../store'
import styles from '../styles/Theme.module.scss'


const Theme = ({ children }) => {
  const [theme] = useTheme()
  useEffect(() => {
    const themeClass = styles[theme.toLowerCase()]
    document.body.classList.add(themeClass)
    return () => document.body.classList.remove(themeClass)
  }, [theme])
  return children
}

export default Theme
