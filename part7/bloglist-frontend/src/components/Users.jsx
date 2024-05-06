import { Link } from 'react-router-dom'
import { useUsers } from '../services/users'

const Users = () => {
  const users = useUsers()

  return (
    <>
      <h2>Users</h2>
      {users.isLoading ? (
        <p>Loading users</p>
      ) : users.isError ? (
        <p>Error while loading users: {users.error.message}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map(user => {
              return (
                <tr key={user.username}>
                  <td>
                    <Link to={`/users/${user.id}`}>
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users
