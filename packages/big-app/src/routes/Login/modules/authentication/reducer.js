import * as actions from './actions'

const login = (state, {payload}) => ({...state, loggedIn: true})

const ACTION_HANDLERS = {
  [actions.LOGIN_SUCCESSFUL]: login
}

const initialState = {
  loggedIn: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
