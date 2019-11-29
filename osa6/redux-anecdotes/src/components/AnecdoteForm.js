import React from 'react'
import {newAnecdote} from '../reducers/anecdoteReducer'
import { connect} from 'react-redux'
import anecdoteService from '../services/anecdotes'

const NewAn = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newA = await anecdoteService.createNew(content)
        props.newAnecdote(newA)
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

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      notification: state.notification,
      filter: state.filter
    }
  }

export default connect(null,{newAnecdote})(NewAn)


