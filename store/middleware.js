import { applyMiddleware } from 'redux'
import * as actions from './actions'

const genID = () => `id:${Math.random().toString(36).substr(2)}`

const noteMiddleware = store => next => action => {
  if (action.type === actions.ADD_NOTE) {
    action.noteID = genID()
  }
  if (action.type === actions.COPY_NOTE) {
    action.newNoteID = genID()
  }
  return next(action)
}

const laneMiddleware = store => next => action => {
  if (action.type === actions.ADD_LANE) {
    action.laneID = genID()
  }
  return next(action)
}

/*
const tagMiddleware = store => next => action => {
  if (action.type === actions.ADD_TAG) {
    action.laneID = genID()
  }
  return next(action)
}
*/

const pickCacheableState = state => ({
  laneOrder: state.laneOrder,
  lanes: state.lanes,
  lastExport: state.lastExport,
  notes: state.notes,
  tags: state.tags,
})
const cacheMiddleware = store => next => action => {
  if (typeof window !== 'undefined') {
    switch (action.type) {
      case actions.RESTORE_CACHE:
        try {
          action.cachedState = pickCacheableState(
            JSON.parse(localStorage.getItem('atrium_cache_v1/user0')) ?? {},
          )
        } catch (err) {
          console.warn(
            'Could not restore application state from localStorage',
            { err },
          )
        }
        return next(action)

      case actions.EXPORT_CACHE:
        try {
          // only supports `action.format === 'json'`
          const exportableState = pickCacheableState(store.getState())
          const encodedJSON = encodeURIComponent(JSON.stringify(exportableState))
          const data = `data:text/json;charset=utf-8,${encodedJSON}`
          const a = document.createElement('a')
          a.href = data
          a.download = 'swimlanes.json'
          a.click()
        } catch (err) {
          console.warn('Could not export swimlanes.json', { err })
          // store.dispatch(exportError(err.message))
        }
        return next(action)
        break

      default: {
        const nextAction = next(action)
        try {
          const cacheableState = pickCacheableState(store.getState())
          localStorage.setItem(
            'atrium_cache_v1/user0',
            JSON.stringify(cacheableState),
          )
        } catch (err) {
          console.warn(
            'Could not cache application state to localStorage',
            { err },
          )
        }
        return nextAction
      }
    }
  }
}

const maxUndoStates = 50
let undoStack = []
let redoStack = []
export const undoableActions = [
  actions.ADD_LANE,
  actions.ADD_NOTE,
  actions.ADD_TAG,
  actions.APPLY_TAG,
  actions.DELETE_LANE,
  actions.DELETE_NOTE,
  actions.DELETE_TAG,
  actions.MOVE_LANE,
  actions.MOVE_NOTE,
  actions.REMOVE_TAG,
  actions.SET_LANE,
  actions.SET_NOTE,
  actions.SET_NOTE_ORDER,
]
const undoRedoMiddleware = store => next => action => {
  switch (action.type) {
    case actions.UNDO:
      if (undoStack.length > 0) {
        redoStack.push(store.getState())
        action.restoredState = undoStack.pop()
        action.undoCount = undoStack.length
        action.redoCount = redoStack.length
        return next(action)
      }
      break

    case actions.REDO:
      if (redoStack.length > 0) {
        undoStack.push(store.getState())
        action.restoredState = redoStack.pop()
        action.undoCount = undoStack.length
        action.redoCount = redoStack.length
        return next(action)
      }
      break

    default:
      if (undoableActions.indexOf(action.type) !== -1) {
        if (undoStack.length >= maxUndoStates) {
          undoStack = undoStack.slice(0, maxUndoStates - 1)
        }
        undoStack.push(store.getState())
        redoStack = []
        action.undoCount = undoStack.length
        action.redoCount = redoStack.length
      }
      return next(action)
      break
  }
  // swallow invalid UNDO/REDO actions (don't `return next(action)`)
}

export default applyMiddleware(
  noteMiddleware,
  laneMiddleware,
  undoRedoMiddleware,
  cacheMiddleware,
)
