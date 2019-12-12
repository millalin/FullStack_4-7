import React from 'react'
import { connect } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'


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
          <input id='title' name="title" />
        </div>
        <div>
          author:
          <input id='author' name="author" />
        </div>
        <div>
          url:
          <input id='url' name="url" />
        </div>
        <div>
          <Button id='createbutton' variant="outline-info" type='submit'  >create</Button>
        </div>
      </form>
    </div>
  )
}


export default connect(
  null, { newBlog, setNotification })(NewBlog)