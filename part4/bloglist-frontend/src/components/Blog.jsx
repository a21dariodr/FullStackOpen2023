import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 8,
    paddingBottom: 6,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    blog.likes += 1
    updateBlog(blog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide details' : 'Show details'}</button>
      {showDetails
        ? (
          <>
            <br/><br/>
            URL: {blog.url}<br/>
            Likes: {blog.likes} <button onClick={handleLike}>Like</button><br/>
            User: {blog.user.name}<br/>
          </>
        )
        : ''
      }
    </div>  
  )
}

export default Blog