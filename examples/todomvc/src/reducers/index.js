import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import wcConfig from './wildcard'

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  __wildcard__: wcConfig
})

export default rootReducer
