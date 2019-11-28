import React from 'react'


const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

 
if(props.store.getState().notification === 'start') {
  return (
    <div></div>
  )
}

  return (
    <div style={style}>
      You voted '
       {props.store.getState().notification} '

     
    </div>
  )
}

export default Notification