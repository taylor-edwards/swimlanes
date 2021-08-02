import { useDragAndDrop } from '../store'
import { noop } from '../util'
import styles from '../styles/Draggable.module.scss'

const DragTarget = ({
  className = '',
  item,
  label = 'Drag here',
  onDragEnd = noop,
  onDragStart = noop,
  type,
}) => {
  const [dragAndDrop, setDragItem] = useDragAndDrop()
  const handleDragStart = e => {
    setDragItem(true, type, item)
    onDragStart(e) 
  }
  const handleDragEnd = e => {
    setDragItem(false)
    onDragEnd(e)
  }
  return (
    <div
      className={[styles.draggable, className].join(' ')}
      draggable="true"
      title={label}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <span aria-hidden="true" role="none">&#10294;</span>
    </div>
  )
}

export default DragTarget
