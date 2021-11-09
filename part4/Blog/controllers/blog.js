const BlogRouter = require('express').Router()
const Blog = require('../models/Blog')

BlogRouter.get('/', async (request, response) => {
    blogs = await Blog.find({})
    return response.json(blogs)
})

BlogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    result = await blog.save()
    response.status(201).json(result)
    
})

module.exports = BlogRouter
