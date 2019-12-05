import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import BlogList from './components/Bloglist'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { initializeBlogs, newBlog } from './reducers/blogReducer'


const App = (props) => {

  const store = props.store

  const [username] = useField('text')
  const [password] = useField('password')
  //const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      notify('wrong username of password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const notify = (message, type = 'success') => {
    //setNotification({ message, type })
    //setTimeout(() => setNotification({ message: null }), 10000)

    setNotification(message)

  }
  /*const createBlog = async (blog) => {
    //const createdBlog = await blogService.create(blog)
    newBlogRef.current.toggleVisibility()
    //setBlogs(blogs.concat(createdBlog))

    const b = newBlog(blog)

    notify(`a new blog ${b.title} by ${b.author} added`)
  }*/



  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username} />
          </div>
          <div>
            salasana
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='create new' ref={newBlog}>
        <NewBlog />
      </Togglable>

      <BlogList/>
    </div>
  )
}

export default connect(null, { setNotification, clearNotification, initializeBlogs })(App)