import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useMatch } from 'react-router-dom'

const Blog = () => {
  const queryClient = useQueryClient()
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
    paddingLeft: 8,
    paddingBottom: 6,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5
  }

  const removeButtonStyle = {
    color: 'white',
    backgroundColor: 'navy',
    border: 'none',
    padding: 4,
    marginTop: 6
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
      <h2>
        <span className="blogTitle">{blog.title}</span> - <span className="blogAuthor">{blog.author}</span>
      </h2>

      <a href={blog.url} className="blogUrl">URL: {blog.url}</a>
      <br />
      <span className="blogLikes">{blog.likes} likes </span> <button onClick={handleLike}>Like</button>
      <br />
      <span className="blogUser">Added by {blog.user.name}</span>
      <br />
      {user.username === blog.user.username ? (
        <button style={removeButtonStyle} onClick={handleRemove}>
          Remove
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default Blog
