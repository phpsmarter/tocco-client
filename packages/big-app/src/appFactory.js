import React from 'react'
import {Provider} from 'react-redux'
import {StoreFactory, ExternalEvents, Intl} from 'tocco-util'
import {addLocaleData} from 'react-intl'
import {IntlProvider, intlReducer} from 'react-intl-redux'
import {LoadMask} from 'tocco-ui'

import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'

import loginReducer from './routes/Login/modules/authentication'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

export const factory = (id, input = {}, externalEvents) => {
  try {
    const initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}

    if (input) {
      initialState.input = input
    }

    if (externalEvents) ExternalEvents.registerEvents(externalEvents)

    const reducers = {
      login: loginReducer,
      routing: routerReducer,
      intl: intlReducer
    }

    const store = StoreFactory.createStore(initialState, reducers, [], 'big')

    // if (module.hot) {
    //   module.hot.accept('./modules/reducers', () => {
    //     let reducers = require('./modules/reducers').default
    //     StoreFactory.hotReloadReducers(store, reducers)
    //   })
    // }

    addLocaleData([...de, ...en, ...fr, ...it])
    const locale = input ? input.locale : null
    const initIntlPromise = Intl.initIntl(store, 'client', locale)

    const routes = require('./routes/index').default(store)
    const history = syncHistoryWithStore(browserHistory, store)

    const App = () => (
      <Provider store={store}>
        <LoadMask promises={[initIntlPromise]}>
          <IntlProvider>
            <Router history={history} children={routes}/>
          </IntlProvider>
        </LoadMask>
      </Provider>
    )

    return {
      renderComponent: App,
      methods: {}
    }
  } catch (e) {
    console.log('Error loading react application: ', e)
  }
}
