import { useCache, useUndoRedo } from '../store'
import Button from './Button'
import styles from '../styles/ControlBar.module.scss'

const ControlBar = ({ className = '' }) => {
  const [lastExport, exportCache] = useCache()
  const [undoRedo, undo, redo] = useUndoRedo()
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

      <Button
        onClick={exportCache}
        title="Export as JSON"
        slim
        type="emphasis"
      >
        <span className={styles.icon} role="none">
          &#x2913;
        </span>
        Save
      </Button>
    </div>
  )
}

export default ControlBar
