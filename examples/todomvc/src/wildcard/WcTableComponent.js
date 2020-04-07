import React from 'react'

const divStyle = {
  position: "fixed",
  height: "250px",
  left: 0,
  bottom: 0,
  width: "100vw",
  backgroundColor: "white",
  fontSize: "14px",
  fontWeight: "normal"
}

function todosTable(todos, extraColumns, extraData) {
  return <table border="1">
      <thead style={{display: "table-header-group", textAlign: "left"}}>
        <tr>
          <th>id</th>
          <th>text</th>
          <th>completed</th>
          {extraColumns.map(col => <th key={col}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => {
          const extraDataForTodo = extraData[todo.id] || {}
          return <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.completed ? "true" : "false"}</td>
            {extraColumns.map(col => <td key={col}>{extraDataForTodo[col]}</td>)}
          </tr>
        })}
      </tbody>
    </table>
}

const WcTable = ({todos, sortedTodos, extraColumns, extraData, sortOrder, actions}) => {
  const sortByText = () => {
    if (!sortOrder.column) {
      actions.sortTable("text", "ASC");
    } else if (sortOrder.direction === "ASC") {
      actions.sortTable(sortOrder.column, "DESC");
    } else {
      actions.sortTable(null, "NONE");
    }
  }

  const addTodo = () => {
    actions.addRecord({ text: "from wildcard" })
  }

  const addDueDate = () => {
    actions.addColumn("DueDate");

    actions.updateRecord("0", "DueDate", "April 14")
    actions.updateRecord("1", "DueDate", "April 22")
  }

  return <div style={divStyle}>
    <div style={{float: "left", width: "33vw"}}>
      <h2>todos</h2>
      {todosTable(todos, extraColumns, extraData)}
    </div>

    <div style={{float: "left", width: "33vw"}}>
      <h2>sorted/filtered view</h2>
      {todosTable(sortedTodos, extraColumns, extraData)}
    </div>

    <div style={{float: "left", width:"33vw"}}>
      <div>
        <button style={{backgroundColor: "#0f4d92", color: "white", padding: 10, borderRadius: 5}} onClick={addTodo}>Add a todo</button>
      </div>

      <div>Sort column: <strong>{sortOrder.column}</strong></div>
      <div>Sort direction: <strong>{sortOrder.direction}</strong></div>

      <div>
        <button style={{backgroundColor: "#0f4d92", color: "white", padding: 10, borderRadius: 5, marginBottom: 10}} onClick={sortByText}>Sort by text</button>
      </div>

      <div>
        <button style={{backgroundColor: "#0f4d92", color: "white", padding: 10, borderRadius: 5}} onClick={addDueDate}>Add due date column</button>
      </div>
    </div>
  </div>
}

export default WcTable
