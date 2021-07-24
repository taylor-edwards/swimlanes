import { useEffect, useRef, useState } from 'react'
import { useLane, useNoteOrder } from '../store'
import Note from './Note'
import styles from '../styles/Lane.module.css'

const Lane = ({ className, id, ...props }) => {
  const [lane, setLane, moveLane, deleteLane, addNote] = useLane(id)
  const [notes, setNoteOrder] = useNoteOrder(id)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(lane.name)
  const nameElement = useRef(null)

  useEffect(() => {
    if (editing && nameElement) {
      nameElement.current.focus()
    }
  }, [editing])

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
            tabIndex={1}
            role="button"
            title="Click to edit"
            onClick={() => setEditing(true)}
          >
            {lane.name}
          </h3>
        )}

        {editing && (
          <div className={styles.inputs}>
            <input
              type="text"
              ref={nameElement}
              value={name}
              onChange={e => setName(e.currentTarget.value)}
            />
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        )}

        <p className={styles.count}>
          {lane.noteOrder.length} note{lane.noteOrder.length === 1 ? '' : 's'}
        </p>
        <div className={styles.controls}>
          <button onClick={handleDelete}>Delete lane</button>
        </div>
      </div>
      {notes.map(noteID => (
        <Note key={noteID} id={noteID} className={styles.note} />
      ))}
      
      <div className={styles.card}>
        <button onClick={handleCreate}>Add note</button>
      </div>
    </div>
  )
}

export default Lane
