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
    blog.comments = []

    const newBlog = await blog.save()

    user.blogs = user.blogs.concat(newBlog.id)
    await user.save()

    const newBlogPopulated = await Blog.findById(newBlog.id).populate('user', { username: 1, name: 1 })

    response.status(201).json(newBlogPopulated)
})

blogRouter.put('/:id', async (request, response) => {
  if (!request.token) return response.status(401).json({ error: 'token needed for deleting entries' })

  const id = request.params.id
  let { title, author, url, likes, user } = request.body

  if (!title || !author || !url) return response.status(400).end()

  if (!likes) likes = 0

  const updatedBlog = await Blog
    .findByIdAndUpdate(id,
      { title, author, url, likes, user: user.id },
      { new: true, runValidators: true, context: 'query' })
    .populate('user', { username: 1, name: 1 })

  response.json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  if (!request.token) return response.status(401).json({ error: 'token needed for deleting entries' })
  
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (!blog) return response.status(204).end()

  if (blog.user?.toString() !== user.id) return response.status(401).json({ error: 'only the owner can delete blogs' })

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

blogRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const id = request.params.id

  const blog = await Blog.findById(id)
  blog.comments.push(comment)
  await blog.save()

  response.json(blog)
})

module.exports = blogRouter