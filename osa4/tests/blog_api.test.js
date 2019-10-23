const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.list)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs field id is defined right', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('adding blog works right ', async () => {
    const newBlog = {
        title: 'Test Added',
        author: 'Milla',
        url: 'url',
        likes: 4,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const title = response.body.map(r => r.title)
  
    expect(response.body.length).toBe(helper.list.length + 1)
    expect(title).toContain(
        'Test Added'
    )
  })

  test('adding blog with no likes value, value is 0 ', async () => {
    const newBlog = {
        title: 'Test Added',
        author: 'Milla',
        url: 'url',
        likes: '',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    console.log(response.body)
  
    expect(response.body[3].likes).toBe(0)
    
  })

  test('fails with status code 400 when missing title and url', async () => {
    const newBlog = {
      author: 'Milla',
      likes: 102
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const total = await helper.blogsInDb()

    expect(total.length).toBe(helper.list.length)
  })

  test('blog is deleted', async () => {
    const first = await helper.blogsInDb()
    const blogDel = first[0]

    await api
      .delete(`/api/blogs/${blogDel.id}`)
      .expect(204)

    const after = await helper.blogsInDb()

    expect(after.length).toBe(
      helper.list.length - 1
    )

    const titles = after.map(r => r.title)

    expect(titles).not.toContain(blogDel.title)
  })


afterAll(() => {
  mongoose.connection.close()
})

