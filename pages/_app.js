import { StoreProvider } from '../store'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => (
  <StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>
)

export default App
