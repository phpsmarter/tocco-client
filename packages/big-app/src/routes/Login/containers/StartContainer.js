import Start from '../components/Start'
import {connect} from 'react-redux'

const mapActionCreators = {}

const mapStateToProps = (state, props) => ({
  loggedIn: state.login.loggedIn
})

export default connect(mapStateToProps, mapActionCreators)(Start)

