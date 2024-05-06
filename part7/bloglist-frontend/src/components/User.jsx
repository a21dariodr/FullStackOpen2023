import { useMatch } from 'react-router-dom'
import { useUsers } from '../services/users'
import { useBlogs } from '../services/blogs'

const User = () => {
  const userId = useMatch('/users/:id').params.id
  const users = useUsers()
  const blogs = useBlogs()

  if (users.isLoading || blogs.isLoading)
    return (<p>Loading data...</p>)

  const user =  users.data.find(user => user.id === userId)
  const userBlogs = blogs.data.filter(blog => blog.user.id === user.id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {userBlogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User