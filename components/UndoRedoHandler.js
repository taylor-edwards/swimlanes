import { useEffect } from 'react'
import { useUndoRedo } from '../store'

const UndoRedoHandler = ({ children }) => {
  const [undoRedo, undo, redo] = useUndoRedo()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const listener = e => {
        if (e.ctrlKey) {
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
  }, [typeof window])
  return children
}

export default UndoRedoHandler
