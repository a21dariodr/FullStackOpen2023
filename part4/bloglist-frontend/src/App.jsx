import { useState, useEffect, useRef } from 'react'
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState('')

  const togglableRef = useRef()

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
      localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log('Invalid username or password')

      setMessage('Invalid username or password')
      setTimeout(() => {
        setMessage('')
      }, 6000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.createBlog({ title: newBlog.title, author: newBlog.author, url: newBlog.url })
      setBlogs(blogs.concat(createdBlog))
      
      togglableRef.current.toggleVisibility()

      setMessage(`New blog "${createdBlog.title}" by ${createdBlog.author} added`)
      setTimeout(() => {
        setMessage('')
      }, 6000)
    } catch (exception) {
      console.log('Error when creating new blog')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <Notification message={message} color={'red'}/>
      <div>
        <span>Username </span>
        <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} name='username'/>
      </div>
      <div>
        <span>Password </span>
        <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} name='password'/>
      </div>
      <br/>
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

  const loggedUserContent = () => (
    <>
      <Togglable buttonLabel="Add blog" ref={togglableRef}>
        <AddBlogForm createBlog={createBlog} togglableRef={togglableRef}/>
      </Togglable>
      {blogsList()}
    </>
  )

  return (
    <>
      <h1>Bloglist app</h1>
      <Notification message={message} color={'green'}/>
      {user
        ? loggedUserContent()
        : loginForm()
      }
    </>
  )
}

export default App