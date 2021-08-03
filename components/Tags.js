import { useMemo } from 'react'
import { useTags } from '../store'
import Tag from './Tag'
import styles from '../styles/Tags.module.scss'

const Tags = ({ className = '' }) => {
  const [tags] = useTags()
  const sortedTags = useMemo(() => Object.keys(tags).sort(), [tags])
  return (
    <div className={[styles.tags, className].join(' ')}>
      {sortedTags.map(id => <Tag key={id} id={id} />)}
    </div>
  )
}

export default Tags
