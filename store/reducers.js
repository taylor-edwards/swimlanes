import { insert, merge, omit, omitWhen, rejectEquals, uniq } from '../util'
import * as actions from './actions'
import * as selectors from './selectors'

const initialState = {
  message: 'Hello, world!',
  lanes: {
    L000: {
      id: 'L000',
      name: 'First lane',
      noteOrder: [
        'N000',
        'N001',
        'N002',
      ],
    },
    L001: {
      id: 'L001',
      name: 'Lane #2',
      noteOrder: [
        'N003',
        'N004',
      ],
    },
    L002: {
      id: 'L002',
      name: 'Lane #3',
      noteOrder: [],
    },
  },
  laneOrder: [
    'L000',
    'L002',
    'L001',
  ],
  notes: {
    N000: {
      id: 'N000',
      name: 'My first note',
      description: 'A sample note (this is the description)',
      laneID: 'L000',
      tags: ['T002', 'T003'],
    },
    N001: {
      id: 'N001',
      name: 'Test note',
      description: '',
      laneID: 'L000',
      tags: ['T001', 'T003'],
    },
    N002: {
      id: 'N002',
      name: undefined,
      description: 'I forgot to type a name for this note',
      laneID: 'L000',
      tags: ['T002'],
    },
    N003: {
      id: 'N003',
      name: 'Recipes for toast',
      description: 'should notes support a rich text format?',
      laneID: 'L001',
      tags: ['T000'],
    },
    N004: {
      id: 'N004',
      name: 'asdf',
      description: 'nondescript',
      laneID: 'L001',
      tags: [],
    },
  },
  tags: {
    T000: 'cooking',
    T001: 'dev',
    T002: 'motorcycles',
    T003: 'catgif',
  },
}

const createLane = (id, name = 'New lane', noteOrder = []) => ({
  id,
  name,
  noteOrder,
})

const createNote = (
  id,
  laneID,
  name = 'New note',
  description = '',
  tags = [],
) => ({
  id,
  laneID,
  name,
  description,
  tags,
})

const createTag = (id, name = 'New tag', relatedNotes = []) => ({
  id,
  name,
  relatedNotes,
})

const messageReducers = {
  [actions.SET_MESSAGE]: (state, { message }) => ({ ...state, message }),
}

const laneReducers = {
  [actions.SET_LANE_ORDER]: (state, { laneOrder }) => ({ ...state, laneOrder }),
  [actions.ADD_LANE]: (state, {
    laneID,
    name = 'New lane',
    noteOrder = [],
    index = Infinity,
  }) => ({
    ...state,
    lanes: {
      ...state.lanes,
      [laneID]: createLane(laneID, name, noteOrder),
    },
    laneOrder: insert(state.laneOrder, laneID, index),
  }),
  [actions.DELETE_LANE]: (state, { laneID }) => ({
    ...state,
    laneOrder: rejectEquals(state.laneOrder, laneID),
    lanes: omit(state.lanes, laneID),
    notes: omitWhen(
      key => !state.lanes[laneID].noteOrder.includes(key),
      state.notes,
    ),
  }),
  [actions.SET_LANE]: (state, { laneID, lane }) => ({
    ...state,
    lanes: {
      ...state.lanes,
      [laneID]: merge(state.lanes[laneID], lane, { laneID }),
    },
  }),
  [actions.MOVE_LANE]: (state, { laneID, index = Infinity }) => ({
    ...state,
    laneOrder: insert(rejectEquals(state.laneOrder, laneID), laneID, index),
  }),
  [actions.SET_NOTE_ORDER]: (state, { laneID, noteOrder }) => ({
    ...state,
    lanes: {
      ...state.lanes,
      [laneID]: {
        ...state.lanes[laneID],
        noteOrder,
      },
    },
  }),
}

const noteReducers = {
  [actions.ADD_NOTE]: (
    state,
    { noteID, laneID, name, description, tags, index = Infinity },
  ) => {
    const note = createNote(noteID, laneID, name, description, tags)
    const lane = selectors.lane(laneID, state)
    return {
      ...state,
      lanes: {
        ...state.lanes,
        [laneID]: {
          ...lane,
          noteOrder: insert(lane.noteOrder, noteID, index),
        },
      },
      notes: {
        ...state.notes,
        [noteID]: note,
      },
    }
  },
  [actions.DELETE_NOTE]: (state, { noteID }) => {
    const note = selectors.note(noteID, state)
    const lane = selectors.lane(note.laneID, state)
    return {
      ...state,
      lanes: {
        ...state.lanes,
        [note.laneID]: {
          ...lane,
          noteOrder: rejectEquals(lane.noteOrder, noteID),
        },
      },
      notes: omit(state.notes, noteID),
    }
  },
  [actions.MOVE_NOTE]: (
    state,
    { noteID, fromLaneID, toLaneID, toIndex = Infinity },
  ) => {
    const fromLane = selectors.lane(fromLaneID, state)
    const toLane = selectors.lane(toLaneID, state)
    return {
      ...state,
      lanes: {
        ...state.lanes,
        [fromLaneID]: {
          ...fromLane,
          noteOrder: rejectEquals(fromLane.noteOrder, noteID),
        },
        [toLaneID]: {
          ...toLane,
          noteOrder: insert(toLane.noteOrder, noteID, toIndex),
        },
      },
    }
  },
  [actions.SET_NOTE]: (state, { noteID, note }) => ({
    ...state,
    notes: {
      ...state.notes,
      [noteID]: merge(state.notes[noteID], note, { noteID }),
    },
  }),
}

const tagReducers = {
  [actions.ADD_TAG]: (state, { tagID, name, relatedNotes }) => ({
    ...state,
    tags: {
      ...state.tags,
      [tagID]: createTag(tagID, name, relatedNotes),
    },
  }),
  [actions.DELETE_TAG]: (state, { tagID }) => {
    const tag = selectors.tag(tagID)
    return {
      ...state,
      notes: merge(
        state.notes,
        tag.relatedNotes.map(noteID => {
          const note = selectors.note(noteID, state)
          return {
            ...note,
            tags: rejectEquals(note.tags, tagID),
          }
        }),
      ),
      tags: omit(state.tags, tagID),
    }
  },
  [actions.APPLY_TAG]: (state, { tagID, relatedNotes }) => {
    const tag = selectors.tag(tagID)
    return {
      ...state,
      notes: merge(
        state.notes,
        relatedNotes.map(noteID => {
          const note = selectors.note(noteID)
          return {
            ...note,
            tags: note.tags.concat([tagID]),
          }
        }),
      ),
      tags: {
        ...state.tags,
        [tagID]: {
          ...tag,
          relatedNotes: uniq(tag.relatedNotes.concat(relatedNotes)),
        },
      },
    }
  },
  [actions.REMOVE_TAG]: (state, { tagID, relatedNotes }) => {
    const tag = selectors.tag(tagID)
    return {
      ...state,
      notes: {
        ...state.notes,
        ...relatedNotes.map(noteID => {
          const note = selectors.note(noteID)
          return {
            ...note,
            tags: rejectEquals(note.tags, tagID),
          }
        }),
      },
      tags: {
        ...state.tags,
        [tagID]: {
          ...tag,
          relatedNotes: rejectEquals(tag.relatedNotes, tagID),
        },
      },
    }
  },
}

const allReducers = {
  ...messageReducers,
  ...laneReducers,
  ...noteReducers,
  ...tagReducers,
}

export const rootReducer = (state = initialState, action) => {
  if (allReducers.hasOwnProperty(action.type)) {
    return allReducers[action.type](state, action)
  }
  return state
}
