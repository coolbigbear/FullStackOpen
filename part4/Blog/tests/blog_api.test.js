const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: "WOW1",
        author: "A1",
        url: "URL1",
        likes: 1
    },
    {
        title: "WOW2",
        author: "A2",
        url: "URL2",
        likes: 2
    },
    {
        title: "WOW3",
        author: "A3",
        url: "URL3",
        likes: 3
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
}, 10000)

describe('when database contains prefilled data', () => {

    test('correct number of blogs is returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('add a new note and make sure it is saved correctly', async () => {
        // Create new note
        blog = {title:"newTitle", author:"newAuthor", url:"newURL", likes: 4}
        response = await api.post('/api/blogs').send(blog)
        newBlogID = response.body.id
        blog.id = newBlogID

        //Check if note is the same as the one sent
        response = await api.get(`/api/blogs`)
        expect(response.body[initialBlogs.length]).toEqual(blog)
    })

    test('note uses "id" instead of "_id"', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('if likes property is missing from POST request it will default to 0', async () => {
        blog = { title: "newTitle", author: "newAuthor", url: "newURL" }
        response = await api.post('/api/blogs').send(blog)

        //Check if note is the same as the one sent
        response = await api.get(`/api/blogs`)
        expect(response.body[initialBlogs.length].likes).toEqual(0)
    })

    test('if title or url is missing from POST request it will return 400', async () => {
        blog = { author: "newAuthor", likes: 5 }
        response = await api.post('/api/blogs').send(blog).expect(400)
    },10000)

})

afterAll(async () => {
    await mongoose.connection.close()
})