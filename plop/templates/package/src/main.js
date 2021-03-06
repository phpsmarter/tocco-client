import React from 'react'
import {appFactory, storeFactory} from 'tocco-util'

import reducers, {sagas} from './modules/reducers'

const packageName = '{{kebabCase package}}'

const initApp = (id, input, events, publicPath) => {
  const content = <div>{{titleCase package}}</div>

  const store = appFactory.createStore(reducers, sagas, undefined)

  return appFactory.createApp(
    packageName,
    content,
    store,
    input,
    events,
    [],
    publicPath
  )
}

(() => {
  if (__DEV__) {
    require('tocco-theme/src/ToccoTheme/theme.scss')
    const input = require('./dev/input.json')

    const fetchMock = require('fetch-mock')
    const setupFetchMocks = require('./dev/fetchMocks')
    setupFetchMocks(fetchMock)

    const app = initApp('id', input)

    if (module.hot) {
      module.hot.accept('./modules/reducers', () => {
        const reducers = require('./modules/reducers').default
        storeFactory.hotReloadReducers(app.store, reducers)
      })
    }

    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()
