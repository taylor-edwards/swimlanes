import { useEffect, useRef, useState } from 'react'
import { useNote } from '../store'
import Button from './Button'
import DragTarget from './DragTarget'
import Input from './Input'
import Tag from './Tag'
import styles from '../styles/Note.module.scss'

const Note = ({ className = '', id, laneID }) => {
  const [note, setNote, deleteNote] = useNote(id)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(note.name)
  const [desc, setDesc] = useState(note.description)
  const nameElement = useRef(null)
  const descElement = useRef(null)
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
    if (!name || name.length !== 0) {
      setNote({ name, description: desc })
    }
    setEditing(false)
  }
  const handleCancel = () => {
    setName(note.name)
    setEditing(false)
  } 
  const handleDelete = () => deleteNote()
  const focusDesc = () => {
    if (descElement) {
      descElement.current.focus()
    }
  }

  const noteElement = useRef(null)
  const setDragImage = e =>
    e.dataTransfer.setDragImage(noteElement.current, 0, 0)

  return (
    <div className={[styles.note, className].join(' ')} ref={noteElement}>
      <div className={styles.header}>
        {!editing && (
          <>
            <h4 className={styles.name}>{note.name ?? 'Untitled note'}</h4>
            <DragTarget
              item={{ laneID, noteID: id }}
              label="Move note"
              onDragStart={setDragImage}
              type="NOTE"
            />
          </>
        )}
        {editing && (
          <Input
            type="text"
            ref={nameElement}
            value={name}
            onInput={setName}
            onEnter={focusDesc}
            onEsc={handleCancel}
          />
        )}
      </div>

      {!editing && (
        <p className={styles.description}>{note.description}</p>
      )}

      {editing && (
        <Input
          type="textarea"
          ref={descElement}
          value={desc}
          onInput={setDesc}
          onEnter={handleSave}
          onEsc={handleCancel}
        />
      )}

      <p>
        {note.tags.map(tagID => <Tag id={tagID} key={tagID} noteID={id} />)}
      </p>

      <div className={styles.controls}>
        {!editing && (
          <Button onClick={() => setEditing(true)} ref={editElement}>
            Edit
          </Button>
        )}

        {editing && (
          <>
            <Button onClick={handleDelete} className={styles.btn}>
              Delete
            </Button>

            <Button onClick={handleCancel} className={styles.btn}>
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              className={styles.btn}
              type="emphasis"
            >
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default Note
