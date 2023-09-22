import { useState } from 'react'

// Destructuring the props object
const Statistics = ({ feedback }) => {
  // Destructuring the feedback array
  const [good, neutral, bad] = feedback

  const all = good + neutral + bad
  // Ternary operator to avoid showing NaN when all is cero
  const average = (all === 0) ? 0 : ((good*1 + neutral*0 + bad*-1) / all)
  const positive = (all === 0) ? 0 : ((good / all) * 100)

  console.log('all', all)
  console.log('average', average)
  console.log('positive', positive)

  return (
    <>
      <h1>statistics</h1>
      <div>
        good {good}<br/>
        neutral {neutral}<br/>
        bad {bad}<br/>
        all {all}<br/>
        average {average}<br/>
        positive {positive} %<br/>
      </div>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log('Rendering...')
  console.log('good', good)
  console.log('neutral', neutral)
  console.log('bad', bad)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics feedback={[good, neutral, bad]} />
    </div>
  )
}

export default App
