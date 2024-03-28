import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 8,
    paddingBottom: 6,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async () => {
    currentBlog.likes += 1
    const updatedBlog = await blogService.updateBlog(currentBlog)
    setCurrentBlog(updatedBlog)
  }

  return (
    <div style={blogStyle}>
      {currentBlog.title} - {currentBlog.author} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide details' : 'Show details'}</button>
      {showDetails
        ? (
          <>
            <br/><br/>
            URL: {currentBlog.url}<br/>
            Likes: {currentBlog.likes} <button onClick={handleLike}>Like</button><br/>
            User: {currentBlog.user.name}<br/>
          </>
        )
        : ''
      }
    </div>  
  )
}

export default Blog