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
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import UserList from './components/UserList'
import { Table, Form, Button } from 'react-bootstrap'
import {Navbar, Nav, NavItem} from 'react-bootstrap';

const App = (props) => {

  const padding = { padding: 5 }

  const [username] = useField('text')
  const [password] = useField('password')
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
   
    setNotification(message)

  }


  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Group>
          <div>
            <Form.Label> käyttäjätunnus</Form.Label>
            <Form.Control {...username} /> 
            
          </div>
          <div>
          <Form.Label> salasana</Form.Label>
            <Form.Control {...password} /> 
   
          </div>
          <Button variant="info" type="submit">kirjaudu</Button>
       </Form.Group>
        </Form>
      </div>
    )
  }


  return (
    <div class="container">
 

      <Notification />


      <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">

          <div>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/blogs">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">Users</Link>
            </Nav.Link>
          </div>

          
    </Nav>
  </Navbar.Collapse>
</Navbar>

          <h2>Blog app</h2>
          <div>  <p>{user.name} logged in</p>
      <Button variant="info" onClick={handleLogout}>logout</Button>
          <Route path="/blogs" render={() => 
          <div>
          <Togglable buttonLabel='create new' ref={newBlog}>
          <NewBlog />
        </Togglable>
          <BlogList />
          </div>} />
          <Route path="/users" render={() => <UserList />} />
        </div>
      </Router>







    </div>
  )
}

export default connect(null, { setNotification, clearNotification, initializeBlogs })(App)