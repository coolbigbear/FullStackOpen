import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    
    const dispatch = useDispatch()
    
    const anecdotes = useSelector(state => { 
        console.log('Filter is: ', state.filter)
        if (state.filter === '') {
            return state.anecdotes
        } else {
            return state.anecdotes.filter(obj => obj.content.includes(state.filter))
        }
    })

    const vote = (anecdote) => {
        console.log('vote', anecdote)
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`You voted for: ${anecdote.content}`, 5))
    }

    return (
        <div>
            {anecdotes
                .sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes))
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
            )}
        </div>
    )

}

export default AnecdoteList;