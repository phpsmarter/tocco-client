import React from 'react'
import DateAbstract from './DateAbstract'

const DateRangeEdit = props => {
  const options = {
    mode: 'range',
    altFormat: 'd.m.Y',
    dateFormat: 'Y-m-d',
    ...props.options
  }

  const value = props.value && props.value.from && props.value.to
    ? [props.value.from, props.value.to]
    : null

  const handleChange = dates => {
    const value = dates && dates.length === 2
      ? {
        from: dates[0],
        to: dates[1]
      }
      : null

    props.onChange(value)
  }

  return (
    <DateAbstract value={value} onChange={handleChange} options={options}/>
  )
}

DateRangeEdit.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.shape({
    from: React.PropTypes.string,
    to: React.PropTypes.string
  }),
  options: React.PropTypes.object
}

export default DateRangeEdit
