import React from 'react'
import {loginFactory} from './appFactory'

export class LoginApp extends React.Component {
  render() {
    console.log('this.props', this.props)
    const App = loginFactory(
      this.props.id,
      {showTitle: this.props.showTitle, locale: this.props.locale},
      {loginSuccess: this.props.loginSuccess}
    )
    return App.renderComponent()
  }
}

LoginApp.propTypes = {
  id: React.PropTypes.string,
  showTitle: React.PropTypes.bool,
  locale: React.PropTypes.string,
  loginSuccess: React.PropTypes.func
}

export default LoginApp
