import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useBlogs } from '../services/blogs'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'

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
            : blogs.data.map(blog => (
              <div key={blog.id} style={{ border: '1px solid black', padding: 5, marginBottom: 3 }}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default Bloglist