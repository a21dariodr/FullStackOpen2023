const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, malformedBlogs, initializeDb, blogsInDb, nonExistingId } = require('./bloglist_api_test_helper')

const superagent = supertest(app)

describe('Bloglist API testing', () => {
    beforeEach(async () => {
        await initializeDb()
    })

    describe('Obtention of blogs from the database', () => {
        test('returns them in JSON format', async () => {
            const blogs = await superagent
                .get('/api/blogs')
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
                .send(malformedBlogs[1])
                .expect(400)

            const blogs = await blogsInDb()

            assert.strictEqual(blogs.length, initialBlogs.length)
        })

        test('fails if the note has not url', async () => {
            await superagent
                .post('/api/blogs')
                .send(malformedBlogs[2])
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
                .send(blogToUpdate)
                .expect(200)

            blogs = await blogsInDb()

            assert.strictEqual(blogs.length, initialBlogs.length)

            const titles = blogs.map(blog => blog.title)
            assert(titles.includes('Modified title'))
        })

        test('does nothing and does not return an object if the id does not exist', async () => {
            let blogs = await blogsInDb()
            let blogToUpdate = blogs[0]
            
            const unexistingId = await nonExistingId()

            const response = await superagent
                .put(`/api/blogs/${unexistingId}`)
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
                .send(blogToUpdate)
                .expect(400)
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })
})