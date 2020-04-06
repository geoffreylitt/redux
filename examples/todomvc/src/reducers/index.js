import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const wcInitialState = {}
const __wildcard__ = (state = wcInitialState, action) => {
  switch (action.type) {
    case "WC_SORT":
      return {
        ...state,
        sort: {
          column: action.column,
          direction: action.direction
        }
      }

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  __wildcard__
})

export default rootReducer
