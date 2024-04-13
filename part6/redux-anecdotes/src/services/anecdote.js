import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

const putAnecdote = async (modifiedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${modifiedAnecdote.id}`, modifiedAnecdote)
  return response.data
}

export default { getAllAnecdotes, addAnecdote, putAnecdote }