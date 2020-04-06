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
