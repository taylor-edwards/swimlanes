import { useEffect, useRef, useState } from 'react'
import { useNote } from '../store'
import Tag from './Tag'
import styles from '../styles/Note.module.css'

const Note = ({ className, id }) => {
  const [note, setNote, deleteNote] = useNote(id)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(note.name)
  const nameElement = useRef(null)

  useEffect(() => {
    if (editing && nameElement) {
      nameElement.current.focus()
    }
  }, [editing])

  const handleSave = () => {
    if (name.length !== 0) {
      setNote({ name })
    }
    setEditing(false)
  }
  const handleCancel = () => {
    setName(note.name)
    setEditing(false)
  } 
  const handleDelete = () => deleteNote()

  return (
    <div className={[styles.note, className].join(' ')}>
      <h4>
        {!editing && <strong>{note.name ?? 'Untitled note'}</strong>}
        {editing && (
          <>
            <input
              type="text"
              ref={nameElement}
              value={name}
              onChange={e => setName(e.currentTarget.value)}
            />

            <button onClick={handleCancel} className={styles.cancelBtn}>
              Cancel
            </button>

            <button onClick={handleSave} className={styles.saveBtn}>
              Save
            </button>
          </>
        )}
      </h4>

      <p className={styles.description}>{note.description}</p>

      <p>
        {note.tags.map(tagID => <Tag id={tagID} key={tagID} />)}
      </p>

      <div className={styles.controls}>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          Delete note
        </button>
      </div>
    </div>
  )
}

export default Note
