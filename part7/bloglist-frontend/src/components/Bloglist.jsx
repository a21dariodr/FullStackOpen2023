import { useRef } from 'react'
import { useBlogs } from '../services/blogs'
import Blog from './Blog'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'

const Bloglist = () => {
  const togglableRef = useRef()
  const blogs = useBlogs()

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