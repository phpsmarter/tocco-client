import React from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import TestContainer from './TestContainer'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import MySaga from './sagas'
import * as actions from './actions'
import {externalEvents} from 'tocco-util'

class TestApp extends React.Component {
  constructor(props) {
    super(props)
    const sagaMiddleware = createSagaMiddleware()
    let middleware = applyMiddleware(sagaMiddleware)

    if (__DEBUG__) {
      const composeEnhancers = composeWithDevTools({
        name: `test_${this.props.id}`
      })
      middleware = composeEnhancers(middleware)
    }

    this.store = createStore(reducer, {msg:'test', id: this.props.id}, middleware)
    sagaMiddleware.run(MySaga)

    externalEvents.registerEvents({onTen: this.props.onTen})

    this.store.dispatch(actions.setCount(this.props.initialCount))
  }

  render() {
    return (
      <Provider store={this.store}>
        <TestContainer/>
      </Provider>
    )
  }
}

TestApp.propTypes = {
  id: React.PropTypes.string,
  initialCount: React.PropTypes.number,
  onTen: React.PropTypes.func
}

export default TestApp
