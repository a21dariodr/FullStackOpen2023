import { useDispatch, useSelector } from 'react-redux'
import Notification from '../components/Notification'
import { setUsername, setPassword, setLoggedUser } from '../reducers/userReducer'
import { Box, Button, TextField, Typography } from '@mui/material'

const LoginForm = () => {
  const message = useSelector(({ notification }) => notification)
  const dispatch = useDispatch()

  const username = useSelector(({ user }) => user.username)
  const password = useSelector(({ user }) => user.password)

  const handleLogin = event => {
    event.preventDefault()
    dispatch(setLoggedUser(username, password))
  }

  return (
    <Box p={4}>
      <Typography variant="h2" align='center'>Bloglist app</Typography>
      <Box p={3} display={'flex'} justifyContent={'center'}>
        <form onSubmit={handleLogin}>
          <Typography variant="h4" align='center' p={2}>Log in to application</Typography>
          <Notification message={message} color={'red'} />
          <Box p={2} display={'flex'} justifyContent={'center'}>
            <TextField label="Username" InputLabelProps={{ shrink: true }} size="small" data-testid="username" type="text" value={username} onChange={({ target }) => dispatch(setUsername(target.value))} name="username" />
          </Box>
          <Box p={2} display={'flex'} justifyContent={'center'}>
            <TextField label="Password" InputLabelProps={{ shrink: true }} size="small" data-testid="password" type="password" value={password} onChange={({ target }) => dispatch(setPassword(target.value))} name="password" />
          </Box>
          <Box display={'flex'} justifyContent={'center'}>
            <Button variant="contained" color="primary" data-testid="submitButton" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default LoginForm
