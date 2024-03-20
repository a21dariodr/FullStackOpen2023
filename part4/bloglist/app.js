const { MONGODB_URI } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const cors = require('cors')
const logger = require('./utils/logger')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app