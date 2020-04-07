import _ from 'lodash'

// todo: this is only single-table at the moment,
// ideally should generalize to multi-table
const wcInitialState = {
  sort: {
    column: null,
    direction: "NONE"
  },
  extraColumns: [],
  extraData: {
    1: {
      "user1": "test"
    }
  }
}

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

    case "WC_ADD_COLUMN":
      return {
        ...state,
        extraColumns: state.extraColumns.concat([action.column])
      }

    case "WC_UPDATE_RECORD":
      // If the update is in our Wildcard extra data, we maintain it
      // (if it's in the app's primary data, it's handled by the app's own reducers)
      if (_.includes(state.extraColumns, action.column)) {
        return {
          ...state,
          extraData: {
            ...state.extraData,
            [action.id]: {
              ...state.extraData[action.id],
              [action.column]: action.value
            }
          }
        }
      } else {
        return state;
      }

    default:
      return state;
  }
}

export default wcConfig;
