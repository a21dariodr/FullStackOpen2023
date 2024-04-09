import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 8,
    paddingBottom: 6,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeButtonStyle = {
    color: 'white',
    backgroundColor: 'navy',
    border: 'none',
    padding: 4,
    marginTop: 6
  }

  const user = JSON.parse(localStorage.getItem('loggedUser'))

  const handleLike = () => {
    blog.likes += 1
    updateBlog(blog)
  }

  const handleRemove = () => {
    if (window.confirm(`Blog "${blog.title}" by ${blog.author} is about to be deleted!`))
      deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <span className='blogTitle'>{blog.title}</span> - <span className='blogAuthor'>{blog.author}</span>&nbsp;
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide details' : 'Show details'}</button>
      {showDetails
        ? (
          <>
            <br/><br/>
            <span className='blogUrl'>URL: {blog.url}</span><br/>
            <span className='blogLikes'>Likes: {blog.likes}</span> <button onClick={handleLike}>Like</button><br/>
            <span className='blogUser'>User: {blog.user.name}</span><br/>
            {user.username === blog.user.username
              ? (<button style={removeButtonStyle} onClick={handleRemove}>Remove</button>)
              : ''
            }
          </>
        )
        : ''
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog