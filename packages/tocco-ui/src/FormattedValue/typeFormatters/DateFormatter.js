import React from 'react'
import {FormattedDate} from 'react-intl'

const DateFormatter = props => {
  const timestamp = Date.parse(props.value)
  if (isNaN(timestamp)) {
    console.error('DateFormatter: Invalid date', props.value)
    return <span/>
  }

  const date = new Date(timestamp)

  return (
    <FormattedDate
      value={date}
      timeZone="UTC"
      year="numeric"
      month="numeric"
      day="numeric"
    />
  )
}

DateFormatter.propTypes = {
  value: React.PropTypes.string.isRequired
}

export default DateFormatter
