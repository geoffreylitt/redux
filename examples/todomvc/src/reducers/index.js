import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import wcConfig from '../wildcard/configReducer'

// todo -- can we avoid adding this to combineReducers explicitly,
// and instead do it in our StoreEnhancer? Probably...
const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  __wildcard__: wcConfig
})

export default rootReducer
