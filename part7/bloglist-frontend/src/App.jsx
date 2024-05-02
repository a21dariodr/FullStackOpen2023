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
      blogService.getAll().then(blogs => {
        setBlogs(sortBlogsByLikes(blogs))
      })
    }
  }, [user])

  const sortBlogsByLikes = blogs => blogs.sort((a, b) => b.likes - a.likes)

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      console.log('Logging in with', username, password)
      blogService.setToken(user.token)
      localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
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

  const createBlog = async newBlog => {
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

  const updateBlog = async modifiedBlog => {
    try {
      await blogService.updateBlog(modifiedBlog)
      const filteredBlogs = blogs.filter(blog => blog.id !== modifiedBlog.id)
      setBlogs(sortBlogsByLikes(filteredBlogs.concat(modifiedBlog)))
    } catch (exception) {
      console.log('Error when updating the blog')
    }
  }

  const deleteBlog = async blogToDelete => {
    try {
      await blogService.deleteBlog(blogToDelete)
      const filteredBlogs = blogs.filter(blog => blog.id !== blogToDelete.id)
      setBlogs(sortBlogsByLikes(filteredBlogs))
    } catch (exception) {
      console.log('Error when deleting the blog')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <Notification message={message} color={'red'} />
      <div>
        <span>Username </span>
        <input data-testid="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} name="username" />
      </div>
      <div>
        <span>Password </span>
        <input data-testid="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} name="password" />
      </div>
      <br />
      <button data-testid="submitButton" type="submit">
        Login
      </button>
    </form>
  )

  const blogsList = () => (
    <div id="blogs">
      <h2>Blogs</h2>
      <div>
        {user.name} is logged in &nbsp;<button onClick={handleLogout}>Logout</button>
      </div>
      <br />
      <div>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        ))}
      </div>
    </div>
  )

  const loggedUserContent = () => (
    <>
      <Togglable buttonLabel="Add blog" ref={togglableRef}>
        <AddBlogForm createBlog={createBlog} togglableRef={togglableRef} />
      </Togglable>
      <Notification message={message} color={'green'} />
      {blogsList()}
    </>
  )

  return (
    <>
      <h1>Bloglist app</h1>
      {user ? loggedUserContent() : loginForm()}
    </>
  )
}

export default App
