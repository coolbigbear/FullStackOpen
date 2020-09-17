import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Statistic = ({ category, num, end }) => {
  return (
    <tr>
      <td>{category}</td><td>{num}{end}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  let all = good + neutral + bad

  if (all !== 0) {

    let average_num = ((good - bad) / all).toFixed(1)
    let positive_num = Math.round((good / all) * 100).toFixed(1)

    return (
      <table>
        <tbody>
          <Statistic category={"good"} num={good} />
          <Statistic category={"neutral"} num={neutral} />
          <Statistic category={"bad"} num={bad} />
          <Statistic category={"all"} num={good + neutral + bad} />
          <Statistic category={"average"} num={average_num} />
          <Statistic category={"positive"} num={positive_num} end={"%"} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const give_feedback = "give feedback"
  const statistics = "statistics"

  return (
    <div>
      <Header text={give_feedback} />

      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />

      <Header text={statistics} />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)