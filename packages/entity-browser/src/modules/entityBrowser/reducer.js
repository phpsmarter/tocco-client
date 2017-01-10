import * as actions from './actions'
import {singleTransferReducer} from 'tocco-util/reducers'

const showRecordDetail = (state, {payload}) => ({
  ...state,
  showDetailRecordId: payload.recordId
})

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: singleTransferReducer('entityName'),
  [actions.SET_FORM_BASE]: singleTransferReducer('formBase'),
  [actions.SHOW_RECORD_DETAIL]: showRecordDetail,
  [actions.CLOSE_RECORD_DETAIL]: showRecordDetail
}

const initialState = {
  entityName: '',
  formBase: '',
  showDetailRecordId: undefined
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

