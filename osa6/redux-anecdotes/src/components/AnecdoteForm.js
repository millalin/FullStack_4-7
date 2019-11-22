import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'


const NewAn = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value

        props.store.dispatch(
            newAnecdote(content)
        )
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewAn

