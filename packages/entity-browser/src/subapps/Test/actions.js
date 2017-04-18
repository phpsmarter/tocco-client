export const COUNT_UP = 'COUNT_UP'

export const countUp = amount => ({
  type: COUNT_UP,
  payload: {
    amount
  }
})

export const SET_COUNT = 'SET_COUNT'
export const setCount = count => ({
  type: SET_COUNT,
  payload: {
    count
  }
})
