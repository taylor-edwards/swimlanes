import { useRef } from 'react'
import { noop } from '../util'
import styles from '../styles/FileInput.module.scss'

const FileInput = ({
  className = '',
  children,
  multiple = false,
  onUpload = noop,
  type = 'text',
}) => {
  const fileInput = useRef(null)

  const handleChange = e => {
    for (const file of e.currentTarget.files) {
      const reader = new FileReader()
      reader.addEventListener(
        'loadend',
        loadEvent => onUpload({
          data: loadEvent.currentTarget.result,
          name: file.name,
          size: file.size,
          type: file.type,
        }),
      )
      switch (type) {
        case 'text':
          reader.readAsText(file, file.type)
          break

        case 'dataURL':
          reader.readAsDataURL(file, file.type)
          break

        case 'arrayBuffer':
          reader.readAsArrayBuffer(file, file.type)
          break

        case 'binaryString':
          reader.readAsBinaryString(file, file.type)
          break
      }
    }
  }

  return (
    <label className={[className, styles.label].join(' ')}>
      {children}
      <input
        type="file"
        className={styles.input}
        onChange={handleChange}
        multiple={multiple}
        ref={fileInput}
      />
    </label>
  )
}

export default FileInput
