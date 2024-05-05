import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Main from './components/Main'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user.loggedUser)

  useEffect(() => {
    const userJSON = localStorage.getItem('loggedUser')
    if (userJSON) {
      const storagedUser = JSON.parse(userJSON)
      dispatch(setUser(storagedUser))
      blogService.setToken(storagedUser.token)
    }
  }, [dispatch])

  return (
    <>
      <h1>Bloglist app</h1>
      {user ? <Main/> : <LoginForm />}
    </>
  )
}

export default App