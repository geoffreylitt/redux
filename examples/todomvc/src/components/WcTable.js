import React from 'react'

const divStyle = {
  position: "fixed",
  height: "300px",
  left: 0,
  bottom: 0,
  width: "100vw",
  backgroundColor: "white",
  fontSize: "14px",
  fontWeight: "normal"
}

const todosTable = (todos) => {
  return <table border="1">
      <thead style={{display: "table-header-group", textAlign: "left"}}>
        <tr>
          <th>id</th>
          <th>text</th>
          <th>completed</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => {
          return <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.completed ? "true" : "false"}</td>
          </tr>
        })}
      </tbody>
    </table>
}

const WcTable = ({todos, sortedTodos, sortOrder, actions}) => {
  let sortByText = () => {
    if (!sortOrder.column) {
      actions.sortTable("text", "ASC");
    } else if (sortOrder.direction === "ASC") {
      actions.sortTable(sortOrder.column, "DESC");
    } else {
      actions.sortTable(null, "NONE");
    }
  }

  return <div style={divStyle}>
    <div style={{float: "left", width: "33vw"}}>
      <h2>todos</h2>
      {todosTable(todos)}
    </div>

    <div style={{float: "left", width: "33vw"}}>
      <h2>sorted/filtered view</h2>
      {todosTable(sortedTodos)}
    </div>

    <div style={{float: "left", width:"33vw"}}>
      <h2>Sort Control</h2>

      <div>Sort column: <strong>{sortOrder.column}</strong></div>
      <div>Sort direction: <strong>{sortOrder.direction}</strong></div>

      <div>
        <button style={{backgroundColor: "#0f4d92", color: "white", padding: 10, borderRadius: 5}} onClick={sortByText}>Sort by text</button>
      </div>
    </div>
  </div>
}

export default WcTable
