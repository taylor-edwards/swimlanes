import Head from 'next/head'
import { useMemo } from 'react'
import { useTags } from '../store'
import { useKeysPressed } from '../hooks'
import ControlBar from '../components/ControlBar'
import Lanes from '../components/Lanes'
import Pane from '../components/Pane'
import Tags from '../components/Tags'
import Theme from '../components/Theme'
import { Body, Emphasis, Heading } from '../components/Typography'
import styles from '../styles/Home.module.scss'

const Home = () => {
  const [tags] = useTags()
  const sortedTags = useMemo(() => Object.keys(tags).sort(), [tags])
  const keys = useKeysPressed()
  const shiftKeyPressed = keys.includes('Shift')
  return (
    <Pane className={styles.wrapper}>
      <Theme />
      <Head>
        <title>Swimlanes</title>
        <meta name="description" content="The privacy-first task board" />
      </Head>

      <ControlBar />

      <main>
        <header className={styles.header}>
          <div className={styles.card}>
            <Heading type="h1">
              Swimlanes
            </Heading>

            <Body>
              Create a lane and add a note to it.
              <br />
              Drag and drop notes between lanes.
              <br />
              Hold{' '}
              <Emphasis className={`${styles.buttonKey} ${shiftKeyPressed ? styles.pressed : ''}`}>
                Shift
              </Emphasis>
              {' '}to scroll left and right.
            </Body>
          </div>

          <Tags className={styles.card} tags={sortedTags} />
        </header>

        <Lanes />
      </main>
    </Pane>
  )
}

export default Home
