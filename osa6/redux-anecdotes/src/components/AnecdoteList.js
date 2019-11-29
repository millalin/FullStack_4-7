import React from 'react'
import { connect} from 'react-redux'


const listAnecdotes = (props) => {

    const vote = (id, content) => {
        console.log('vote', id, content)
        props.dispatch({
          type: 'VOTE',
          data: { id }
        })
        props.dispatch({
          type: 'VOTEINFO',
          data: { content }
          
        })
        setTimeout(() => {
          props.dispatch({ type: 'HIDE_NOTIFICATION' })
        }, 5000)

        } 
      

    return (
      <div>
        {props.anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content} 
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
              </div>
            </div>
            
          )}
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


const ConnectedList = connect(mapStateToProps)(listAnecdotes)
export default ConnectedList