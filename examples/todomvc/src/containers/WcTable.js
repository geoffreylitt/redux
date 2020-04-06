import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import { bindActionCreators } from 'redux'
import WcTable from '../components/WcTable'
import { getCompletedTodoCount } from '../selectors'


const mapStateToProps = state => ({
  sortOrder: state.__wildcard__.sort
})


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WcTable)

