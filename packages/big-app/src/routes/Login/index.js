export default store => ({
  path: 'start',
  getComponent(nextState, next) {
    require.ensure([
      './containers/StartContainer'
    ], require => {
      const LoginContainer = require('./containers/StartContainer').default
      next(null, LoginContainer)
    })
  }
})
