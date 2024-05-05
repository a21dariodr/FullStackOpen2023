import axios from 'axios'

const baseUrl = '/api/users'

const sortUsersByName = users => users.sort((a, b) => a.name - b.name)

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { sortUsersByName, getAllUsers }