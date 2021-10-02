import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const StatisticLine = ({ category, num, end }) => {
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

const Statistic = ({ good, neutral, bad }) => {

    let all = good + neutral + bad

    if (all !== 0) {

        let average_num = ((good - bad) / all).toFixed(1)
        let positive_num = Math.round((good / all) * 100).toFixed(1)

        return (
            <table>
                <tbody>
                    <StatisticLine category={"good"} num={good} />
                    <StatisticLine category={"neutral"} num={neutral} />
                    <StatisticLine category={"bad"} num={bad} />
                    <StatisticLine category={"all"} num={good + neutral + bad} />
                    <StatisticLine category={"average"} num={average_num} />
                    <StatisticLine category={"positive"} num={positive_num} end={"%"} />
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

            <Statistic good={good} neutral={neutral} bad={bad} />

        </div>
    )
}

export default App