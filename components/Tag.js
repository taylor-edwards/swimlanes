import { useFilters, useTag } from '../store'
import Button from './Button'
import styles from '../styles/Tag.module.scss'

const Tag = ({ className = '', id, noteID, showDelete = false }) => {
  const [tag, applyTag, removeTag, deleteTag] = useTag(id)
  const [filters, addFilter, removeFilter] = useFilters()
  const tagIsApplied = filters.tags.includes(id)

  const toggleFilterTag = () => {
    if (tagIsApplied) {
      removeFilter(id)
    } else {
      addFilter(id)
    }
  }

  const handleDelete = e => {
    e.stopPropagation()
    if (noteID) {
      removeTag([noteID])
    } else {
      deleteTag()
    }
  }

  return (
    <Button
      type="pill"
      active={tagIsApplied}
      onClick={toggleFilterTag}
    >
      <span className={[styles.tag, className].join(' ')}>
        {showDelete && (
          <span
            role="button"
            tabIndex="1"
            onClick={handleDelete}
            title={noteID ? 'Remove tag' : 'Delete tag'}
          >
            <span role="none" aria-hidden="true">&times;</span>
          </span>
        )}
        {' '}
        #{id}
      </span>
    </Button>
  )
}

export default Tag
