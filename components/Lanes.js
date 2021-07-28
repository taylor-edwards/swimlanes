import { useLaneOrder } from '../store'
import Button from './Button'
import Lane from './Lane'
import styles from '../styles/Lanes.module.scss'

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
        <Button onClick={() => addLane()} type="emphasis">
          Add lane
        </Button>
      </div>
    </div>
  )
}

export default Lanes
