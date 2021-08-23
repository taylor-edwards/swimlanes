import { themes } from '../constants'
import { useTheme } from '../store'

const ThemeSelector = () => {
  const [theme, selectTheme] = useTheme()
  return (
    <select value={theme} onChange={e => selectTheme(e.currentTarget.value)}>
      {Object.keys(themes).map(themeID => (
        <option key={themeID} value={themeID}>{themeID}</option>
      ))}
    </select>
  )
}

export default ThemeSelector
