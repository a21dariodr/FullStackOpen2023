import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import Notification from '../components/Notification'
import Users from './Users'
import User from './User'

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
        <Route path='/users/:id' element={<User/>} />
      </Routes>
    </div>
  )
}

export default Main