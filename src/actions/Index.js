import fetch from '@/static/js/request'
export const plus = nums => ({
  type: 'PLUS',
  num1: nums[0],
  num2: nums[1]
})
export const minus = nums => ({
  type: 'MINUS',
  num1: nums[0],
  num2: nums[1]
})
export const multiply = nums => ({
  type: 'MULTIPLY',
  num1: nums[0],
  num2: nums[1]
})
export const divide = nums => ({
  type: 'DIVIDE',
  num1: nums[0],
  num2: nums[1]
})
export const getWeatherInfo = city => {
  return dispatch => {
    fetch(`/get_weatherInfo?city=${city}`, 'get')
      .then(function (response) {
        dispatch({
          type: 'SET_WEATHER',
          data: response.data
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
export const getNewsInfo = type => {
  return dispatch => {
    fetch(`/get_news?type=${type}`, 'get')
      .then(function (response) {
        dispatch({
          type: 'GET_NEWS',
          data: response.data
        })
      })
      .catch(function (error) {
        throw (error)
      })
  }
}
