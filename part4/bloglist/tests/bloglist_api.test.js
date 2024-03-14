const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, initializeDb, blogsInDb, nonExistingId } = require('./bloglist_api_test_helper')

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
            const newBlog = await superagent
                .post('/api/blogs')
                .send(initialBlogs[0])
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            assert.strictEqual(newBlog.content, initialBlogs[0].content)

            const blogs = await blogsInDb()

            assert.strictEqual(blogs.length, initialBlogs.length + 1)
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })
})