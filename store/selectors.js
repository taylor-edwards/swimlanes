export const note = (id, state) => state.notes[id]

export const noteOrder = (laneID, state) => lane(laneID, state).noteOrder

export const notes = (laneID, state) =>
  noteIDs(laneID, state).map(noteID => note(noteID, state))

export const lane = (id, state) => state.lanes[id]

export const laneOrder = state => state.laneOrder

export const lanes = state => laneIDs(state).map(id => lane(id, state))

export const tags = state => state.tags

export const tag = (id, state) => state.tags[id]

export const filters = state => state.filters

export const dragAndDrop = state => state.dragAndDrop

export const lastExport = state => state.lastExport

export const undoRedo = state => state.undoRedo

export const theme = state => state.theme
