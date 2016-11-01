import React from 'react'

import LoginContainer from '../containers/LoginContainer'

const Start = props => {
  if (props.loggedIn) {
    return <div>Logged in</div>
  }

  return (
    <div>
      <LoginContainer id="login1"/>
      <LoginContainer id="login2"/>
    </div>
  )
}

Start.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  route: React.PropTypes.func.isRequired
}

export default Start
