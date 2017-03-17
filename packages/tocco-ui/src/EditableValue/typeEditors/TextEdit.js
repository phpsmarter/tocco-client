import React from 'react'

const TextEdit = props => {
  const handleChange = e => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return (
    <textarea
      className="form-control"
      name={props.name}
      onChange={handleChange}
      id={props.id}
      value={props.value}
      disabled={props.readOnly}
    />
  )
}

TextEdit.defaultProps = {
  value: ''
}

TextEdit.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.node,
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  readOnly: React.PropTypes.bool
}

export default TextEdit
