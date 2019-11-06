import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServ from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginFrom'
import { useField } from './hooks'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const newBlog = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [addblogVisible, setAddblogVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)
  const usernameUsed = useField('text')
  const passwordUsed = useField('password')

  useEffect(() => {
    blogService
      .getAll().then(initBlogs => {
        setBlogs(initBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage
      .getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    let username = usernameUsed.value
    let password = passwordUsed.value
    event.preventDefault()
    try {
      console.log('tuloste', usernameUsed.value, passwordUsed.value)
      const user = await loginServ.login({ username, password })
      console.log(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      console.log('user', user, 'username', user.username)
      usernameUsed.reset()
      passwordUsed.reset()
    } catch (exception) {

      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }


  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    window.localStorage.clear()
    setUser(null)

  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={usernameUsed}
            password={passwordUsed}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const bloglist = () => {

    const moreLikes = (a, b) => {
      if (a.likes < b.likes) return 1
      if (a.likes > b.likes) return -1
      return 0
    }
    blogs.sort(moreLikes)
    return (
      <div><h3>Blogs</h3>
        <p>{user.name} logged in</p>

        <button type="submit" onClick={handleLogOut}>logout</button>
        {blogForm()}

        <div className="list">
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              un={user.username}
            />
          )}
        </div></div>
    )
  }




  const blogForm = () => {
    const hideWhenVisible = { display: addblogVisible ? 'none' : '' }
    const showWhenVisible = { display: addblogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setAddblogVisible(true)}>add new</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            newBlog={newBlog}
            newAuthor={newAuthor}
            newUrl={newUrl}
            addBlog={addBlog}
          />
          <button onClick={() => setAddblogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObj = {
      title: newBlog.value,
      author: newAuthor.value,
      url: newUrl.value,
      likes: 0
    }

    blogService.create(blogObj)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        
        newBlog.reset()
        newAuthor.reset()
        newUrl.reset()
        setMessage(`A new blog '${blog.title}' was created by ${user.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

  }


  return (
    <div>
      <Notification message={errorMessage} />
      <Notification message={message} />
      {user === null ?
        <div>

          {loginForm()}
        </div>
        :
        <div>
          {user === null ? loginForm()
            : bloglist()}

        </div>
      }

      <div>
      </div>
    </div>
  )
}

export default App;
