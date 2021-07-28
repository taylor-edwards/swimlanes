import { StoreProvider } from '../store'
import '../styles/globals.scss'

const App = ({ Component, pageProps }) => (
  <StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>
)

export default App
