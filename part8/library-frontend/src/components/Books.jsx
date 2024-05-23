/* eslint-disable react/prop-types */
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const books = useQuery(ALL_BOOKS)
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

  const filteredBooks = books.data.allBooks.filter(book => {
    return genre === 'all'
      ? true
      : book.genres.includes(genre)
  })

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
        {Array.from(genres).map(genre => (<button key={genre} onClick={() => setGenre(genre)}>{genre}</button>))}
        <button onClick={() => setGenre('all')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
