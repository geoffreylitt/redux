const wcInitialState = {}

const wcConfig = (state = wcInitialState, action) => {
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

export default wcConfig;
