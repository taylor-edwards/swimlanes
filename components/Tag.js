import { useTag } from '../store'
import styles from '../styles/Tag.module.css'

const Tag = ({ className, id }) => {
  const [tag, addTag, applyTag, removeTag] = useTag(id)
  return (
    <span className={[styles.tag, className].join(' ')}>
      #{tag}
    </span>
  )
}

export default Tag
