import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { AppBar, Button, Toolbar } from '@mui/material'

const Topbar = () => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('loggedUser'))

  const padding = {
    padding: 20
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    padding: 10
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit">
          <Link to='/' style={linkStyle}><strong>Blogs</strong></Link>
        </Button>
        <Button color="inherit" sx={{ mr: 8 }}>
          <Link to='/users' style={linkStyle}><strong>Users</strong></Link>
        </Button>
        <span style={padding}>{user.name} logged in</span>
        <span style={padding}><button onClick={handleLogout}>Logout</button></span>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
