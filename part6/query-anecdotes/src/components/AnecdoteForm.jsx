import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import anecdoteService from '../services/anecdoteService'
import NotificationContext from '../services/NotificationContext'

const AnecdoteForm = () => {

  const dispatchMessage = useContext(NotificationContext)[1]

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))

      dispatchMessage({
        type: 'setMessage',
        payload: `Added anecdote "${newAnecdote.content}"`
      })
    
      setTimeout(() => {
        dispatchMessage({
          type: 'resetMessage',
          payload: ''
        })
      }, 5000)
    },
    onError: () => {
      dispatchMessage({
        type: 'setMessage',
        payload: 'Too short anecdote, must have at least a length of 5 characters'
      })
    
      setTimeout(() => {
        dispatchMessage({
          type: 'resetMessage',
          payload: ''
        })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
