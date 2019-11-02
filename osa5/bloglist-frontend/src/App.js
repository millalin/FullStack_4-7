
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServ from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [showinfo, setShowInfo] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [addblogVisible, setAddblogVisible] = useState(false)


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServ.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
    } catch (exception) {
      setUsername('')
      setPassword('')
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  useEffect(() => {
    blogService
      .getAll().then(blogs => {
        setBlogs(blogs)
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



  const bloglist = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}

    />
  )


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
            title={newBlog}
            author={newAuthor}
            url={newUrl}
            handlenewblog={({ target }) => setNewBlog(target.value)}
            handlenewauthor={({ target }) => setNewAuthor(target.value)}
            handlenewurl={({ target }) => setNewUrl(target.value)}
            handleSubmit={addBlog}
          />
          <button onClick={() => setAddblogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObj = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }

    blogService.create(blogObj)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setNewBlog('')
        setNewAuthor('')
        setNewUrl('')
        setMessage(`A new blog '${blog.title}' was created by ${user.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    window.localStorage.clear()
    console.log('logattu ulos')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username <input type="text" value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password <input type="password" value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )



  return (
    <div>
      <Notification message={errorMessage} />
      <Notification message={message} />
      {user === null ?
        <div>
          <h3>Please log in</h3>
          {loginForm()}
        </div>
        :
        <div>
          <h3>Blogs</h3>
          <p>{user.name} logged in</p>
          <form onSubmit={handleLogOut}>
            <button type="submit">log out</button>
          </form>
          {blogForm()}
        </div>
      }
      {bloglist()}
      <div>
      </div>
    </div>
  )
}

export default App;
