import {connect} from 'react-redux'
import {countUp} from './actions'
import Test from './Test'

const mapActionCreators = {
  increaseCount: countUp
}

const mapStateToProps = (state, props) => ({
  msg: state.msg,
  count: state.count
})

export default connect(mapStateToProps, mapActionCreators)(Test)
