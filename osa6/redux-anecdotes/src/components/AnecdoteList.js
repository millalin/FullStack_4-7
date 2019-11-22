import React from 'react'


const listAnecdotes = (props) => {
    const vote = (id) => {
        console.log('vote', id)
        props.store.dispatch({
          type: 'VOTE',
          data: { id }
        })
      }

    return (
        props.store.getState().map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )
    )
}

export default listAnecdotes