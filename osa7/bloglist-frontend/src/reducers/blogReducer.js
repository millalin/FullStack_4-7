import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch(action.type) {
      case 'NEW_BLOG':
        return [...state, action.data]
      case 'LIST':
        return action.data
    
    default:
      return state
    }
  }
    
    export const newBlog = (content) => {
      return async dispatch => {
        const newBlog = await blogService.create(content)

        /*  const blog = {
              title: content.title,
              author: content.author,
              url: content.ulr
          }
          const newBlog = blogService.create(blog) */
        dispatch({
          type: 'NEW_BLOG',
          data: newBlog
        })
        
      }
    
    }

    export const initializeBlogs = () => {
        return async (dispatch) => {
          const data = await blogService.getAll()
          dispatch({
            data: data,
            type: 'INITIALIZE'
          })
        }
      }
    
    
    
    export default reducer