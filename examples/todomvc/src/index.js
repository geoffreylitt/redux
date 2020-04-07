import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { wcStoreEnhancer } from './wildcard'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'
import './wildcard-styles.css'

// todo: move all the code out of this repo, into browser extension.
// The extension will communicate w/ the app via the DOM window object.
window.__WILDCARD_STORE_ENHANCER__ = wcStoreEnhancer;

const store = createStore(
  reducer,
  compose(
    window.__WILDCARD_STORE_ENHANCER__,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
