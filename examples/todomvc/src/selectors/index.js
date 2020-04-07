import { createSelector } from 'reselect'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import _ from 'lodash'

const getVisibilityFilter = state => state.visibilityFilter
const getTodos = state => state.todos
const getWcConfig = state => state.__wildcard__

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case SHOW_ALL:
        return todos
      case SHOW_COMPLETED:
        return todos.filter(t => t.completed)
      case SHOW_ACTIVE:
        return todos.filter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + visibilityFilter)
    }
  }
)

export const getCompletedTodoCount = createSelector(
  [getTodos],
  todos => (
    todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )
  )
)

export const getSortedTodos = createSelector(
  [getVisibleTodos, getWcConfig],
  (visibleTodos, wcConfig) => {
    const sortConfig = wcConfig.sort
    if (!sortConfig || !sortConfig.direction === "NONE") { return visibleTodos; }
    let sorted = _.sortBy(visibleTodos, t => t[sortConfig.column])
    if (sortConfig.direction === "DESC") { sorted = sorted.reverse() }
    return sorted;
  }
)
