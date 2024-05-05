import { useEffect, useRef } from 'react'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { setUser } from './reducers/userReducer'

const App = () => {
  const message = useSelector(({ notification }) => notification)
  const user = useSelector(({ user }) => user.loggedUser)
  const dispatch = useDispatch()
  const togglableRef = useRef()

  useEffect(() => {
    const userJSON = localStorage.getItem('loggedUser')
    if (userJSON) {
      const storagedUser = JSON.parse(userJSON)
      dispatch(setUser(storagedUser))
      blogService.setToken(storagedUser.token)
    }
  }, [dispatch])

  const getBlogs = async () => {
    const blogsData = await blogService.getAll()
    return blogService.sortBlogsByLikes(blogsData)
  }

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    enabled: !!user,
    retry: 1
  })

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }

  const blogsList = () => (
    <div id="blogs">
      <h2>Blogs</h2>
      <div>
        {user.name} is logged in &nbsp;<button onClick={handleLogout}>Logout</button>
      </div>
      <br />
      <div>{blogs.isLoading ? <p>Loading blogs</p> : blogs.isError ? <p>Error while loading blogs: {blogs.error.message}</p> : blogs.data.map(blog => <Blog key={blog.id} blog={blog} />)}</div>
    </div>
  )

  const loggedUserContent = () => (
    <>
      <Togglable buttonLabel="Add blog" ref={togglableRef}>
        <AddBlogForm togglableRef={togglableRef} />
      </Togglable>
      <Notification message={message} color={'green'} />
      {blogsList()}
    </>
  )

  return (
    <>
      <h1>Bloglist app</h1>
      {user ? loggedUserContent() : (<LoginForm />)}
    </>
  )
}

export default App
