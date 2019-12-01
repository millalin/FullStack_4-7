import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const createNew = async content => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const updateAnecdote = async (id) => {
    const object = await axios.get(baseUrl)
    const anecdote = object.data.find(anecdote => anecdote.id === id)
    anecdote.votes = anecdote.votes +1
    return await axios.put(`${baseUrl}/${id}`,anecdote)
}

export default { getAll, createNew, updateAnecdote }