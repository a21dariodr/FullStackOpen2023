import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 

  useEffect(() => {
    const userJSON = localStorage.getItem('loggedUser')

    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      console.log('Logging in with', username, password)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch( exception) {
      console.log('Invalid username or password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        <span>Username </span>
        <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} name='username'/>
      </div>
      <div>
        <span>Password </span>
        <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} name='password'/>
      </div>
      <button type='submit'>Login</button>
    </form>
  )

  const blogsList = () => (
    <div>
      <h2>Blogs</h2>
      <div>{user.name} is logged in
        &nbsp;<button onClick={handleLogout}>Logout</button></div>
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
  )

  return (
    <>
      <h1>Bloglist app</h1>
      {user
        ? blogsList()
        : loginForm()
      }
    </>
  )
}

export default App