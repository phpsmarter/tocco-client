import React from 'react'

const Test = props => {
  const handleClick = () => {
    if (props.increaseCount) {
      props.increaseCount(1)
    }
  }

  return (
    <div>
      <span>{props.msg}: {props.count}</span>
      <button onClick={handleClick}>+</button>
    </div>
  )
}

Test.propTypes = {
  msg: React.PropTypes.string,
  count: React.PropTypes.number,
  increaseCount: React.PropTypes.func
}

export default Test
