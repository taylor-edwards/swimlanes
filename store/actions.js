export const SET_LANE_ORDER = 'SET_LANE_ORDER'
export const setLaneOrder = laneOrder => ({ laneOrder, type: SET_LANE_ORDER })

export const ADD_LANE = 'ADD_LANE'
export const addLane = (name, index) => ({
  name,
  index,
  type: ADD_LANE,
})

export const MOVE_LANE = 'MOVE_LANE'
export const moveLane = (laneID, index) => ({ laneID, index, type: MOVE_LANE })

export const DELETE_LANE = 'DELETE_LANE'
export const deleteLane = laneID => ({ laneID, type: DELETE_LANE })

export const SET_LANE = 'SET_LANE'
export const setLane = (laneID, lane) => ({ laneID, lane, type: SET_LANE })

export const SET_NOTE_ORDER = 'SET_NOTE_ORDER'
export const setNoteOrder = (laneID, noteOrder) => ({
  laneID,
  noteOrder,
  type: SET_NOTES,
})

export const ADD_NOTE = 'ADD_NOTE'
export const addNote = (laneID, name, description, tags, index) => ({
  laneID,
  name,
  description,
  tags,
  index,
  type: ADD_NOTE,
})

export const COPY_NOTE = 'COPY_NOTE'
export const copyNote = (laneID, noteID) => ({
  noteID,
  laneID,
  type: COPY_NOTE,
})

export const DELETE_NOTE = 'DELETE_NOTE'
export const deleteNote = noteID => ({ noteID, type: DELETE_NOTE })

export const MOVE_NOTE = 'MOVE_NOTE'
export const moveNote = (toLaneID, fromLaneID, noteID, toIndex) => ({
  fromLaneID,
  noteID,
  toIndex,
  toLaneID,
  type: MOVE_NOTE,
})

export const SET_NOTE = 'SET_NOTE'
export const setNote = (noteID, note) => ({ noteID, note, type: SET_NOTE })

export const ADD_TAG = 'ADD_TAG'
export const addTag = (tagID, relatedNotes = []) => ({
  tagID,
  relatedNotes,
  type: ADD_TAG,
})

export const APPLY_TAG = 'APPLY_TAG'
export const applyTag = (tagID, relatedNotes) => ({
  tagID,
  relatedNotes,
  type: APPLY_TAG,
})

export const REMOVE_TAG = 'REMOVE_TAG'
export const removeTag = (tagID, relatedNotes) => ({
  tagID,
  relatedNotes,
  type: REMOVE_TAG,
})

export const DELETE_TAG = 'DELETE_TAG'
export const deleteTag = tagID => ({ tagID, type: DELETE_TAG })

export const ADD_FILTER_TAG = 'ADD_FILTER_TAG'
export const addFilterTag = tagID => ({
  tagID,
  type: ADD_FILTER_TAG,
})

export const REMOVE_FILTER_TAG = 'REMOVE_FILTER_TAG'
export const removeFilterTag = tagID => ({
  tagID,
  type: REMOVE_FILTER_TAG,
})

export const SET_DRAG_ITEM = 'SET_DRAG_ITEM'
export const setDragItem = (isDragging, itemType, heldItem) => ({
  isDragging,
  itemType,
  heldItem,
  type: SET_DRAG_ITEM,
})

export const EXPORT_CACHE = 'EXPORT_CACHE'
export const exportCache = () => ({
  format: 'json',
  type: EXPORT_CACHE,
})

export const RESTORE_CACHE ='RESTORE_CACHE'
export const restoreCache = cachedState => ({
  cachedState,
  type: RESTORE_CACHE,
})

export const UNDO = 'UNDO'
export const undo = () => ({ 
  undoCount: 0,
  redoCount: 0,
  restoredState: null,
  type: UNDO,
})

export const REDO = 'REDO'
export const redo = () => ({
  undoCount: 0,
  redoCount: 0,
  restoredState: null,
  type: REDO,
})
