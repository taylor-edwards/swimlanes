import { useTags } from '../store'
import Tag from './Tag'
import styles from '../styles/Tags.module.css'

const Tags = ({ className }) => {
  const [tags] = useTags()
  return (
    <div className={[styles.tags, className].join(' ')}>
      {Object.keys(tags).map(id => <Tag key={id} id={id} />)}
    </div>
  )
}

export default Tags
