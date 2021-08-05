import { useEffect } from 'react'
import { useUndoRedo } from '../store'

const UndoRedoHandler = ({ children }) => {
  const [undoRedo, undo, redo] = useUndoRedo()
  const windowType = typeof window
  useEffect(() => {
    if (windowType !== 'undefined') {
      const listener = e => {
        if (e.ctrlKey && !e.shiftKey && !e.altKey) {
          switch (e.key) {
            case 'z':
              undo()
              break
            case 'y':
              redo()
              break
          }
        }
      }
      window.addEventListener('keydown', listener, false)
      return () =>
        window.removeEventListener('keydown', listener, false)
    }
  }, [windowType, undo, redo])
  return children
}

export default UndoRedoHandler
