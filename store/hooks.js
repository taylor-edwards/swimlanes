import { useDispatch, useSelector } from 'react-redux'
import * as actions from './actions'
import * as selectors from './selectors'

const useLens = (selector, ...actionCreators) => {
  const value = useSelector(selector)
  const dispatch = useDispatch()
  const actionDispatchers = actionCreators.map(actionCreator => 
    (...actionArgs) => dispatch(actionCreator(...actionArgs)),
  )
  return [
    value,
    ...actionDispatchers,
  ]
}

export const useLaneOrder = () => useLens(
  selectors.laneOrder,
  actions.addLane,
  actions.moveLane,
  actions.setLaneOrder,
)

export const useLane = id => useLens(
  selectors.lane.bind(null, id),
  actions.setLane.bind(null, id),
  actions.deleteLane.bind(null, id),
  actions.addNote.bind(null, id),
)

export const useNoteOrder = laneID => useLens(
  selectors.noteOrder.bind(null, laneID),
  actions.addNote.bind(null, laneID),
  actions.moveNote.bind(null, laneID),
  actions.setNoteOrder.bind(null, laneID),
)

export const useNote = id => useLens(
  selectors.note.bind(null, id),
  actions.setNote.bind(null, id),
  actions.deleteNote.bind(null, id),
)

export const useTags = () => useLens(selectors.tags)

export const useTag = id => useLens(
  selectors.tag.bind(null, id),
  actions.addTag.bind(null, id),
  actions.applyTag.bind(null, id),
  actions.removeTag.bind(null, id),
  actions.deleteTag.bind(null, id),
)

export const useDragAndDrop = () => useLens(
  selectors.dragAndDrop,
  actions.setDragItem,
)

export const useCache = () => useLens(
  selectors.lastExport,
  actions.exportCache,
  actions.restoreCache,
)

export const useUndoRedo = () => useLens(
  selectors.undoRedo,
  actions.undo,
  actions.redo,
)
