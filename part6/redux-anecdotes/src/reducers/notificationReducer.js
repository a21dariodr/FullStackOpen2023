/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice =  createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload
    },

    resetMessage(state, action) {
      return ''
    }
  }
})

export const { setMessage, resetMessage } = notificationSlice.actions
export default notificationSlice.reducer