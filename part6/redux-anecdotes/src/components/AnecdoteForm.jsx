import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, resetMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote content: ', content)
    anecdoteService.addAnecdote({ content, votes: 0 }).then(anecdote => {
      dispatch(appendAnecdote(anecdote))
      dispatch(setMessage(`New anecdote "${anecdote.content}" added`))
      setTimeout(() => {
        dispatch(resetMessage())
      }, 5000)
    })
  }

  return <>
    <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
  </>
}

export default AnecdoteForm