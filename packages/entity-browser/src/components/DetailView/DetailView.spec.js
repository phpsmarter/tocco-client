import React from 'react'
import DetailView from './DetailView'
import {shallow} from 'enzyme'

const EMPTY_FUNC = () => {}

describe('entity-browser', () => {
  describe('components', () => {
    describe('ListView', () => {
      it('should render', () => {
        const wrapper = shallow(<DetailView
          formDefinition={{children: []}}
          closeEntityDetail={EMPTY_FUNC}
          entity={{}}
          entityModel={{}}
          saveEntity={EMPTY_FUNC}
          submitForm={EMPTY_FUNC}
          logError={EMPTY_FUNC}
        />)

        expect(wrapper.find('.detail-view')).to.have.length(1)
      })
    })
  })
})