import Button from './Button'
import Tag from './Tag'
import styles from '../styles/Tags.module.scss'

const Tags = ({ className = '', tags = {}, showDelete, noteID }) => (
  <div className={[styles.tags, className].join(' ')}>
    {tags.map(tagID => (
      <Tag key={tagID} id={tagID} noteID={noteID} showDelete={showDelete} />
    ))}
  </div>
)

export default Tags
