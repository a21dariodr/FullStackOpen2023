import { useState, useEffect, useRef } from 'react'
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

  const [newBlogTitle, setNewBlogTitle] = useState('') 
  const [newBlogAuthor, setNewBlogAuthor] = useState('') 
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [message, setMessage] = useState('')

  const ref = useRef()

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

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.createBlog({ title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl })
      setBlogs(blogs.concat(newBlog))
      setNewBlogAuthor('')
      setNewBlogTitle('')
      setNewBlogUrl('')

      ref.current.toggleVisibility()

      setMessage(`New blog "${newBlogTitle}" by ${newBlogAuthor} added`)
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

  const addBlogForm = () => (
    <div>
      <form onSubmit={handleCreateBlog}>
        <h2>Create blog</h2>
        <Notification message={message} color={'green'}/>
        <div>
          <span>Title </span>
          <input type='text' value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} name='newBlogTitle'/>
        </div>
        <div>
          <span>Author </span>
          <input type='text' value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} name='newBlogAuthor'/>
        </div>
        <div>
          <span>URL </span>
          <input type='text' value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} name='newBlogUrl'/>
        </div>
        <br/>
        <div>
          <button type='submit'>Save note</button>&nbsp;
          <button type='button' onClick={() => ref.current.toggleVisibility()}>Cancel</button>
        </div>
      </form>
    </div>
  )

  const loggedUserContent = () => (
    <>
      <Togglable buttonLabel="Add blog" ref={ref}>
        {addBlogForm()}
      </Togglable>
      {blogsList()}
    </>
  )

  return (
    <>
      <h1>Bloglist app</h1>
      {user
        ? loggedUserContent()
        : loginForm()
      }
    </>
  )
}

export default App