import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 8,
    paddingBottom: 6,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide details' : 'Show details'}</button>
      {showDetails
        ? (
          <>
            <br/><br/>
            URL: {blog.url}<br/>
            Likes: {blog.likes} <button>Like</button><br/>
            User: {blog.user.name}<br/>
          </>
        )
        : ''
      }
    </div>  
  )
}

export default Blog