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
})

after(async () => {
    await mongoose.connection.close()
})