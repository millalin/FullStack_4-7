const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response, next) => {
    try {const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

        response.json(blogs.map(b => b.toJSON()))
    
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
  
    const token = request.token

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        if (body.likes === '') {
            body.likes = 0
        }
        if (!body.title || !body.url) {
            return response.status(400).end()
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id,
        })


        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {

    try {

        const blog = await Blog.findById(request.params.id)
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id.toString()) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        else if (blog.user.toString() != decodedToken.id) {
            return response.status(401).json({ error: 'user does not have authorization' })
        }

        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }

})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    try {
        const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updated.toJSON())

    } catch (exception) {
        next(exception)
    }
    
  })




module.exports = blogsRouter