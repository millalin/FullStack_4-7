import React from 'react'
import { connect} from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationInfo } from '../reducers/anecdoteReducer'

const listAnecdotes = (props) => {

    const addvote = (id, content) => {
        
      props.vote(id)
      props.notificationInfo(content, 5)
  

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
                <button onClick={() => addvote(anecdote.id, anecdote.content)}>vote</button>
              </div>
            </div>
            
          )}
          </div>
    )
}

const filterAnec = ({anecdotes, filter}) => {
  if (filter.length > 0) {
    const list = anecdotes.filter(anec => anec.content.includes(filter))
    return list
  }
  return anecdotes
}

const mapStateToProps = (state) => {
  return {
    anecdotes: filterAnec(state)
  }
}
const mapDispatchToProps = {
  vote,
  notificationInfo
}


const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(listAnecdotes)
export default ConnectedList