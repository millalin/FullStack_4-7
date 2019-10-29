const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'test', password: 'secret' })
    await user.save()
  })

 test('creation fails if username already taken', async () => {
    
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'test',
      name: 'user',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect("{error: 'username must be unique'}"
    )

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  
  })

  test('password must be atleast 3 chars long', async () => {
    
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'test',
      name: 'user',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect("{error: 'password and username length must be atleast 3'}"
    )

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  
  })

  test('username must be atleast 3 chars long', async () => {
    
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'te',
      name: 'user',
      password: 'salasana',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect("{error: 'password and username length must be atleast 3'}"
    )

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  
  })

  test('username must exist', async () => {
    
    const usersAtStart = await usersInDb()

    const newUser = {
      username: '',
      name: 'user',
      password: 'salasana',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect("{error: 'fill username and password'}"
    )

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  
  })

  test('password must exist', async () => {
    
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'user',
      name: 'user',
      password: '',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect("{error: 'fill username and password'}"
    )

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  
  })

  afterAll(() => {
    mongoose.connection.close()
  })