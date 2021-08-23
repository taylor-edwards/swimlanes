import { useCache, useUndoRedo } from '../store'
import Button from './Button'
import FileInput from './FileInput'
import ThemeSelector from './ThemeSelector'
import Timestamp from './Timestamp'
import styles from '../styles/ControlBar.module.scss'

const ControlBar = ({ className = '' }) => {
  const [lastExport, exportCache, restoreCache] = useCache()
  const [undoRedo, undo, redo] = useUndoRedo()

  // split division by 1024 to preserve first decimal place
  const lastExportSizeKB = Math.round(lastExport.size / 102.4) / 10

  const handleUpload = ({ data, type, name, size }) => {
    if (type === 'application/json') {
      try {
        const state = JSON.parse(data)
        if (typeof state === 'object') {
          restoreCache(state)
        }
      } catch (err) {
        console.warn(`Couldn't parse file ${name} (${type})`, err)
      }
    }
  }

  return (
    <div className={styles.bar}>
      <Button
        onClick={undo}
        title="Undo"
        slim
        disabled={undoRedo.undoCount < 1}
      >
        <span className={styles.icon} role="none" >
          &#x21B6;
        </span>
        Undo
      </Button>

      <Button
        onClick={redo}
        title="Redo"
        slim
        disabled={undoRedo.redoCount < 1}
      >
        <span className={styles.icon} role="none">
          &#x21B7;
        </span>
        Redo
      </Button>

      <div className={styles.spacer} />

      <ThemeSelector />

      <div className={styles.spacer} />

      {lastExport.timestamp && (
        <div className={styles.timestamp}>
          Last exported{' '}
          <Timestamp date={lastExport.timestamp} />
          {' '}({lastExportSizeKB}KB)
        </div>
      )}

      <Button
        onClick={exportCache}
        title="Export as JSON"
        slim
        type="emphasis"
      >
        <span className={styles.icon} role="none">
          &#x2193;
        </span>
        Export
      </Button>

      <FileInput onUpload={handleUpload}>
        <span className={styles.icon} role="none">
          &#x2191;
        </span>
        Upload
      </FileInput>
    </div>
  )
}

export default ControlBar
