import { useEffect, useRef, useState } from 'react'
import { useLane, useNoteOrder } from '../store'
import Button from './Button'
import Input from './Input'
import Note from './Note'
import styles from '../styles/Lane.module.scss'

const Lane = ({ className, id, ...props }) => {
  const [lane, setLane, moveLane, deleteLane, addNote] = useLane(id)
  const [notes, setNoteOrder] = useNoteOrder(id)
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
  // TODO: show a confirmation modal (notes will be deleted)
  const handleDelete = () => deleteLane()

  return (
    <div className={[styles.lane, className].join(' ')} {...props}>
      <div className={styles.header}>
        {!editing && (
          <h3
            className={styles.name}
          >
            {lane.name}
          </h3>
        )}

        {editing && (
          <div className={styles.inputs}>
            <Input
              type="text"
              ref={nameElement}
              value={name}
              onInput={setName}
              onEnter={handleSave}
              onEsc={handleCancel}
              ignoreShiftKey
            />
          </div>
        )}

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

      {notes.map(noteID => (
        <Note key={noteID} id={noteID} className={styles.note} />
      ))}
      
      <div className={styles.card}>
        <Button onClick={handleCreate} type="emphasis">Add note</Button>
      </div>
    </div>
  )
}

export default Lane
