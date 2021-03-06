import React from 'react'
import SearchBox from './SearchBox'

import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('SearchBox', function() {
    const DEFAULT_DEBOUNCE = 200
    const SEARCH_STRING = 'My Search String'

    it('should render', () => {
      const wrapper = shallow(<SearchBox onSearch={() => {
      }}/>)
      expect(wrapper.find('.tocco-searchbox')).to.have.length(1)
    })

    it('should call search function on form submit (button click)', () => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)

      wrapper.setState({'inputValue': SEARCH_STRING})
      const form = wrapper.find('form')
      form.simulate('submit', {
        preventDefault: () => {
        }
      })

      expect(searchFunc).to.have.been.calledWith(SEARCH_STRING)
    })

    it('should not call search twice for same term in a row', () => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)

      const form = wrapper.find('form')

      wrapper.setState({'inputValue': 'same'})
      form.simulate('submit', {
        preventDefault: () => {
        }
      })

      wrapper.setState({'inputValue': 'same'})
      form.simulate('submit', {
        preventDefault: () => {
        }
      })

      expect(searchFunc).to.have.been.calledOnce
      expect(searchFunc).to.have.been.calledWith('same')
    })

    it('should render the placeholder', () => {
      const placeholder = 'MyPlaceHolder'
      const wrapper = shallow(<SearchBox
        onSearch={() => {
        }}
        placeholder={placeholder}
      />)
      const searchBox = wrapper.find('.tocco-searchbox')

      expect(searchBox).to.have.length(1)
      expect(searchBox.find('input').prop('placeholder')).to.equal(placeholder)
    })

    it('should call search function on change event with live search', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
        liveSearch
      />)

      const input = wrapper.find('input')
      input.simulate('change', {target: {value: SEARCH_STRING}})

      setTimeout(() => {
        expect(searchFunc).to.have.been.calledWith(SEARCH_STRING)
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should not call search function on keyDown events with live search but to short input', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
        liveSearch
      />)

      const input = wrapper.find('input')
      input.simulate('change', {target: {value: 'a'}})

      setTimeout(() => {
        expect(searchFunc).to.not.have.been.called
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should await debounce time on livesearch', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
        liveSearch
        debounce={100}
      />)

      wrapper.setState({'inputValue': SEARCH_STRING})

      const input = wrapper.find('input')
      input.simulate('change', {target: {value: SEARCH_STRING}})

      setTimeout(() => {
        expect(searchFunc).to.not.have.been.called
      }, 10)

      setTimeout(() => {
        expect(searchFunc).to.have.been.called
        done()
      }, 200)
    })

    it('should update the input value', () => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)

      const input = wrapper.find('input')
      input.simulate('change', {target: {value: SEARCH_STRING}})

      expect(wrapper.state().inputValue).to.equal(SEARCH_STRING)
    })
  })
})
