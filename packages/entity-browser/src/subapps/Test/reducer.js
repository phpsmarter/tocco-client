import * as actions from './actions'

const countUp = (state, {payload}) => {
  const {amount} = payload
  return {
    ...state,
    count: state.count + amount
  }
}

const setCount = (state, {payload}) => {
  const {count} = payload
  return {
    ...state,
    count
  }
}

const ACTION_HANDLERS = {
  [actions.COUNT_UP]: countUp,
  [actions.SET_COUNT]: setCount
}

const initialState = {
  count: 0,
  msg: 'test'
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
