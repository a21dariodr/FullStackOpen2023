import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    console.log('Votes:', newVotes)
    setVotes(newVotes)

    // Since state updates are asyncronous it's necessary to add one to the votes of the selected anecdote before the comparison
    if (selected !== mostVoted && votes[selected]+1 > votes[mostVoted]) {
      console.log('New most voted: ', selected)
      setMostVoted(selected)
    }
  }

  const handleNewSelection = () => {
    const newSelected = Math.round(Math.random()*(anecdotes.length-1))
    console.log('\nNew random index selected', newSelected)
    setSelected(newSelected)
  }

    return (
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}<br/>
        has {votes[selected]} votes
        <div>
          <button onClick={handleVote}>vote</button>
          <button onClick={handleNewSelection}>next anecdote</button>
        </div>

        <h1>Anecdote with most votes</h1>
        {anecdotes[mostVoted]}<br/>
        has {votes[mostVoted]} votes
      </div>
    )
}

export default App