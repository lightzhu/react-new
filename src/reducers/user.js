export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_USER':
      return action.data
    case 'GET_CITYS':
      return state
    default:
      return state
  }
}
