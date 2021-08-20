import Head from 'next/head'
import { useMemo } from 'react'
import { useTags } from '../store'
import { useKeysPressed } from '../hooks'
import ControlBar from '../components/ControlBar'
import Lanes from '../components/Lanes'
import Tags from '../components/Tags'
import styles from '../styles/Home.module.scss'

const Home = () => {
  const [tags] = useTags()
  const sortedTags = useMemo(() => Object.keys(tags).sort(), [tags])
  const keys = useKeysPressed()
  const shiftKeyPressed = keys.includes('Shift')
  return (
    <div>
      <Head>
        <title>Swimlanes</title>
        <meta name="description" content="The privacy-first task board" />
      </Head>

      <ControlBar />

      <main>
        <header className={styles.header}>
          <div className={styles.card}>
            <h1>
              Swimlanes
            </h1>

            <p>
              Create a lane and add a note to it.
              <br />
              Drag and drop notes between lanes.
              <br />
              Hold <span className={`${styles.buttonKey} ${shiftKeyPressed ? styles.pressed : ''}`}>Shift</span> to scroll left and right.
            </p>
          </div>

          <Tags className={styles.card} tags={sortedTags} />
        </header>

        <Lanes />
      </main>
    </div>
  )
}

export default Home
