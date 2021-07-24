import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './reducers'
import middleware from './middleware'

export * from './hooks'

const store = createStore(rootReducer, middleware)

export const StoreProvider = ({ children, ...props }) => (
  <Provider {...props} store={store}>{children}</Provider>
)
