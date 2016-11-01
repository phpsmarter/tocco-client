import CoreLayout from '../layouts/CoreLayout'
import Login from './Login'

export const createRoutes = store => {
  const routes = {
    path: '/',
    component: CoreLayout,
    indexRoute: Login(store)
    // getChildRoutes(location, next) {
    //   require.ensure([], require => {
    //     next(null, [
    //       require('./Login').default(store)
    //     ])
    //   })
    // }
  }

  return routes
}

export default createRoutes
