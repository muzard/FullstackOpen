import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => <div>{text}: {value}</div>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral
  let average = ( good - bad ) / total
  const positive = (good / total * 100 || '0')
  const positiveString = (positive.toString() + ' %')

  if ( total === 0 ) {
    return (
      <h4>No feedback given</h4>
    )
  }

  return (
    <div>
      <StatisticLine text={'good'} value={good} />
      <StatisticLine text={'neutral'} value={neutral} />
      <StatisticLine text={'bad'} value={bad} />
      <StatisticLine text={'all'} value={total} />
      <StatisticLine text={'average'} value={(average || '0')} />
      <StatisticLine text={'positive'} value={positiveString} />
    </div>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1 
    setGood(updatedGood)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>

        <Button handleClick={handleGoodClick} text={'good'} />
        <Button handleClick={handleNeutralClick} text={'neutral'} />
        <Button handleClick={handleBadClick} text={'bad'} />
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )

}

export default App
