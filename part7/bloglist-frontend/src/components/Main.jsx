import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import Notification from '../components/Notification'
import Users from './Users'

const Main = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user.loggedUser)
  const message = useSelector(({ notification }) => notification)

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }

  return (
    <div>
      <Notification message={message} color={'green'} />
      {user.name} is logged in
      <br/><br/>
      <button onClick={handleLogout}>Logout</button>
      <Routes>
        <Route path='/' element={<Users/>} />
      </Routes>
    </div>
  )
}

export default Main