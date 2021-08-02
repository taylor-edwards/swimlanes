import { useMemo, useState } from 'react'
import { noop } from '../util'
import { useTags } from '../store'
import Input from './Input'
import styles from '../styles/TagInput.module.scss'

const TagInput = ({
  className = '',
  onSave = noop,
  onCancel = noop,
}) => {
  const [value, setValue] = useState('')
  const [tags, addTag] = useTags()
  const handleSave = () => {
    const newTags = value.split(',')
    newTags.forEach(input => {
      const tag = input.replace(/(^\s+)|(\s+$)/g, '')
      if (tag.length > 0) {
        if (onSave !== noop) {
          onSave(tag)
        } else {
          addTag(tag)
        }
      }
    })
    setValue('')
  }
  const handleCancel = () => {
    setValue('')
    onCancel()
  }
  const tagsList = useMemo(() => Object.keys(tags), [tags])
  return (
    <label className={className}>
      <strong className={styles.label}>Add tags</strong>
      <Input
        placeholder="Type a tag..."
        value={value}
        onInput={setValue}
        onEnter={handleSave}
        onEsc={handleCancel}
        autoCompletions={tagsList}
        ignoreShiftKey
      />
    </label>
  )
}

export default TagInput
