const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) return response.status(400).end()

    if (!blog.likes) blog.likes = 0

    const user = request.user

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
  if (!request.token) return response.status(401).json({ error: 'token needed for deleting entries' })
  
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog.user?.toString() !== user.id) return response.status(401).json({ error: 'only the owner can delete blogs' })

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

module.exports = blogRouter