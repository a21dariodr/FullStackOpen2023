import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const baseUrl = '/api/users'

const sortUsersByName = users => users.sort((a, b) => a.name - b.name)

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUsers = async () => {
  const usersData = await getAllUsers()
  return sortUsersByName(usersData)
}

export const useUsers = () => {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: 1
  })
  return users
}

export default { sortUsersByName, useUsers }