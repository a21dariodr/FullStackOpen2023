import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import anecdoteService from './services/anecdoteService'
import NotificationContext from './services/NotificationContext'

const App = () => {

  const dispatchMessage = useContext(NotificationContext)[1]

  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.modifyAnecdote,
    onSuccess: anecdote => {
      queryClient.invalidateQueries('anecdotes')

      dispatchMessage({
        type: 'setMessage',
        payload: `Voted anecdote "${anecdote.content}"`
      })
    
      setTimeout(() => {
        dispatchMessage({
          type: 'resetMessage',
          payload: ''
        })
      }, 5000)
    }
  })

  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAnecdotes,
    retry: 1
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    console.log('vote')
  }

  if (anecdotes.isLoading) return <p>Loading anecdotes</p>

  if (anecdotes.isError) return <p>Error while loading anecdotes: {anecdotes.error.message}</p>

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
