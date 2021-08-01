import { compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './reducers'
import middleware from './middleware'

export * from './hooks'

let composeEnhancers = compose
const reduxDevtools = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'
if (typeof window !== 'undefined' && window.hasOwnProperty(reduxDevtools)) {
  composeEnhancers = window[reduxDevtools]
}
const store = createStore(rootReducer, composeEnhancers(middleware))

export const StoreProvider = ({ children, ...props }) => (
  <Provider {...props} store={store}>{children}</Provider>
)
