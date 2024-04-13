import { useDispatch } from 'react-redux'
import { setMessage, resetMessage } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote content: ', content)
    dispatch(createAnecdote({ content, votes: 0 }))
    dispatch(setMessage(`New anecdote "${content}" added`))
      setTimeout(() => {
        dispatch(resetMessage())
      }, 5000)
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