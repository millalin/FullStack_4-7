const Blog = require('../models/blog')

const list = [
    {
        
        title: 'One',
        author: 'Peter',
        url: 'url1',
        likes: 5,
        
    },
    {
        
        title: 'Two',
        author: 'O.O',
        url: 'url2',
        likes: 6,
        
    },
    {
        
        title: 'Three',
        author: 'Peter',
        url: 'url3',
        likes: 4,
        
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'removable' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  list, nonExistingId, blogsInDb
}