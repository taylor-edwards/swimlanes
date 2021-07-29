import { useEffect, useRef, useState } from 'react'
import { useDragAndDrop } from '../store'
import { noop } from '../util'
import styles from '../styles/Draggable.module.scss'

const DropZone = ({
  children,
  className = '',
  label = 'Drop here',
  onDrop = noop,
  type,
}) => {
  const zoneElement = useRef(null)
  const [zoneRect, setZoneRect] = useState({
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  })
  const [isHovering, setIsHovering] = useState(false)
  const [dragAndDrop, setDragItem] = useDragAndDrop()
  const dropTypeIsCompatible = type === dragAndDrop.itemType

  useEffect(() => {
    if (!dragAndDrop.itemType || !dropTypeIsCompatible) {
      setIsHovering(false)
    }
  }, [dragAndDrop, dropTypeIsCompatible])

  const handleDragOver = e => {
    if (dropTypeIsCompatible && type === dragAndDrop.itemType) {
      // enable dropping by calling preventDefault
      e.preventDefault()
    }
  }
  const handleDragEnter = e => {
    if (dropTypeIsCompatible) {
      setIsHovering(true)
    }
  }
  const handleDragLeave = e => {
    if (dropTypeIsCompatible && !e.currentTarget.contains(e.relatedTarget)) {
      setIsHovering(false)
    }
  }
  const handleDrop = e => {
    if (dropTypeIsCompatible) {
      e.preventDefault()
      setIsHovering(false)
      onDrop(dragAndDrop.heldItem)
    }
  }

  return (
    <div
      className={[
        styles.dropzone,
        isHovering ? styles.hovering : '',
        className,
      ].join(' ')}
      data-label={label}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      ref={zoneElement}
    >
      {children}
    </div>
  )
}

export default DropZone
