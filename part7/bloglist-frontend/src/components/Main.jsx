import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import Bloglist from './Bloglist'
import Notification from '../components/Notification'
import Topbar from './Topbar'
import Users from './Users'
import User from './User'

const Main = () => {
  const notificationMessage = useSelector(({ notification }) => notification)

  return (
    <div>
      <Topbar/>
      <h1>Bloglist app</h1>
      <Notification message={notificationMessage} color={'green'} />
      <Routes>
        <Route path='/' element={<Bloglist/>} />
        <Route path='/blogs/:id' element={<Blog/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/users/:id' element={<User/>} />
      </Routes>
    </div>
  )
}

export default Main