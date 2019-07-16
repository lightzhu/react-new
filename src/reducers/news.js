const result = (state = { data: [1, 2] }, action) => {
  console.log(action.data)
  switch (action.type) {
    case 'GET_NEWS':
      return action.data
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
