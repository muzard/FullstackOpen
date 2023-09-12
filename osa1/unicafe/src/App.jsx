import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Display = ({ type, number }) => <div>{type}: {number}</div>

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
        <h1>statistics</h1>

        <Display type={'Good'} number={good} />
        <Display type={'Neutral'} number={neutral} />
        <Display type={'Bad'} number={bad} />
      </div>
    </div>
  )

}

export default App
