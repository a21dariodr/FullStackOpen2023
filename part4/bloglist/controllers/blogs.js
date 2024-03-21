const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) return response.status(400).end()

    if (!blog.likes) blog.likes = 0

    const users = await User.find({})
    blog.user = users[0].id

    const newBlog = await blog.save()

    users[0].blogs = users[0].blogs.concat(newBlog.id)
    await users[0].save()

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