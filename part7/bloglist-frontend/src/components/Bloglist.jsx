import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useBlogs } from '../services/blogs'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import BookIcon from '@mui/icons-material/Book'

const Bloglist = () => {
  const togglableRef = useRef()
  const blogs = useBlogs()

  const linkStyle = {
    textDecoration: 'none',
    color: 'blue'
  }

  return (
    <div id="blogs">
      <Typography variant="h4" align="center" paddingTop={2}>
        Blogs
      </Typography>
      <Togglable buttonLabel="Add blog" ref={togglableRef}>
        <AddBlogForm togglableRef={togglableRef} />
      </Togglable>
      <div>
        {blogs.isLoading ? (
          <p>Loading blogs</p>
        ) : blogs.isError ? (
          <p>Error while loading blogs: {blogs.error.message}</p>
        ) : (
          <List>
            {blogs.data.map(blog => (
              <ListItem key={blog.id}>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to={`/blogs/${blog.id}`} style={linkStyle}>
                    {blog.title}
                  </Link>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  )
}

export default Bloglist
