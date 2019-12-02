import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }


  if (props.notification === 'start') {
    return (
      <div></div>
    )
  }

  return (
    <div style={style}>
      You voted '
       {props.notification} '
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

const ConnectedList = connect(mapStateToProps)(Notification)
export default ConnectedList
