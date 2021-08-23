import { StoreProvider } from '../store'
import CacheHandler from '../components/CacheHandler'
import Theme from '../components/Theme'
import UndoRedoHandler from '../components/UndoRedoHandler'
import '../styles/globals.scss'

const App = ({ Component, pageProps }) => (
  <StoreProvider>
    <CacheHandler>
      <UndoRedoHandler>
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </UndoRedoHandler>
    </CacheHandler>
  </StoreProvider>
)

export default App
