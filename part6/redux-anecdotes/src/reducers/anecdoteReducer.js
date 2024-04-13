import { createSlice, current } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      console.log('state now: ', current(state))
      console.log('action', action)
      const anecdoteToVote = state.find(anecdote => anecdote.id === action.payload)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote)
    },
    addAnecdote(state, action) {
      console.log('state now: ', current(state))
      console.log('action', action)
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      state.push(newAnecdote)
    },
    setAnecdotes(state, action) {
      console.log('state now: ', current(state))
      console.log('action', action)
      return action.payload
    },
    appendAnecdote(state, action) {
      console.log('state now: ', current(state))
      console.log('action', action)
      state.push(action.payload)
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer