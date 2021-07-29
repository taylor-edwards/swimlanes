import { useLaneOrder } from '../store'
import Button from './Button'
import DropZone from './DropZone'
import Lane from './Lane'
import styles from '../styles/Lanes.module.scss'

const Lanes = ({ className = '' }) => {
  const [lanes, addLane, moveLane, setOrder] = useLaneOrder()
  const handleDrop = index => laneID => moveLane(laneID, index)
  return (
    <div className={[styles.container, className].join(' ')}>
      <div className={styles.lanes}>
        {lanes.map((laneID, i) => (
          <DropZone
            className={styles.lane}
            key={laneID}
            label="Move lane"
            onDrop={handleDrop(i)}
            type="LANE"
          >
            <Lane id={laneID} />
          </DropZone>
        ))}
      </div>

      <div className={styles.card}>
        <Button onClick={() => addLane()} type="emphasis">
          Add lane
        </Button>
      </div>
    </div>
  )
}

export default Lanes
