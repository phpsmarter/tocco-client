import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  entityName: '',
  formBase: '',
  entityModel: {},
  initialized: false,
  relationEntities: {}
}

describe('entity-browser', () => {
  describe('modules', () => {
    describe('entityBrowser', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        it('should handle INITIALIZED', () => {
          let state = EXPECTED_INITIAL_STATE
          state = reducer(state, actions.initialized())
          expect(state.initialized).to.be.true
        })

        describe('setRelationEntity', () => {
          it('should add new entities', () => {
            const stateBefore = {
              relationEntities: {}
            }

            const entities = [
              {value: 1, label: 'User1'},
              {value: 2, label: 'User2'}
            ]

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  data: entities
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntity('User', entities))).to.deep.equal(expectedStateAfter)
          })

          it('should add entities to existing and dont override', () => {
            const stateBefore = {
              relationEntities: {
                User: {
                  data: [
                    {value: 1, label: 'User1'},
                    {value: 2, label: 'User2'}
                  ]
                }
              }
            }

            const entities = [
              {value: 2, label: 'User2 new'},
              {value: 3, label: 'User3'}
            ]

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  data: [
                    {value: 1, label: 'User1'},
                    {value: 2, label: 'User2'},
                    {value: 3, label: 'User3'}
                  ]
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntity('User', entities))).to.deep.equal(expectedStateAfter)
          })

          it('should add entities to existing and override with reset', () => {
            const stateBefore = {
              relationEntities: {
                User: {
                  data: [
                    {value: 1, label: 'User1'},
                    {value: 2, label: 'User2'}
                  ]
                }
              }
            }

            const entities = [
              {value: 2, label: 'User2 new'},
              {value: 3, label: 'User3'}
            ]

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  data: [
                    {value: 2, label: 'User2 new'},
                    {value: 3, label: 'User3'}
                  ]
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntity('User', entities, true)))
              .to.deep.equal(expectedStateAfter)
          })
        })
        describe('setRelationEntityLoaded', () => {
          it('should set loaded', () => {
            const stateBefore = {
              relationEntities: {
                User: {
                  loaded: false
                }
              }
            }

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  loaded: true
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntityLoaded('User'))).to.deep.equal(expectedStateAfter)
          })

          it('should handle emtpty entity', () => {
            const stateBefore = {
              relationEntities: {
              }
            }

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  loaded: true
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntityLoaded('User'))).to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})
