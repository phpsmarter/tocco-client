import React from 'react'
import {mount} from 'enzyme'

import Document from './Document'

describe('tocco-ui', function() {
  describe('EditableValue', function() {
    describe('typeEditors', function() {
      describe('Document ', function() {
        it('should render link', function() {
          const binaryLink = 'http://localhost:8080/8ca597f/29/Firstname,-Lastname-Vorschaubild.png'
          const fileName = 'Firstname,-Lastname-Vorschaubild.png'
          const wrapper = mount(<Document value={{
            mimeType: 'image/png',
            fileExtension: 'png',
            sizeInBytes: 3336,
            fileName: fileName,
            binaryLink: binaryLink
          }}/>)
          const aElms = wrapper.find('a')
          expect(aElms).to.have.length(1)
          const aElm = aElms.first()
          expect(aElm).to.have.attr('href', binaryLink)
          expect(aElm).to.have.text(fileName)
          expect(aElm).to.have.attr('download')
        })
      })
    })
  })
})
