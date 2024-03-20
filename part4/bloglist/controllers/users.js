const usersRouter = require('express'). Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { name, username, password } = request.body

    if (!password)
        return response.status(400).json({
            error: 'password is required'
        })

    if (password.length < 3)
        return response.status(400).json({
            error: 'password has to be at least 3 characters long'
        })

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({ name, username, password: passwordHash })
    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter