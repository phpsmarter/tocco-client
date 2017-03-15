import {put, select, call, fork, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {fetchModel} from '../../../util/api/entities'

describe('entity-browser', () => {
  describe('modules', () => {
    describe('entityBrowser', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize)
            ])
            expect(generator.next().done).to.be.true
          })
        })

        describe('initialize saga', () => {
          it('should initialize global information', () => {
            const entityName = 'User'
            const entityModel = {}
            const showSearchForm = false

            const gen = sagas.initialize()
            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next({entityName, entityModel, showSearchForm}).value)
              .to.eql(call(sagas.loadEntityModel, entityName, entityModel))
            expect(gen.next().value).to.eql(put(actions.initialized()))

            expect(gen.next().done).to.be.true
          })
        })

        describe('loadEntityModel saga', () => {
          it('should load model if not already loaded', () => {
            const entityName = 'User'
            const entityModel = {}
            const loadedModel = {}
            const gen = sagas.loadEntityModel(entityName, entityModel)

            expect(gen.next().value).to.eql(call(fetchModel, entityName))
            expect(gen.next(loadedModel).value).to.eql(put(actions.setEntityModel(loadedModel)))

            expect(gen.next().done).to.be.true
          })

          it('should not load model if already loaded', () => {
            const entityName = 'User'
            const entityModel = {someContent: true}

            const gen = sagas.loadEntityModel(entityName, entityModel)
            expect(gen.next().done).to.be.true
          })
        })
      })
    })
  })
})
