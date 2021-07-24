import { useLaneOrder } from '../store'
import Lane from './Lane'
import styles from '../styles/Lanes.module.css'

const Lanes = ({ className, ...props }) => {
  const [lanes, setOrder, addLane] = useLaneOrder()
  return (
    <div className={[styles.container, className].join(' ')}>
      <div className={styles.lanes} {...props}>
        {lanes.map(laneID => (
          <Lane key={laneID} id={laneID} className={styles.lane} />
        ))}
      </div>

      <div className={styles.card}>
        <button
          onClick={() => addLane()}
          title="Add lane"
          className={styles.addLaneBtn}
        >
          Add lane
        </button>
      </div>
    </div>
  )
}

export default Lanes
