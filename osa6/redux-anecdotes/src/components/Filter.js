import React from 'react'
import listAnecdotes from './AnecdoteList'

const Filter = (props) => {

    
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    console.log('jeppis', event.target.value.length)
    if(event.target.value.length === 0) {
        props.store.dispatch({
            type: 'ALL_LISTED',
            data: event.target.value
          })
    } else {
        props.store.dispatch({
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

export default Filter