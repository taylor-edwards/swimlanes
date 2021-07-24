export const SET_MESSAGE = 'SET_MESSAGE'
export const setMessage = message => ({ message, type: SET_MESSAGE })

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

export const DELETE_NOTE = 'DELETE_NOTE'
export const deleteNote = noteID => ({ noteID, type: DELETE_NOTE })

export const MOVE_NOTE = 'MOVE_NOTE'
export const moveNote = (noteID, fromLaneID, toLaneID, toIndex) => ({
  noteID,
  fromLaneID,
  toLaneID,
  toIndex,
  type: MOVE_NOTE,
})

export const SET_NOTE = 'SET_NOTE'
export const setNote = (noteID, note) => ({ noteID, note, type: SET_NOTE })

export const ADD_TAG = 'ADD_TAG'
export const addTag = (tagID, relatedNotes, name) => ({
  tagID,
  relatedNotes,
  name,
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
