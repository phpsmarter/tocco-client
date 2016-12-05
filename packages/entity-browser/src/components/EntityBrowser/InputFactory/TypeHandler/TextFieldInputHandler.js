import React from 'react'
import * as ToccoUI from 'tocco-ui'

const TextFieldInputHandler = ({fieldDefinition, setSearchTerm}) => {
  const onSearch = value => {
    setSearchTerm({
      name: fieldDefinition.name,
      value: value
    })
  }

  return (
    <ToccoUI.SearchBox
      onSearch={onSearch}
      placeholder={fieldDefinition.label}
      liveSearch
    />
  )
}

TextFieldInputHandler.propTypes = {
  fieldDefinition: React.PropTypes.object.isRequired,
  setSearchTerm: React.PropTypes.func
}

export default TextFieldInputHandler
