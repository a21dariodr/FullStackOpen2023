import { useDispatch, useSelector } from 'react-redux'
import Notification from '../components/Notification'
import { setUsername, setPassword, setLoggedUser } from '../reducers/userReducer'

const LoginForm = () => {
  const message = useSelector( ({ notification }) => notification)
  const dispatch = useDispatch()

  const username = useSelector(({ user }) => user.username)
  const password = useSelector(({ user }) => user.password)

  const handleLogin = event => {
    event.preventDefault()
    dispatch(setLoggedUser(username, password))
  }

  return (
    <div>
      <h1>Bloglist app</h1>
      <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <Notification message={message} color={'red'} />
        <div>
          <span>Username </span>
          <input data-testid="username" type="text" value={username} onChange={({ target }) => dispatch(setUsername(target.value))} name="username" />
        </div>
        <div>
          <span>Password </span>
          <input data-testid="password" type="password" value={password} onChange={({ target }) => dispatch(setPassword(target.value))} name="password" />
        </div>
        <br />
        <button data-testid="submitButton" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm