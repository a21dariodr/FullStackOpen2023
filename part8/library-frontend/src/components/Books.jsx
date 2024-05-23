/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useQuery, useApolloClient } from "@apollo/client"
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from "../queries"

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    setFilteredBooks(books.data.allBooks)
  }, [books.data.allBooks])

  if (!props.show) {
    return null
  }

  if (books.loading) return (
    <div>
      Loading books...
    </div>
  )

  let genres = new Set([])
  books.data.allBooks.forEach(book => {
    genres = genres.union(new Set(book.genres))
  })

  const searchByGenre = (genre) => {
    client.query({
      query: ALL_BOOKS_BY_GENRE,
      variables: { genre }
    }).then(result => setFilteredBooks(result.data.allBooks))
  }

  const searchAll = () => {
    client.query({
      query: ALL_BOOKS
    }).then(result => setFilteredBooks(result.data.allBooks))
  }

  console.log(filteredBooks);

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {Array.from(genres).map(genre => (<button key={genre} onClick={() => searchByGenre(genre)}>{genre}</button>))}
        <button onClick={searchAll}>all genres</button>
      </div>
    </div>
  )
}

export default Books
