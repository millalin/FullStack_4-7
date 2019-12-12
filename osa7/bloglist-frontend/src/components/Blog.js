import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addlike, remove } from '../reducers/blogReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const Blog = (props) => {

  const blog = props.blog

  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = () => {
    props.addlike(blog)
    props.setNotification(`blog ${blog.title} liked`)
  }

  const removeBlog = () => {
    props.remove(blog)
    props.setNotification(`${blog.title} deleted`)
  }

  const details = () => (
    <div className='details'>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button id='like' onClick={likeBlog}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {(<button onClick={removeBlog}>remove </button>)}
    </div>
  )

  return (<tr>
    <div style={blogStyle}>
      <div id='blogclick' onClick={() => setExpanded(!expanded)} className='name'>
        <td> {blog.title} {blog.author} </td>
      </div>
      {expanded && details()}
    </div></tr>
  )
}




const mapDispatchToProps = {
  addlike,
  remove,
  setNotification
}


export default connect(
  null, mapDispatchToProps
)(Blog)