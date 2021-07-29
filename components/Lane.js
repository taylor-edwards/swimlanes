import { useEffect, useRef, useState } from 'react'
import { useLane, useNoteOrder } from '../store'
import Button from './Button'
import DragTarget from './DragTarget'
import DropZone from './DropZone'
import Input from './Input'
import Note from './Note'
import styles from '../styles/Lane.module.scss'

const Lane = ({ className = '', id }) => {
  const [lane, setLane, deleteLane] = useLane(id)
  const [notes, addNote, moveNote, setNoteOrder] = useNoteOrder(id)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(lane.name)
  const nameElement = useRef(null)
  const editElement = useRef(null)

  // transfer focus upon first rerender whenever editing mode is toggled
  useEffect(() => {
    if (editing && nameElement) {
      nameElement.current.focus()
    } else if (editElement) {
      editElement.current.focus()
    }
  }, [editing, nameElement, editElement])

  const handleSave = () => {
    if (name.length !== 0) {
      setLane({ name })
    }
    setEditing(false)
  }
  const handleCancel = () => {
    setName(lane.name)
    setEditing(false)
  }
  const handleCreate = () => addNote()
  const handleDelete = () => deleteLane()

  const laneElement = useRef(null)
  const setDragImage = e =>
    e.dataTransfer.setDragImage(laneElement.current, 0, 0)
  const handleDrop = index => ({ noteID, laneID }) =>
    moveNote(laneID, noteID, index)

  return (
    <div className={[styles.lane, className].join(' ')} ref={laneElement}>
      <div className={styles.content}>
        <div className={styles.header}>
          {!editing && (
            <>
              <h3 className={styles.name}>{lane.name}</h3>
              <DragTarget
                item={id}
                label="Move lane"
                onDragStart={setDragImage}
                type="LANE"
              />
            </>
          )}

          {editing && (
            <Input
              type="text"
              ref={nameElement}
              value={name}
              onInput={setName}
              onEnter={handleSave}
              onEsc={handleCancel}
              ignoreShiftKey
            />
          )}
        </div>

        <p className={styles.count}>
          {lane.noteOrder.length} note{lane.noteOrder.length === 1 ? '' : 's'}
        </p>

        <div className={styles.controls}>
          {!editing && (
            <Button
              onClick={() => setEditing(true)}
              ref={editElement}
            >
              Edit
            </Button>
          )}

          {editing && (
            <>
              <Button onClick={handleDelete}>Delete</Button>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave} type="emphasis">Save</Button>
            </>
          )}
        </div>
      </div>

      {notes.map((noteID, i) => (
        <DropZone
          key={noteID}
          type="NOTE"
          label="Move note"
          onDrop={handleDrop(i)}
        >
          <Note id={noteID} laneID={id} className={styles.note} />
        </DropZone>
      ))}
      
      <DropZone
        type="NOTE"
        label="Move note"
        onDrop={handleDrop(notes.length)}
        className={styles.card}
      >
        <Button onClick={handleCreate} type="emphasis">Add note</Button>
      </DropZone>
    </div>
  )
}

export default Lane
