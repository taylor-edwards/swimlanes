import Head from 'next/head'
import Image from 'next/image'
import ControlBar from '../components/ControlBar'
import Lanes from '../components/Lanes'
import Tags from '../components/Tags'
import styles from '../styles/Home.module.scss'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Atrium</title>
        <meta name="description" content="Swim lane organizer" />
        <link rel="icon" href="/favicon.ico" />
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
            </p>
          </div>

          <Tags className={styles.card} />
        </header>

        <Lanes />
      </main>
    </div>
  )
}

export default Home
