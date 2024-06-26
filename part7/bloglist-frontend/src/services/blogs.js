import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => (token = `Bearer ${newToken}`)

const sortBlogsByLikes = blogs => blogs.sort((a, b) => b.likes - a.likes)

const getAllBlogs = async () => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBlog = async newBlog => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async modifiedBlog => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.put(`${baseUrl}/${modifiedBlog.id}`, modifiedBlog, config)
  return response.data
}

const deleteBlog = async blogToDelete => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  await axios.delete(`${baseUrl}/${blogToDelete.id}`, config)
  return blogToDelete
}

const commentBlog = async ({ blogId, comment }) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comment }, config)
  return response.data
}

const getBlogs = async () => {
  const blogsData = await getAllBlogs()
  return sortBlogsByLikes(blogsData)
}

export const useBlogs = () => {
  const user = useSelector(({ user }) => user.loggedUser)

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    enabled: !!user,
    retry: 1
  })
  return blogs
}

export default { sortBlogsByLikes, getAllBlogs, createBlog, updateBlog, deleteBlog, setToken, commentBlog, useBlogs }