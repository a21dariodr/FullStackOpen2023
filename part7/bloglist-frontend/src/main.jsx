import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer
  }
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </Router>
)
