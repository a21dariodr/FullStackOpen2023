import { useState } from "react"
import { useApolloClient } from '@apollo/client'
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommend from "./components/Reccomend"

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors")

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        { !token ? (<button onClick={() => setPage("login")}>login</button>) : null }
        { token ? (<button onClick={() => setPage("add")}>add book</button>) : null }
        { token ? (<button onClick={() => setPage("recommend")}>recommend</button>) : null }
        { token ? (<button onClick={logout}>logout</button>) : null }
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />

      <Recommend show={page === "recommend"} />
    </div>
  )
}

export default App
