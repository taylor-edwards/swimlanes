import { useEffect, useState } from 'react'

export const useKeysPressed = () => {
  const [keys, setKeys] = useState([])
  useEffect(() => {
    // add e.key to list of keys
    const keydownFn = e =>
      setKeys(keys.concat([e.key]))
    const keyupFn = e => {
      // remove last insertion of e.key from keys
      const lastIndex = keys.lastIndexOf(e.key)
      if (lastIndex !== -1) {
        setKeys(keys.slice(0, lastIndex).concat(keys.slice(lastIndex + 1)))
      }
    }
    const opts = {
      passive: true,
    }
    window.addEventListener('keydown', keydownFn, opts)
    window.addEventListener('keyup', keyupFn, opts)
    return () => {
      window.removeEventListener('keydown', keydownFn, opts)
      window.removeEventListener('keyup', keyupFn, opts)
    }
  }, [keys])
  return keys
}
