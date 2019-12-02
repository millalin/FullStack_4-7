import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const NewAn = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.newAnecdote(content)
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


export default connect(null, { newAnecdote })(NewAn)


