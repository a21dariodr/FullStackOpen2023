import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const Topbar = () => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('loggedUser'))

  const padding = {
    padding: 7
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }

  return (
    <div style={{ ...padding, backgroundColor: 'lightgray' }}>
      <Link to='/' style={padding}><strong>Blogs</strong></Link>
      <Link to='/users' style={padding}><strong>Users</strong></Link>
      <span  style={padding}>{user.name} logged in</span>
      <span  style={padding}><button onClick={handleLogout}>Logout</button></span>
    </div>
  )
}

export default Topbar