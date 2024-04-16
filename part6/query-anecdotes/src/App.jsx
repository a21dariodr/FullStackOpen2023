import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './services/anecdoteService'

const App = () => {

  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.modifyAnecdote,
    onSuccess: () => queryClient.invalidateQueries('anecdotes')
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
