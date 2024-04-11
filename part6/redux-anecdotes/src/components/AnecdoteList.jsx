import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, resetMessage } from '../reducers/notificationReducer'

const sortAnecdotesByVotes = (anecdote1, anecdote2) => {
  return anecdote2.votes - anecdote1.votes
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) return [...anecdotes].sort(sortAnecdotesByVotes)
    else {
      const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.includes(filter)
      )
      return [...filteredAnecdotes].sort(sortAnecdotesByVotes)
    }
  })

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setMessage(`You voted "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)
  }

  return anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList