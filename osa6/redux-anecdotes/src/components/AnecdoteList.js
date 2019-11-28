import React from 'react'
import {notificationVoted} from './Notification'
import {useEffect} from 'react'



const listAnecdotes = (props) => {
    const vote = (id, content) => {
        console.log('vote', id, content)
        props.store.dispatch({
          type: 'VOTE',
          data: { id }
        })
        props.store.dispatch({
          type: 'VOTEINFO',
          data: { content }
          
        })
        setTimeout(() => {
          props.store.dispatch({ type: 'HIDE_NOTIFICATION' })
        }, 5000)

        } 
      

    return (
        props.store.getState().anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
              </div>
            </div>
          )
    )
}

export default listAnecdotes