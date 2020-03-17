export default function (state = { weather: [], city: '' }, action) {
  switch (action.type) {
    case 'SET_WEATHER':
      return { weather: action.data }
    case 'SET_CITYS':
      return { city: action.data }
    default:
      return state
  }
}
