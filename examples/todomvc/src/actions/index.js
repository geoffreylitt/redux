import * as types from '../constants/ActionTypes'

export const addTodo = text => ({ type: types.ADD_TODO, text })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter})

// todo: move into wildcard code
// todo: probably table needs to be a param to all of these, for multi-table support
export const addColumn = (column) => ({ type: "WC_ADD_COLUMN", column })
export const addRecord = (data) => ({ type: "WC_ADD_RECORD", data })
export const updateRecord = (id, column, value) => ({ type: "WC_UPDATE_RECORD", id, column, value })
export const sortTable = (column, direction) => ({ type: "WC_SORT", column, direction })
