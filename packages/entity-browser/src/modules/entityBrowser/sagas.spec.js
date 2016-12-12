import {takeLatest, takeEvery} from 'redux-saga'
import {put, select, call, fork, spawn} from 'redux-saga/effects'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import * as api from '../../util/api'

const generateState = (recordStore = {}, page) => ({
  entityName: '',
  orderBy: '',
  limit: '',
  searchTerm: '',
  recordStore,
  page
})

describe('entity-browser', () => {
  describe('modules', () => {
    describe('entityBrowser', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal([
              fork(takeLatest, actions.INITIALIZE_TABLE, sagas.initializeEntityBrowser),
              fork(takeLatest, actions.CHANGE_PAGE, sagas.changePage),
              fork(takeLatest, actions.REQUEST_RECORDS, sagas.requestRecords),
              fork(takeEvery, actions.SET_ORDER_BY, sagas.resetDataSet),
              fork(takeEvery, actions.SET_SEARCH_TERM, sagas.resetDataSet),
              fork(takeEvery, actions.RESET_DATA_SET, sagas.resetDataSet)
            ])
            expect(generator.next().done).to.be.true
          })
        })

        describe('initializeEntityBrowser saga', () => {
          it('should initialize the entity browser', () => {
            const gen = sagas.initializeEntityBrowser()

            const entityName = 'User'
            const state = {...generateState(), entityName: entityName}

            const searchFormDefinition = [{
              name: entityName,
              type: 'type',
              displayType: 'displayType',
              label: 'label',
              useLabel: true
            }]

            const columnDefinition = [
              {label: 'Label', value: []}
            ]

            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))

            expect(gen.next(state).value).to.eql([
              call(api.fetchSearchForm, entityName + '_search'),
              call(api.fetchColumnDefinition, entityName + '_list', 'table')
            ])
            expect(gen.next([searchFormDefinition, columnDefinition]).value).to.eql(
              put(actions.setSearchFormDefinition(searchFormDefinition))
            )
            expect(gen.next().value).to.eql(put(actions.setColumnDefinition(columnDefinition)))
            expect(gen.next().value).to.eql(call(sagas.resetDataSet))
            expect(gen.next().done).to.be.true
          })
        })

        describe('changePage saga', () => {
          it('should set currentPage and requestRecords', () => {
            const page = 1
            const gen = sagas.changePage({payload: {page: page}})
            expect(gen.next().value).to.eql(put(actions.setCurrentPage(page)))
            expect(gen.next().value).to.eql(put(actions.requestRecords(page)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('fetchRecordsAndAddToStore saga', () => {
          it('should not add records to store', () => {
            const gen = sagas.fetchRecordsAndAddToStore(1)

            const state = generateState({1: true})

            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next(state).done).to.be.true
          })

          it('should add records to store', () => {
            const state = generateState({}, 1)
            const {entityName, page, orderBy, limit, searchTerm, columnDefinition} = state

            const gen = sagas.fetchRecordsAndAddToStore(1)

            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next(state).value).to.eql(call(
              api.fetchRecords, entityName, page, orderBy, limit, searchTerm, columnDefinition
            ))
            expect(gen.next().value).to.eql(put(actions.addRecordsToStore(page, undefined)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('requestRecords saga', () => {
          it('should request records', () => {
            const page = 1
            const gen = sagas.requestRecords({payload: {page}})

            const state = generateState({}, page)
            state.limit = 50
            state.recordCount = 1000

            expect(gen.next().value).to.eql(put(actions.setRecordRequestInProgress(true)))
            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next(state).value).to.eql(call(sagas.fetchRecordsAndAddToStore, page))
            expect(gen.next().value).to.eql(call(sagas.displayRecord, page))
            expect(gen.next().value).to.eql(put(actions.setRecordRequestInProgress(false)))

            expect(gen.next().value).to.eql(spawn(sagas.fetchRecordsAndAddToStore, page + 1))
            expect(gen.next().done).to.be.true
          })

          it('should not cache if at end', () => {
            const page = 1
            const gen = sagas.requestRecords({payload: {page}})

            const state = generateState({}, page)
            state.limit = 50
            state.recordCount = 49

            expect(gen.next().value).to.eql(put(actions.setRecordRequestInProgress(true)))
            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next(state).value).to.eql(call(sagas.fetchRecordsAndAddToStore, page))
            expect(gen.next().value).to.eql(call(sagas.displayRecord, page))
            expect(gen.next().value).to.eql(put(actions.setRecordRequestInProgress(false)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('displayRecord saga', () => {
          it('should display record', () => {
            const page = 1
            const gen = sagas.displayRecord(page)
            const records = [{}]
            const state = generateState({1: records})
            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next(state).value).to.eql(put(actions.setRecords(records)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('resetDataSet saga', () => {
          it('should clear the record store', () => {
            const gen = sagas.resetDataSet()

            const entityName = 'User'
            const searchTerm = 'abcd'
            const state = {...generateState(), entityName: entityName}
            state.searchTerm = searchTerm
            const recordCount = 100

            expect(gen.next().value).to.eql(put(actions.setRecords([])))
            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next(state).value).to.eql(call(api.fetchRecordCount, entityName, searchTerm))
            expect(gen.next(recordCount).value).to.eql(put(actions.setRecordCount(recordCount)))
            expect(gen.next().value).to.eql(put(actions.clearRecordStore()))
            expect(gen.next().value).to.eql(call(sagas.changePage, {payload: {page: 1}}))
          })
        })
      })
    })
  })
})
