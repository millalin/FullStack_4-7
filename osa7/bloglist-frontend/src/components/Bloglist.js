import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { Table } from 'react-bootstrap'

const blogList = (props) => {


  return (
    
    <div>
      <h2>Blogs</h2>
      <Table striped bordered hover>
        <tbody>
      {props.blogs.map(blog =>
         <Blog
          key={blog.id}
          blog={blog} 
        />

      )}
      
      </tbody>
      </Table>
    </div>
  )
}



const sortBlogs = ({ blogs }) => {
  
    const list = blogs
      
  return list
}

const mapStateToProps = (state) => {
  return {
    blogs: sortBlogs(state),

  }
}
const mapDispatchToProps = {

  setNotification,

initializeBlogs
}


const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(blogList)
export default ConnectedList