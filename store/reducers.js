import { insert, merge, omit, omitWhen, rejectEquals, uniq } from '../util'
import * as actions from './actions'
import * as selectors from './selectors'
import { undoableActions } from './middleware'

export const initialState = {
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
      tags: ['motorcycles', 'cat gif'],
    },
    N001: {
      id: 'N001',
      name: 'Test note',
      description: '',
      laneID: 'L000',
      tags: ['dev', 'cat gif'],
    },
    N002: {
      id: 'N002',
      name: undefined,
      description: 'I forgot to type a name for this note',
      laneID: 'L000',
      tags: ['motorcycles'],
    },
    N003: {
      id: 'N003',
      name: 'Recipes for toast',
      description: 'should notes support a rich text format?',
      laneID: 'L001',
      tags: ['cooking'],
    },
    N004: {
      id: 'N004',
      name: 'oops I did it again',
      description: undefined,
      laneID: 'L001',
      tags: [],
    },
  },
  tags: {
    cooking: {
      relatedNotes: ['N003'],
    },
    dev: {
      relatedNotes: ['N001'],
    },
    motorcycles: {
      relatedNotes: ['N000', 'N002'],
    },
    'cat gif': {
      relatedNotes: ['N000', 'N001'],
    },
  },
  filters: {
    tags: [],
  },
  dragAndDrop: {
    heldItem: null,
  },
  lastExport: {
    size: null,
    timestamp: null,
  },
  undoRedo: {
    undoCount: 0,
    redoCount: 0,
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

const createTag = (id, relatedNotes = []) => ({
  id,
  relatedNotes,
})

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
      key => state.lanes[laneID].noteOrder.includes(key),
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
    const unusedTags = []
    const updatedTags = Object.fromEntries(
      note.tags.map(tagID => {
        const tag = selectors.tag(tagID, state)
        const newTag = {
          ...tag,
          relatedNotes: rejectEquals(tag.relatedNotes, noteID),
        }
        if (newTag.relatedNotes.length === 0) {
          // cull unreferenced tags
          unusedTags.push(tagID)
        }
        return [tagID, newTag]
      }),
    )
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
      tags: omitWhen(
        tagID => unusedTags.includes(tagID), merge(state.tags, updatedTags),
      ),
      filters: unusedTags.length > 0
        ? {
            ...state.filters,
            tags: state.filters.tags.filter(tagID => !unusedTags.includes(tagID)),
          }
        : state.filters,
    }
  },
  [actions.COPY_NOTE]: (
    state,
    { noteID, newNoteID, laneID },
  ) => {
    const note = selectors.note(noteID, state)
    const lane = selectors.lane(laneID, state)
    return {
      ...state,
      lanes: {
        ...state.lanes,
        [laneID]: {
          ...lane,
          noteOrder: insert(lane.noteOrder, newNoteID),
        },
      },
      notes: {
        ...state.notes,
        [newNoteID]: {
          ...note,
          laneID,
          id: newNoteID,
        },
      },
      tags: merge(
        state.tags,
        Object.fromEntries(note.tags.map(tagID => {
          const tag = selectors.tag(tagID, state)
          return [
            tagID,
            {
              ...tag,
              relatedNotes: insert(tag.relatedNotes, newNoteID),
            },
          ]
        })),
      ),
    }
  },
  [actions.MOVE_NOTE]: (
    state,
    { noteID, fromLaneID, toLaneID, toIndex = Infinity },
  ) => {
    const fromLane = selectors.lane(fromLaneID, state)
    const toLane = selectors.lane(toLaneID, state)
    if (fromLaneID === toLaneID) {
      return {
        ...state,
        lanes: {
          ...state.lanes,
          [toLaneID]: {
            ...toLane,
            noteOrder: insert(
              rejectEquals(toLane.noteOrder, noteID),
              noteID,
              toIndex,
            ),
          },
        },
      }
    } else {
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
  [actions.ADD_TAG]: (state, { tagID, relatedNotes }) => {
    if (state.tags.hasOwnProperty(tagID)) {
      const tag = selectors.tag(tagID, state)
      return {
        ...state,
        notes: merge(
          state.notes,
          Object.fromEntries(relatedNotes.map(noteID => {
            const note = selectors.note(noteID, state)
            if (note.tags.includes(tagID)) {
              return [noteID, note]
            } else {
              return [
                noteID,
                {
                  ...note,
                  tags: [...note.tags, tagID],
                },
              ]
            }
          })),
        ),
        tags: {
          ...state.tags,
          [tagID]: {
            ...tag,
            relatedNotes: uniq(tag.relatedNotes.concat(relatedNotes)),
          },
        },
      }
    } else {
      return {
        ...state,
        notes: merge(
          state.notes,
          Object.fromEntries(
            relatedNotes.map(noteID => {
              const note = selectors.note(noteID, state)
              if (note.tags.includes(tagID)) {
                return [noteID, note]
              } else {
                return [noteID, {
                  ...note,
                  tags: [...note.tags, tagID],
                }]
              }
            }
          )),
        ),
        tags: {
          ...state.tags,
          [tagID]: createTag(tagID, relatedNotes),
        },
      }
    }
  },
  [actions.DELETE_TAG]: (state, { tagID }) => {
    const tag = selectors.tag(tagID, state)
    return {
      ...state,
      notes: merge(
        state.notes,
        Object.fromEntries(
          tag.relatedNotes.map(noteID => {
            const note = selectors.note(noteID, state)
            return [noteID, {
              ...note,
              tags: rejectEquals(note.tags, tagID),
            }]
          }
        )),
      ),
      tags: omit(state.tags, tagID),
      filters: {
        ...state.filters,
        tags: rejectEquals(state.filters.tags, tagID),
      },
    }
  },
  [actions.APPLY_TAG]: (state, { tagID, relatedNotes }) => {
    const tag = selectors.tag(tagID, state)
    return {
      ...state,
      notes: merge(
        state.notes,
        relatedNotes.map(noteID => {
          const note = selectors.note(noteID, state)
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
    const tag = selectors.tag(tagID, state)
    const newRelatedNotes = tag.relatedNotes.filter(
      id => !relatedNotes.includes(id),
    )
    const doDeleteTag = newRelatedNotes.length === 0
    return {
      ...state,
      notes: {
        ...state.notes,
        ...Object.fromEntries(
          relatedNotes.map((noteID) => {
            const note = selectors.note(noteID, state);
            return [
              noteID,
              {
                ...note,
                tags: rejectEquals(note.tags, tagID),
              },
            ];
          })
        ),
      },
      tags: doDeleteTag
        ? omit(state.tags, tagID)
        : {
            ...state.tags,
            [tagID]: {
              ...tag,
              relatedNotes: newRelatedNotes,
            },
          },
      filters: doDeleteTag
        ? {
            ...state.filters,
            tags: rejectEquals(state.filters.tags, tagID),
          }
        : state.filters,
    }
  },
}

const filterReducers = {
  [actions.ADD_FILTER_TAG]: (state, { tagID }) => {
    if (state.filters.tags.includes(tagID)) {
      return state
    }
    return {
      ...state,
      filters: {
        ...state.filters,
        tags: insert(state.filters.tags, tagID),
      },
    }
  },
  [actions.REMOVE_FILTER_TAG]: (state, { tagID }) => ({
    ...state,
    filters: {
      ...state.filters,
      tags: rejectEquals(state.filters.tags, tagID),
    },
  }),
}

const dragAndDropReducers = {
  [actions.SET_DRAG_ITEM]: (state, {
    isDragging = false,
    heldItem = null,
    itemType = null,
  }) => ({
    ...state,
    dragAndDrop: {
      isDragging,
      itemType: isDragging ? itemType : null,
      heldItem: isDragging ? heldItem : null,
    }
  }),
}

const restoreState = (state, { restoredState = {}, undoCount, redoCount }) => ({
  ...state,
  ...restoredState,
  undoRedo: {
    ...state.undoRedo,
    undoCount,
    redoCount,
  },
})
const undoRedoReducers = {
  [actions.UNDO]: restoreState,
  [actions.REDO]: restoreState,
}

const cacheReducers = {
  [actions.EXPORT_CACHE]: (state, { timestamp = null, size = null }) => ({
    ...state,
    lastExport: {
      size,
      timestamp,
    },
  }),
  [actions.RESTORE_CACHE]: (state, { cachedState }) =>
    merge(state, cachedState),
}

const allReducers = {
  ...laneReducers,
  ...noteReducers,
  ...tagReducers,
  ...filterReducers,
  ...dragAndDropReducers,
  ...undoRedoReducers,
  ...cacheReducers,
}

export const rootReducer = (state = initialState, action) => {
  let nextState = state

  // handle general case reducers
  if (allReducers.hasOwnProperty(action.type)) {
     nextState = allReducers[action.type](nextState, action)
  }

  // special handling for global undo/redo
  if (undoableActions.indexOf(action.type) !== -1) {
    nextState = {
      ...nextState,
      undoRedo: {
        ...nextState.undoRedo,
        redoCount: action.redoCount ?? nextState.redoCount,
        undoCount: action.undoCount ?? nextState.undoCount,
      },
    }
  }

  return nextState
}
