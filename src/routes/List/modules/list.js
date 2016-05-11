import fetch from 'isomorphic-fetch'

export const REQUEST_ENTITIES = 'REQUEST_ENTITIES'
export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES'

function requestEntities() {
  return {
    type: REQUEST_ENTITIES
  }
}

function receiveEntities(json) {
  return {
    type: RECEIVE_ENTITIES,
    data: json.data,
    receivedAt: Date.now()
  }
}

export function fetchEntities(model, searchTerm, delay = 0) {
  return (dispatch, getState) => {
    const request = () => {
      dispatch(requestEntities())
      fetch(`http://localhost:8080/nice2/rest/entities/${model}?_search=${searchTerm}`, {
        credentials: 'include'
      })
        .then(response => response.json())
        .then(json => dispatch(receiveEntities(json)))
    }
    if (delay > 0) {
      setTimeout(() => {
        if (getState().list.searchTerm === searchTerm) {
          request()
        }
      }, delay)
    } else {
      request()
    }
  }
}

const ACTION_HANDLERS = {
  [RECEIVE_ENTITIES]: (state, { data }) => {
    return [].concat(data);
  }
}

const initialState = []

export default function listReducer(state = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
