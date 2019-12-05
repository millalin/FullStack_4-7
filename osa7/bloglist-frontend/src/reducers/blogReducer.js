import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    console.log('state now: ', state)
  console.log('action', action)
    switch(action.type) {
      case 'NEW_BLOG':
        return [...state, action.data]
      case 'LIST':
        return action.data
    case 'LIKE':
        
            const id = action.data.id
            const blogToChange = state.find(b => b.id === id)
            const changedBlog = {
              ...blogToChange,
              likes: blogToChange.likes + 1
            }
            const list = state.map(b =>
              b.id !== id ? b : changedBlog)
            list.sort(function (a, b) {
              return b.likes - a.likes;
            });
      
            return list
    
    case 'REMOVE':
        const blogid = action.data
        const blogs = state.fill(b => b.id != blogid)
        return blogs
    default:
      return state
    }
  }
    
  export const addlike = id => {
    return async dispatch => {
      await blogService.update(id)
      dispatch({
        type: 'LIKE',
        data: id 
      })
  
    }
  }

  export const remove = id => {
    return async dispatch => {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE',
        data:  id 
      })
  
    }
  }

    export const newBlog = (content) => {
      return async dispatch => {
        const newBlog = await blogService.create(content)

        dispatch({
          type: 'NEW_BLOG',
          data: newBlog
        })
        
      }
    
    }

    export const initializeBlogs = () => {
        return async dispatch => {
          const blogs = await blogService.getAll()
          dispatch({
            type: 'LIST',
            data: blogs,
          })
        }
      }
    
    
    
    export default reducer