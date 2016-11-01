import Login from '../../../../../login/src/app'

import {connect} from 'react-redux'
import {loginSuccess} from '../modules/authentication/actions'

const mapActionCreators = {
  loginSuccess
}

const mapStateToProps = (state, props) => ({
  locale: 'de',
  showTitle: true
})

export default connect(mapStateToProps, mapActionCreators)(Login)

