const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { usersInDb } = require('./users_api_test_helper')

const superagent = supertest(app)

describe('Bloglist API testing', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('secretstring', 10)
        const user = new User({ username: 'root', passwordHash })
        
        await user.save()
    })

    test('Creation succeeds with new username', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'mrt32',
            name: 'Martin Freeman',
            password: 'martin',
        }

        await superagent
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })

    test('Creation fails if username already taken', async () => {
        const usersAtStart = await usersInDb()
    
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'easypass',
        }
    
        const result = await superagent
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    after(async () => {
        await mongoose.connection.close()
    })
})