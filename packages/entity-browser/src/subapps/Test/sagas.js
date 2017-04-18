import {fork, takeLatest, select} from 'redux-saga/effects'
import * as actions from './actions'

import {externalEvents} from 'tocco-util'

export default function* sagas() {
  yield [
    fork(takeLatest, actions.COUNT_UP, checkTen)
  ]
}

export const selector = state => state

export function* checkTen() {
  const {count, id} = yield select(selector)
  if (count === 10) {
    externalEvents.invokeExternalEvent('onTen', id)
  }
}
