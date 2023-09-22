import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  if (text !== 'positive') return <tr><td>{text}</td><td>{value}</td></tr>
  else return <tr><td>{text}</td><td>{value} %</td></tr>
}

// Destructuring the props object
const Statistics = ({ feedback }) => {
  // Destructuring the feedback array
  const [good, neutral, bad] = feedback

  const all = good + neutral + bad
  const average = (good*1 + neutral*0 + bad*-1) / all
  const positive = (good / all) * 100

  console.log('all', all)
  console.log('average', average)
  console.log('positive', positive)

  if (all > 0) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positive} />
          </tbody>
        </table>
      </>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log('\nRendering...')
  console.log('good', good)
  console.log('neutral', neutral)
  console.log('bad', bad)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics feedback={[good, neutral, bad]} />
    </div>
  )
}

export default App
