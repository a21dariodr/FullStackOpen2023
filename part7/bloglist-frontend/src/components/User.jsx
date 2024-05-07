import { Link, useMatch } from 'react-router-dom'
import { useUsers } from '../services/users'
import { useBlogs } from '../services/blogs'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import BookIcon from '@mui/icons-material/Book'

const User = () => {
  const userId = useMatch('/users/:id').params.id
  const users = useUsers()
  const blogs = useBlogs()

  if (users.isLoading || blogs.isLoading) return <p>Loading data...</p>

  const user = users.data.find(user => user.id === userId)
  const userBlogs = blogs.data.filter(blog => blog.user.id === user.id)

  const linkStyle = {
    textDecoration: 'none',
    color: 'blue'
  }

  return (
    <div>
      <Typography variant="h4" paddingTop={2}>{user.name}</Typography>
      <Typography variant="h5" align="center" paddingTop={2}>Added blogs</Typography>
      <List>
        {userBlogs.map(blog => (
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
    </div>
  )
}

export default User
