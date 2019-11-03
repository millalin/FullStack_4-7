import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, un }) => {

Blog.propTypes  = {
  blog: PropTypes.object.isRequired,
  un: PropTypes.string.isRequired
}
  const [showinfo, setShowInfo] = useState(true)

  const deleteBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author} ?`)){
      blogService.remove(blog.id)
    }
  }

  const delButton = () => {

   console.log('käyttäjä', blog.user)
   console.log('käyttäjänimi', un)
  
   if (un !== blog.user.username){
      return (
        <div></div>
      )
    }

    return (
      <div>
      <button onClick={deleteBlog}>remove</button>
    </div>
    )
  }

  const likeAdding = () => {
    blog.likes = blog.likes + 1
    console.log('tul', blog.likes, blog.title)
    blogService.update(blog)
    
  }

  if (showinfo) {
    return (
      <div onClick={() => setShowInfo(!showinfo)}>
        <p>Title: <b> {blog.title}  </b>Author: {blog.author}  </p>
        <br></br>
      </div>)
  } else {
    return (
      <div onClick={() => setShowInfo(!showinfo)}>
        <p>Title: <b> {blog.title}  </b>Author: {blog.author}  </p>
        <p>Url: {blog.url} Likes: {blog.likes}</p>
        <button onClick={likeAdding}>like</button>
        {delButton()}
        <br></br>
      </div>

    )
  }
}

export default Blog