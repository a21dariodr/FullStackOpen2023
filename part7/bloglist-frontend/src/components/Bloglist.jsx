import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import blogService from './services/blogs'
import Blog from './Blog'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'

const Bloglist = () => {
  const user = useSelector(({ user }) => user.loggedUser)
  const togglableRef = useRef()

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

  return (
    <div id="blogs">
      <h2>Blogs</h2>
      <Togglable buttonLabel="Add blog" ref={togglableRef}>
        <AddBlogForm togglableRef={togglableRef} />
      </Togglable>
      <br />
      <div>
        {blogs.isLoading
          ? <p>Loading blogs</p>
          : blogs.isError
            ? <p>Error while loading blogs: {blogs.error.message}</p>
            : blogs.data.map(blog => <Blog key={blog.id} blog={blog} />)
        }
      </div>
    </div>
  )
}

export default Bloglist