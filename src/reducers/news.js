const result = (state = { data: [] }, action) => {
  switch (action.type) {
    case 'GET_NEWS':
      return { data: action.data }
    case 'MINUS':
      return [2]
    case 'MULTIPLY':
      return [3]
    case 'DIVIDE':
      return [4]
    default:
      return state
  }
}
export default result
