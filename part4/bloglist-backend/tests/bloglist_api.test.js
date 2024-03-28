const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const { PORT } = require('../utils/config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../app')
const { initialBlogs, userForTests, malformedBlogs, initializeDb, blogsInDb, nonExistingId } = require('./bloglist_api_test_helper')

const server = app.listen(PORT, () => {})
const superagent = supertest(app)

let authorization;

describe('Bloglist API testing', () => {
    beforeEach(async () => {
        await initializeDb()

        const user = await userForTests()

        const userForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        authorization = `Bearer ${token}`
    })

    describe('Obtention of blogs from the database', () => {
        test('returns them in JSON format', async () => {
            const blogs = await superagent
                .get('/api/blogs')
                .set({ Authorization: authorization })
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.strictEqual(blogs.body.length, initialBlogs.length)
        })
    })

    describe('Checking blogs properties', () => {
        test('blogs have id property but no _id', async () => {
            const blogs = await blogsInDb()

            assert(blogs[0].hasOwnProperty('id'))
            assert(!blogs[0].hasOwnProperty('_id'))
        })
    })

    describe('Creating new blogs', () => {
        test('succeeds if the request is correct', async () => {
            const response = await superagent
                .post('/api/blogs')
                .set({ Authorization: authorization })
                .send(initialBlogs[0])
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const newBlog = JSON.parse(response.text)
            
            assert.strictEqual(newBlog.title, initialBlogs[0].title)

            const blogs = await blogsInDb()

            assert.strictEqual(blogs.length, initialBlogs.length + 1)
        })

        test('sets likes to 0 if not specified', async () => {
            const response = await superagent
                .post('/api/blogs')
                .set({ Authorization: authorization })
                .send(malformedBlogs[0])
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogWithoutLikes = JSON.parse(response.text)

            assert.strictEqual(blogWithoutLikes.title, 'Test without likes count')
            assert.strictEqual(blogWithoutLikes.likes, 0)
        })

        test('fails if the note has not title', async () => {
            await superagent
                .post('/api/blogs')
                .set({ Authorization: authorization })
                .send(malformedBlogs[1])
                .expect(400)

            const blogs = await blogsInDb()

            assert.strictEqual(blogs.length, initialBlogs.length)
        })

        test('fails if the note has not url', async () => {
            await superagent
                .post('/api/blogs')
                .set({ Authorization: authorization })
                .send(malformedBlogs[2])
                .expect(400)

            const blogs = await blogsInDb()

            assert.strictEqual(blogs.length, initialBlogs.length)
        })

        test('fails if no token is provided', async () => {
            await superagent
                .post('/api/blogs')
                .send(initialBlogs[0])
                .expect(400)

            const blogs = await blogsInDb()

            assert.strictEqual(blogs.length, initialBlogs.length)
        })
    })

    describe('Deleting a blog', () => {
        test('succeeds if the id exists', async () => {
            let blogs = await blogsInDb()
            let blogToDelete = blogs[0]

            await superagent
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set({ Authorization: authorization })
                .expect(204)

            blogs = await blogsInDb()

            assert.strictEqual(blogs.length, initialBlogs.length - 1)

            const titles = blogs.map(blog => blog.title)
            assert(!titles.includes(blogToDelete.title))
        })

        test('does nothing if the id does not exist', async () => {
            const unexistingId = await nonExistingId()

            await superagent
                .delete(`/api/blogs/${unexistingId}`)
                .set({ Authorization: authorization })
                .expect(204)

            const blogs = await blogsInDb()

            assert.strictEqual(blogs.length, initialBlogs.length)
        })
    })

    describe('Updating a blog', () => {
        test('succeeds if correct values are provided', async () => {
            let blogs = await blogsInDb()
            let blogToUpdate = blogs[0]
            blogToUpdate.title = 'Modified title'

            await superagent
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set({ Authorization: authorization })
                .send(blogToUpdate)
                .expect(200)

            blogs = await blogsInDb()

            assert.strictEqual(blogs.length, initialBlogs.length)

            const titles = blogs.map(blog => blog.title)
            assert(titles.includes('Modified title'))
        })

        test('does nothing if id does not exist', async () => {
            let blogs = await blogsInDb()
            let blogToUpdate = blogs[0]
            
            const unexistingId = await nonExistingId()

            const response = await superagent
                .put(`/api/blogs/${unexistingId}`)
                .set({ Authorization: authorization })
                .send(blogToUpdate)
                .expect(200)

            const updatedBlog = JSON.parse(response.text)
            
            assert(!updatedBlog)
        })

        test('fails if no title is provided', async () => {
            let blogs = await blogsInDb()
            let blogToUpdate = blogs[0]
            delete blogToUpdate.title

            await superagent
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set({ Authorization: authorization })
                .send(blogToUpdate)
                .expect(400)
        })
    })

    after(async () => {
        await mongoose.connection.close()
        server.close()
    })
})