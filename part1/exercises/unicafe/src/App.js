import React, { useState } from 'react'

const Button = (props) => {
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = (props) => {
  console.log('Statistics props', props)
  const { good, neutral, bad } = props

  const calcAll = () => good + neutral + bad

  const calcAverage = () => {
    const all = calcAll()
    if (all === 0) {
      return 0
    }

    return (good * 1 + neutral * 0 + bad * -1) / all
  }

  const calcPostivie = () => {
    const all = calcAll()
    if (all === 0) {
      return 0
    }
    return good / all * 100.0
  }

  console.log('good counter', good)
  console.log('neutral counter', neutral)
  console.log('bad counter', bad)
  console.log('all', calcAll())
  console.log('average', calcAverage())
  console.log('positive', calcPostivie(), "%")

  return (
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {calcAll()}</div>
      <div>average {calcAverage()}</div>
      <div>positive {calcPostivie()} %</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => {
    setGood(good + 1)
  }
  const clickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const clickBad = () => {
    setBad(bad + 1)
  }



  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={clickGood} text='good' />
      <Button handleClick={clickNeutral} text='neutral' />
      <Button handleClick={clickBad} text='bad' />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App