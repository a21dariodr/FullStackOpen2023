import { Link } from 'react-router-dom'
import { useUsers } from '../services/users'
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Typography, Paper } from '@mui/material'

const Users = () => {
  const users = useUsers()

  return (
    <>
      <Typography variant="h4" align='center' p={2}>Users</Typography>
      {users.isLoading ? (
        <p>Loading users</p>
      ) : users.isError ? (
        <p>Error while loading users: {users.error.message}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>Blogs created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.data.map(user => (
                <TableRow key={user.username}>
                  <TableCell align="center">
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell align="center">{user.blogs.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default Users
