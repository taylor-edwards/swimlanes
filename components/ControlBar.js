import { useCache, useUndoRedo } from '../store'
import Button from './Button'
import Timestamp from './Timestamp'
import styles from '../styles/ControlBar.module.scss'

const ControlBar = ({ className = '' }) => {
  const [lastExport, exportCache] = useCache()
  const [undoRedo, undo, redo] = useUndoRedo()
  // split division by 1024 to preserve first decimal place
  const lastExportSizeKB = Math.round(lastExport.size / 102.4) / 10
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
          &#x2913;
        </span>
        Download
      </Button>
    </div>
  )
}

export default ControlBar
