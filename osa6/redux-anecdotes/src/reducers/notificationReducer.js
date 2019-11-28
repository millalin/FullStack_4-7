
export const newNotification = (notif) => {
    return {
      type: 'VOTE',
      data: {
        content: notif,
       
      }
    }
  }
const notification = 'start'

const notificationReducer = (state = notification, action) => {
    console.log('state now: ', state)
  console.log('action', action)
    
    switch (action.type) {
      case 'VOTEINFO':
          console.log('jaa')
          state = action.data.content
          return state
case 'HIDE_NOTIFICATION':
state = 'start'
            default:
                    return state
    }
    
}

export default notificationReducer