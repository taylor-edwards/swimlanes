import { useMemo, useState } from 'react'
import { noop } from '../util'
import { useTags } from '../store'
import Button from './Button'
import Input from './Input'
import styles from '../styles/TagInput.module.scss'

const TagInput = ({
  className = '',
  onSave = noop,
  onCancel = noop,
  onEnter = noop,
}) => {
  const [value, setValue] = useState('')
  const [tags, addTag] = useTags()
  const handleEnter = () => {
    if (value === '') {
      onEnter(value)
    } else {
      handleSave()
    }
  }
  const handleSave = () => {
    if (value !== '') {
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
  }
  const handleCancel = () => {
    setValue('')
    onCancel()
  }
  const tagsList = useMemo(() => Object.keys(tags), [tags])
  return (
    <label className={className}>
      <div className={styles.row}>
        <Input
          className={styles.input}
          placeholder="Add tags..."
          title="Add tags"
          value={value}
          onInput={setValue}
          onEnter={handleSave}
          onEsc={handleCancel}
          autoCompletions={tagsList}
          ignoreShiftKey
        />
        <Button
          onClick={handleSave}
          className={styles.btn}
          type="emphasis"
        >Add</Button>
      </div>
    </label>
  )
}

export default TagInput
