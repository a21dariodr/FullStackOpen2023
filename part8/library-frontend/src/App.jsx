import { useState } from "react"
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommend from "./components/Reccomend"
import { BOOK_ADDED, ALL_BOOKS } from "./queries"

const updateCache = (cache, query, addedBook) => {
  const includedIn = (collection, object) => collection.map(o => o.id).includes(object.id)

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: includedIn(allBooks, addedBook)
        ? allBooks
        : allBooks.concat(addedBook)
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors")

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookAdded = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded)
      window.alert(`New book "${bookAdded.title}" by ${bookAdded.author.name} added`)
    }
  })

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
