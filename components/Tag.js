import { useTag } from '../store'
import styles from '../styles/Tag.module.scss'

const Tag = ({ className = '', id, noteID, showDelete = false }) => {
  const [tag, applyTag, removeTag, deleteTag] = useTag(id)
  const handleDelete = () => {
    if (noteID) {
      removeTag([noteID])
    } else {
      deleteTag()
    }
  }
  return (
    <span className={[styles.tag, className].join(' ')}>
      {showDelete && <button onClick={handleDelete} title="Delete tag">
        <span role="none" aria-hidden="true">&times;</span>
      </button>}
      {' '}
      #{id}
    </span>
  )
}

export default Tag
