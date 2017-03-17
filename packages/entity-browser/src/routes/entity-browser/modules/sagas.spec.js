import {put, select, call, fork, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {fetchModel, fetchEntities} from '../../../util/api/entities'

describe('entity-browser', () => {
  describe('modules', () => {
    describe('entityBrowser', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.LOAD_RELATION_ENTITY, sagas.loadRelationEntity)
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

          describe('loadRelationEntity saga', () => {
            it('should load relation entites ', () => {
              const entityName = 'User'

              const entities = {data: [{display: 'User1', key: 1}]}
              const transformedEntities = [{value: 1, label: 'User1'}]
              const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
              expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
              expect(gen.next({relationEntities:{}}).value).to.eql(call(fetchEntities, entityName))
              expect(gen.next(entities).value)
                .to.eql(put(actions.setRelationEntity(entityName, transformedEntities, true)))
              expect(gen.next().value).to.eql(put(actions.setRelationEntityLoaded(entityName)))
              expect(gen.next().done).to.be.true
            })

            it('shouldnot load entities if already loaded', () => {
              const entityName = 'User'

              const state = {
                relationEntities: {
                  User: {
                    loaded:true
                  }
                }
              }

              const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
              expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
              expect(gen.next(state).done).to.be.true
            })
          })
        })
      })
    })
  })
})
