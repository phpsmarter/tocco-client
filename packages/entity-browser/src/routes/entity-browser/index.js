import {route, storeFactory} from 'tocco-util'

export default (store, input) => {
  if (module.hot) {
    module.hot.accept('./route', () => {
      const reducers = require('./route').default.reducers
      storeFactory.hotReloadReducers(store, reducers)
    })
  }

  return route.loadRoute(store, input, () => (import('./route')))
}
