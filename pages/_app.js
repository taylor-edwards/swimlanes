import { StoreProvider } from '../store'
import CacheHandler from '../components/CacheHandler'
import UndoRedoHandler from '../components/UndoRedoHandler'
import '../styles/globals.scss'

const App = ({ Component, pageProps }) => (
  <StoreProvider>
    <CacheHandler>
      <UndoRedoHandler>
        <Component {...pageProps} />
      </UndoRedoHandler>
    </CacheHandler>
  </StoreProvider>
)

export default App
