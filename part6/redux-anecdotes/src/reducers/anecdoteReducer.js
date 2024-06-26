import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAllAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdoteAsync = anecdote => {
  return async dispatch => {
    const anecdoteToVote = {...anecdote}
    anecdoteToVote.votes++
    await anecdoteService.putAnecdote(anecdoteToVote)
    dispatch(voteAnecdote(anecdoteToVote.id))
  }
}