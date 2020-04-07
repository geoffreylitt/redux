// todo: probably table needs to be a param to all of these, for multi-table support
export const addColumn = (column) => ({ type: "WC_ADD_COLUMN", column })
export const addRecord = (data) => ({ type: "WC_ADD_RECORD", data })
export const updateRecord = (id, column, value) => ({ type: "WC_UPDATE_RECORD", id, column, value })
export const sortTable = (column, direction) => ({ type: "WC_SORT", column, direction })
