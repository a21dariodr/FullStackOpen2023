import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedUser: null,
    username: '',
    password: ''
  },
  reducers: {
    setUser(state, action) {
      return { ...state, loggedUser: action.payload }
    },

    setUsername(state, action) {
      return { ...state, username: action.payload }
    },

    setPassword(state, action) {
      return { ...state, password: action.payload }
    }
  }
})

export const { setUser, setUsername, setPassword } = userSlice.actions
export default userSlice.reducer

export const setLoggedUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      console.log('Logging in with', username, password)
      blogService.setToken(user.token)
      localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (exception) {
      console.log('Invalid username or password')
      dispatch(setNotification('Invalid username or password', 6000))
    }
  }
}