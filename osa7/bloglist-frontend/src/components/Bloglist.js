import React from 'react'
import { connect } from 'react-redux'
//import { notificationInfo } from '../reducers/notificationReducer'
import Blog from './Blog'
import blogService from '../services/blogs'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const blogList = (props) => {

  /*const likeBlog = (id, content) => {

    props.vote(id)
    props.notificationInfo(content, 5)

  }*/



  return (
    <div>
      {props.blogs.map(b =>
        <div key={b.id}>
          <div>
            {b.title}
          </div>
          <div>
            has {b.likes}
          </div>
        </div>

      )}
    </div>
  )
}

const removeBlog = async (blog, blogs) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      const updatedBlog = await blogService.remove(blog)
      blogs.filter(b => b.id !== updatedBlog.id)
      notify(`blog ${updatedBlog.title} by ${updatedBlog.author} removed!`)
    }
  }

  const notify = (message, type = 'success') => {
    //setNotification({ message, type })
    //setTimeout(() => setNotification({ message: null }), 10000)

    setNotification(message)

  }

const byLikes = (b1, b2) => b2.likes - b1.likes

const likeBlog = async (blog, blogs) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(likedBlog)
    (blogs.map(b => b.id === blog.id ? updatedBlog : b))
    notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
}




const sortBlogs = ({ blogs }) => {
  
    const list = blogs.sort(byLikes)
       // <Blog
       // key={blog.id}
       // blog={blog}
       // like={likeBlog(blogs)}
       // remove={removeBlog(blogs)}
        //user={user}
        //creator={blog.user.username === user.username}
      ///>
    //)
  return list
}

const mapStateToProps = (state) => {
  return {
    blogs: sortBlogs(state),
    //notification: notificationInfo
  }
}
const mapDispatchToProps = {
  likeBlog,
  setNotification
}


const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(blogList)
export default ConnectedList