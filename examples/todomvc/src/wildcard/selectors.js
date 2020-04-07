import { createSelector } from 'reselect'
import _ from 'lodash'

const getWcConfig = (state) => state.__wildcard__;

// Given a selector as input,
// return a new selector which additionally sorts/filters its output
export const createWcSelector = (input) => {
  return createSelector(
    [input, getWcConfig],
    (input, wcConfig) => {
      const sortConfig = wcConfig.sort
      if (!sortConfig || !sortConfig.direction === "NONE") { return input; }
      let sorted = _.sortBy(input, t => t[sortConfig.column])
      if (sortConfig.direction === "DESC") { sorted = sorted.reverse() }
      return sorted;
    }
  )
};
