import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => token = `Bearer ${newToken}`

const getAll = async () => {
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
}

export default { getAll, createBlog, updateBlog, deleteBlog, setToken }