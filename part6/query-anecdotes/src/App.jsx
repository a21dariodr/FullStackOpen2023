import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import anecdoteService from './services/anecdoteService'

const App = () => {

  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAnecdotes,
    retry: 1
  })

  const handleVote = (anecdote) => {
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
