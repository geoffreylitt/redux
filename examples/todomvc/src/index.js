import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { genWcMiddleware } from './wildcard'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import { addTodo } from './actions'
import 'todomvc-app-css/index.css'

const wcTodos = genWcMiddleware(["id", "text", "completed"], state => state.todos)

// a passthrough enhancer
const wcStoreEnhancer = (next) => (reducer, preloadedState) => {
  // Augment the reducer function before it gets passed in.
  // Handle the wildcard events in the reducer function.

  const enhancedReducer = (state, action) => {
    switch (action.type) {
      case "WC_ADD_RECORD":
        // translate the add_record event into an ADD_TODO...
        // Turning CRUD into domain-specific add event:
        // pros: should handle anything the app does on add: sync to server, set defaults
        // cons: seems like more work to adapt for WC;
        //       would it be easier to have the app use a crud abstraction directly?
        return reducer(state, addTodo(action.data.text));

      default:
        return reducer(state, action);
    }
  }

  const store = next(enhancedReducer, preloadedState);

  // As a test, dispatch some events to the store.
  // In the future, these events will come from UI actions in the WC Table.
  store.dispatch(addTodo("zz ADD_TODO"));
  store.dispatch(addTodo("abc ADD_TODO"));
  store.dispatch({
    __wildcard__: true,
    type: "WC_ADD_RECORD",
    // this needs to be the key in the state;
    // it's coupled to the stateToTable function from genWcMiddleware.
    table: "todos",
    data: {
      completed: false,
      text: "ran WC_ADD_RECORD"
    }
  });

  store.dispatch({
    __wildcard__: true,
    type: "WC_SORT",
    // this needs to be the key in the state;
    // it's coupled to the stateToTable function from genWcMiddleware.
    table: "todos",
    active: true,
    column: "text",
    direction: "DESC"
  });

  store.dispatch(addTodo("bcd ADD_TODO"));

  return store;
}

const store = createStore(
  reducer,
  compose(
    applyMiddleware(wcTodos),
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
