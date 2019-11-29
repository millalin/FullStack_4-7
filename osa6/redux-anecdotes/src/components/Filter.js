import React from 'react'
import listAnecdotes from './AnecdoteList'
import { connect} from 'react-redux'

const Filter = (props) => {

    
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    console.log('jeppis', event.target.value.length)
    if(event.target.value.length === 0) {
        props.dispatch({
            type: 'ALL_LISTED',
            data: event.target.value
          })
    } else {
        props.dispatch({
            type: 'FILTER',
            data: event.target.value
          })
    }
   
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
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

const ConnectedList = connect(mapStateToProps)(Filter)
export default ConnectedList
