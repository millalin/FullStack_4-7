import React from 'react'
import { connect } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { Table, Form, Button } from 'react-bootstrap'


const NewBlog = (props) => {
  

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const content = ({
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0
    }) 
    props.newBlog(content)
    props.setNotification(event.target.title.value)

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input name="title" />
        </div>
        <div>
          author:
          <input name="author" />
        </div>
        <div>
          url:
          <input name="url" />
        </div>
        <Button variant="outline-info" type='submit'>create</Button>
      </form>
    </div>
  )
}


export default connect(
 null, {newBlog, setNotification})(NewBlog)