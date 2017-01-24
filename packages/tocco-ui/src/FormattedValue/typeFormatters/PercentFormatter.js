import React from 'react'
import DecimalFormatter from './DecimalFormatter'

const PercentFormatter = props => {
  return (
    <span><DecimalFormatter value={props.value}/>%</span>
  )
}

PercentFormatter.propTypes = {
  value: React.PropTypes.number.isRequired
}

export default PercentFormatter
