const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'CLEAR_NOTIFICATION':
      return ''
  
  default:
    return state
  }
}
  
  export const setNotification = (content) => {
    return (dispatch) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        content
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION',
        })
      }, 5000)
    }
  
  }
  
  export const clearNotification = () => (
    {
      type: 'CLEAR_NOTIFICATION'
    }
  )
  
  export default reducer