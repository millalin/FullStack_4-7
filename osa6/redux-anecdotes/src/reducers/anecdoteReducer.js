import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const newAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const vote = (id) => {
  return async dispatch => {
    await anecdoteService.updateAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })

  }
}

export const notificationInfo = (content, time) => {
  return async dispatch => {

    dispatch({
      type: 'VOTEINFO',
      data: { content }

    })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, time * 1000)
  }
}


const initialState = anecdotesAtStart.map(asObject)

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'ALL_LISTED',
      data: anecdotes,
    })
  }
}




const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'ALL_LISTED':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const list = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
      list.sort(function (a, b) {
        return b.votes - a.votes;
      });

      return list

    default:
      return state
  }


}



export default reducer
