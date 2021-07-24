import { applyMiddleware } from 'redux'
import * as actions from './actions'

const genID = () => `id:${Math.random().toString(36).substr(2)}`

const noteMiddleware = store => next => action => {
  if (action.type === actions.ADD_NOTE) {
    action.noteID = genID()
  }
  return next(action)
}

const laneMiddleware = store => next => action => {
  if (action.type === actions.ADD_LANE) {
    action.laneID = genID()
  }
  return next(action)
}

export default applyMiddleware(noteMiddleware, laneMiddleware)
