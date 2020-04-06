import { applyMiddleware } from 'redux'
import { addTodo } from './actions'

export const genWcMiddleware = (columns, stateToTable) => {
  return ({ getState }) => next => action => {
    console.log("columns", columns)
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    console.log('table state', stateToTable(getState()))

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

export const wcStoreEnhancer = (next) => (reducer, preloadedState) => {
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

  // We use a middleware to hook into dispatch.
  // (we might want to move this up into the StoreEnhancer at some point)
  const store = next(
    enhancedReducer,
    preloadedState,
    applyMiddleware(genWcMiddleware(["id", "text", "completed"], state => state.todos))
  );

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


