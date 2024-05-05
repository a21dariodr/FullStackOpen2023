import { useQuery } from '@tanstack/react-query'
import usersService from '../services/users'

const Users = () => {
  const getUsers = async () => {
    const usersData = await usersService.getAllUsers()
    return usersService.sortUsersByName(usersData)
  }

  const users = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: 1
  })

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
                  <td>{user.name}</td>
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
