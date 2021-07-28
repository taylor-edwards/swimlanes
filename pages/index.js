import Head from 'next/head'
import Image from 'next/image'
import { useMessage } from '../store'
import Lanes from '../components/Lanes'
import Tags from '../components/Tags'
import styles from '../styles/Home.module.scss'

const Home = () => {
  const [message, setMessage] = useMessage()
  return (
    <div>
      <Head>
        <title>Atrium</title>
        <meta name="description" content="Swim lane organizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.card}>
          <h1>
            Swimlanes
          </h1>

          <p>
            Try adding a lane and creating a note in it.
            <br />
            Drag and drop notes between lanes.
            <br />
            Click on names and descriptions to change them.
          </p>
          
          <p onClick={() => setMessage(message + ' again!')}>
            The message is: {message}
          </p>
        </div>

        <Tags />

        <Lanes />
      </main>
    </div>
  )
}

export default Home
