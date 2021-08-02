import { useState } from 'react'
import { noop } from '../util'
import Input from './Input'
import styles from '../styles/TagInput.module.scss'

const TagInput = ({
  className = '',
  onSave = noop,
  onCancel = noop,
}) => {
  const [value, setValue] = useState('')
  const handleSave = () => {
    const tags = value.split(',')
    tags.forEach(input => {
      const tag = input.replace(/(^\s+)|(\s+$)/g, '')
      if (tag.length > 0) {
        onSave(tag)
      }
    })
    setValue('')
  }
  const handleCancel = () => {
    setValue('')
    onCancel()
  }
  return (
    <label className={className}>
      <span className={styles.label}>Add tag</span>
      <Input
        placeholder="Type a tag..."
        value={value}
        onInput={setValue}
        onEnter={handleSave}
        onEsc={handleCancel}
        ignoreShiftKey
      />
    </label>
  )
}

export default TagInput
