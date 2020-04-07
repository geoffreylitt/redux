import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { genWcStoreEnhancer } from './wildcard/storeEnhancer'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'
import { addTodo, editTodo, completeTodo } from './actions'

// We define a function which converts a Wildcard generic action
// into a domain-specific actions for our app, if applicable.
// Otherwise just returns the original action.
// todo: what helpers can we provide here to make this easier?
const actionTransformer = (action) => {
  switch (action.type) {
    case "WC_ADD_RECORD":
      return addTodo(action.data.text);

    // translate a generic row edit into a specific edit for this app
    case "WC_UPDATE_RECORD":
      if (action.column === "text") {
        return editTodo(action.id, action.value);
      } else if (action.column === "completed") {
        return completeTodo(action.id);
      }

    default:
      return action;
  }
}

// Create a WC Store Enhancer from our action transformer function
const wcStoreEnhancer = genWcStoreEnhancer(actionTransformer)

const store = createStore(
  reducer,
  compose(
    // eventually once the Wildcard plugin lives outside the app,
    // this will work just like devtools -- communicating via window object.
    // but for now we have the convenience of direct communication
    wcStoreEnhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
