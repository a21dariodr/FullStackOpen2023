const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const extractToken = request => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer '))
    return authorization.replace('Bearer ', '')
  
  return null
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) return response.status(400).end()

    if (!blog.likes) blog.likes = 0

    const decodedToken = jwt.verify(extractToken(request), process.env.SECRET)
    if (!decodedToken.id) return response.status(401).json({ error: 'invalid token' })
    const user = await User.findById(decodedToken.id)

    console.log(decodedToken);
    console.log(user);

    blog.user = user.id

    const newBlog = await blog.save()

    user.blogs = user.blogs.concat(newBlog.id)
    await user.save()

    response.status(201).json(newBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { title, author, url, likes } = request.body

  if (!title || !author || !url) return response.status(400).end()

  if (!likes) likes = 0

  const updatedBlog = await Blog.findByIdAndUpdate(id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' })

  response.json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

module.exports = blogRouter