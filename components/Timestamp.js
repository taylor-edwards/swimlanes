import { useMemo } from 'react'

const twelveHours = 1000 * 60 * 60 * 12

const Timestamp = ({ date }) => {
  const dateString = useMemo(() => {
    const d = new Date(date)
    const diff = Date.now() - d
    const lang = navigator.language
    let str = d.toLocaleTimeString(lang)
    if (diff > twelveHours) {
      str += ' '
      str += d.toLocaleDateString(lang)
    }
    return str
  }, [date])
  return dateString
}

export default Timestamp
