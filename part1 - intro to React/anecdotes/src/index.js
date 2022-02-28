import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const DisplayAnecdote = ({ index }) => {
  console.log(index)
  return (
    <p>{anecdotes[index]}</p>
  )
}

const HasVotes = ({ index, votesList }) => {
  return (
    <p>has {votesList[index]} votes</p>
  )
}

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [maxVotes, setMaxVotes] = useState(0)

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)))
  }

  const addPoint = () => {
    const copy = [ ...votes ]
    copy[selected] += 1
    setMaxVotes(Math.max(...copy))
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote index={selected} />
      <HasVotes index={selected} votesList={votes}/>
      <Button handleClick={nextAnecdote} text={"next anecdote"} />
      <Button handleClick={addPoint} text={"vote"} />
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote index={votes.indexOf(maxVotes)} />
      <HasVotes index={votes.indexOf(maxVotes)} votesList={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)