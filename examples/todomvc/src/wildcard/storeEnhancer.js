// This file defines the Redux Store Enhancer for Wildcard
// More details on what a store enhancer is:
// https://redux.js.org/glossary#store-enhancer

// todo: combine the "middleware" with the store enhancer
// can we basically get rid of this whole file? seems pretty slim at this point

import { applyMiddleware } from 'redux'

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

export const genWcStoreEnhancer = (actionTransformer) => (next) => (reducer, preloadedState) => {
  // Augment the reducer function before it gets passed in.
  // Handle the wildcard events in the reducer function.

  // This augments the app's existing reducer,
  // converting CRUD events into app-specific events,
  // and then passing along to the existing reducer.
  //
  // In addition to this, Wildcard also maintains its own reducer in the tree,
  // but we need this in order to affect parts of the app's normal state.
  const enhancedReducer = (state, action) => reducer(state, actionTransformer(action));

  // We use a middleware to hook into dispatch.
  // (we might want to move this up into the StoreEnhancer at some point)
  const store = next(
    enhancedReducer,
    preloadedState,
    applyMiddleware(genWcMiddleware(state => state.todos))
  );

  return store;
}


