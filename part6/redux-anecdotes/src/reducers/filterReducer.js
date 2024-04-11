const reducer = (state = '', action) => {
  if (action.type === 'FILTER') return action.payload
  return state
}

export const filterAnecdotes = (text) => {
  return {
    type: 'FILTER',
    payload: text
  }
}

export default reducer