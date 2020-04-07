import { applyMiddleware } from 'redux'
import { addTodo, editTodo, completeTodo } from './actions'

// This needs to be configured somewhere --
// it's highly related to the stateToTable function
const appColumns = [
  "id",
  "text",
  "completed"
]

export const genWcMiddleware = (stateToTable) => {
  return ({ getState }) => next => action => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    // todo: this is where we're going to update the state in the extension.
    // (for now, we don't need to do it because the table lives inside the app)
    console.log('state after dispatch', getState())

    console.log('table state', stateToTable(getState()))

    return returnValue
  }
}

export const wcStoreEnhancer = (next) => (reducer, preloadedState) => {
  // Augment the reducer function before it gets passed in.
  // Handle the wildcard events in the reducer function.

  // This augments the app's existing reducer,
  // converting CRUD events into app-specific events,
  // and then passing along to the existing reducer.
  //
  // In addition to this, Wildcard also maintains its own reducer in the tree,
  // but we need this in order to affect parts of the app's normal state.
  const enhancedReducer = (state, action) => {
    switch (action.type) {
      case "WC_ADD_RECORD":
        return reducer(state, addTodo(action.data.text));

      // translate a generic row edit into a specific edit for this app
      case "WC_UPDATE_RECORD":
        if (action.column === "text") {
          return reducer(state, editTodo(action.id, action.value));
        } else if (action.column === "completed") {
          return reducer(state, completeTodo(action.id));
        }

      default:
        return reducer(state, action);
    }
  }

  // We use a middleware to hook into dispatch.
  // (we might want to move this up into the StoreEnhancer at some point)
  const store = next(
    enhancedReducer,
    preloadedState,
    applyMiddleware(genWcMiddleware(state => state.todos))
  );

  return store;
}


