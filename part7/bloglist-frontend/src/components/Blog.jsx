import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useMatch, useNavigate } from 'react-router-dom'
import CommentBlogForm from './AddCommentForm'
import { Box, Button, Typography } from '@mui/material'

const Blog = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const blogId = useMatch('/blogs/:id').params.id
  const blogs = blogService.useBlogs()
  const user = JSON.parse(localStorage.getItem('loggedUser'))

  const likeBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: updatedBlog => {
      const blogs = queryClient.getQueryData(['blogs'])
      const filteredBlogs = blogs.filter(blog => blog.id !== updatedBlog.id)
      queryClient.setQueryData(['blogs'], blogService.sortBlogsByLikes(filteredBlogs.concat(updatedBlog)))
    },
    onError: () => console.log('Error when updating the blog')
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: deletedBlog => {
      navigate('/')
      const blogs = queryClient.getQueryData(['blogs'])
      const filteredBlogs = blogs.filter(blog => blog.id !== deletedBlog.id)
      queryClient.setQueryData(['blogs'], blogService.sortBlogsByLikes(filteredBlogs))
    },
    onError: () => console.log('Error when deleting the blog')
  })

  if (blogs.isLoading)
    return (<p>Loading blogs...</p>)

  const blog = blogs.data.find(blog => blog.id === blogId)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 6,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'blue'
  }

  const handleLike = () => {
    blog.likes += 1
    likeBlogMutation.mutate(blog)
  }

  const handleRemove = () => {
    if (window.confirm(`Blog "${blog.title}" by ${blog.author} is about to be deleted!`)) deleteBlogMutation.mutate(blog)
  }

  return (
    <div className="blog" style={blogStyle}>
      <Typography variant="h4" align='center' p={3}>
        <span className="blogTitle">{blog.title}</span> - <span className="blogAuthor">{blog.author}</span>
      </Typography>

      <Box p>
        <a href={blog.url} target='_blank' rel='noreferrer' className="blogUrl" style={linkStyle}>URL: {blog.url}</a>
      </Box>
      <Box p>
        <span className="blogLikes">{blog.likes} likes </span> <button onClick={handleLike}>Like</button>
      </Box>
      <Box p>
        <span className="blogUser">Added by {blog.user.name}</span>
      </Box>
      {user.username === blog.user.username ? (
        <Box p={2}>
          <Button variant="contained" color="secondary" size='small' onClick={handleRemove}>
            Remove
          </Button>
        </Box>
      ) : (
        ''
      )}
      <Typography variant="h5" paddingBlock={2}>Comments</Typography>
      <CommentBlogForm blogId={blog.id}/>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
