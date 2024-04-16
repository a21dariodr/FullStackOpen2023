/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  if (action.type === 'setMessage') return action.payload
  else if (action.type === 'resetMessage') return ''
  return state
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, dispatchMessage] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[message, dispatchMessage]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext