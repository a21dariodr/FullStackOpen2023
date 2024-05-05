import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const queryClient = useQueryClient()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 8,
    paddingBottom: 6,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    color: 'white',
    backgroundColor: 'navy',
    border: 'none',
    padding: 4,
    marginTop: 6
  }

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
      const blogs = queryClient.getQueryData(['blogs'])
      const filteredBlogs = blogs.filter(blog => blog.id !== deletedBlog.id)
      queryClient.setQueryData(['blogs'], blogService.sortBlogsByLikes(filteredBlogs))
    },
    onError: () => console.log('Error when deleting the blog')
  })

  const handleLike = () => {
    blog.likes += 1
    likeBlogMutation.mutate(blog)
  }

  const handleRemove = () => {
    if (window.confirm(`Blog "${blog.title}" by ${blog.author} is about to be deleted!`)) deleteBlogMutation.mutate(blog)
  }

  return (
    <div className="blog" style={blogStyle}>
      <span className="blogTitle">{blog.title}</span> - <span className="blogAuthor">{blog.author}</span>&nbsp;
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide details' : 'Show details'}</button>
      {showDetails ? (
        <>
          <br />
          <br />
          <span className="blogUrl">URL: {blog.url}</span>
          <br />
          <span className="blogLikes">Likes: {blog.likes}</span> <button onClick={handleLike}>Like</button>
          <br />
          <span className="blogUser">User: {blog.user.name}</span>
          <br />
          {user.username === blog.user.username ? (
            <button style={removeButtonStyle} onClick={handleRemove}>
              Remove
            </button>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
