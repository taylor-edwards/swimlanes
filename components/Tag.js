import { useTag } from '../store'
import styles from '../styles/Tag.module.scss'

const Tag = ({ className = '', id, noteID }) => {
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
      <button onClick={handleDelete} title="Delete tag">
        <span role="none" aria-hidden="true">&times;</span>
      </button>
      {' '}
      #{tag.name}
    </span>
  )
}

export default Tag
