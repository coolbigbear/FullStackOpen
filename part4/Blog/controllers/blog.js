const BlogRouter = require('express').Router()
const Blog = require('../models/Blog')

BlogRouter.get('/', async (request, response) => {
    blogs = await Blog.find({})
    return response.json(blogs)
})

BlogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    result = await blog.save()
    response.status(201).json(result)    
})

BlogRouter.put('/:id', async (request, response, next) => {
    result = await Blog.findOneAndUpdate(request.params.id, request.body, { new: true })
    response.status(200).json(result)
})

BlogRouter.delete('/:id', async (request, response, next) => {
    result = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = BlogRouter
