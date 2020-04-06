import React from 'react'

const WcTable = ({sortOrder, actions}) => {
  let divStyle = {
    position: "fixed",
    height: "150px",
    left: 0,
    bottom: 0,
    width: "100vw",
    backgroundColor: "white"
  }

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
    <h2>Sorting control</h2>

    <div>Sort column: {sortOrder.column}</div>
    <div>Sort direction: {sortOrder.direction}</div>

    <div>
      <button style={{textDecoration: "underline"}} onClick={sortByText}>Sort by text</button>
    </div>
  </div>
}

export default WcTable
