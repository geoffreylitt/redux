import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import { bindActionCreators } from 'redux'
import WcTable from '../components/WcTable'
import { getSortedTodos } from '../selectors'

const mapStateToProps = state => ({
  todos: state.todos,
  sortedTodos: getSortedTodos(state),
  sortOrder: state.__wildcard__.sort
})


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WcTable)

