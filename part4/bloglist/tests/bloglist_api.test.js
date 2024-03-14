const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, malformedBlogs, initializeDb, blogsInDb, nonExistingId } = require('./bloglist_api_test_helper')
const { log } = require('node:console')

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
            const response = await superagent
                .post('/api/blogs')
                .send(malformedBlogs[1])
                .expect(400)

            const blogs = await blogsInDb()

            assert.strictEqual(blogs.length, initialBlogs.length)
        })

        test('fails if the note has not url', async () => {
            const response = await superagent
                .post('/api/blogs')
                .send(malformedBlogs[2])
                .expect(400)

            const blogs = await blogsInDb()

            assert.strictEqual(blogs.length, initialBlogs.length)
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })
})