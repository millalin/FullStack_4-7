import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <p>Title: {blog.title}</p>  
    <p>Author: {blog.author}  </p>
    <p>Url: {blog.url} </p>
    <br></br>
  </div>
)

export default Blog