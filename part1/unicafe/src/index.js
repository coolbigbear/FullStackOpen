import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Display = ({ category, num }) => <p>{category} {num}</p>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const give_feedback = "give feedback"
  const statistics = "statistics"
  const good_text = "good"
  const neutral_text = "neutral"
  const bad_text = "bad"

  return (
    <div>
      <Header text={give_feedback} />
      
      <Button handleClick={() => setGood(good + 1)} text={"good"}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />

      <Header text={statistics} />
      
      <Display category={good_text} num={good}/>
      <Display category={neutral_text} num={neutral}/>
      <Display category={bad_text} num={bad}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)