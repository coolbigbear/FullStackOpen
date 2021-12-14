const BlogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const middleware = require('../utils/middleware')

BlogRouter.get('/', async (request, response) => {
    blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    return response.json(blogs)
})

BlogRouter.post('/', middleware.middlewareExtractor, async (request, response, next) => {
    
    const user = await User.findById(request.user.id)
    const blog = new Blog(request.body)

    blog.user = user.id

    result = await blog.save()
    result = result.toJSON()

    user.blogs = user.blogs.concat(result.id)
    await user.save()

    response.status(201).json(result)    
})

BlogRouter.put('/:id', middleware.middlewareExtractor, async (request, response, next) => {

    blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === request.user.id) {
        result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    }
    response.status(200).json(result)

    // result = await Blog.findOneAndUpdate(request.params.id, request.body, { new: true })
    // response.status(200).json(result)
})

BlogRouter.delete('/:id', middleware.middlewareExtractor, async (request, response, next) => {

    blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === request.user.id) {
        result = await Blog.findByIdAndRemove(request.params.id)
    }
    response.status(204).end()
})

module.exports = BlogRouter
