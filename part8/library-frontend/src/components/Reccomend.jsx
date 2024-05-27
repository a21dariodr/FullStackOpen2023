/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, CURRENT_USER } from "../queries"

const Recommend = ({ show }) => {
  const books = useQuery(ALL_BOOKS)
  const loggedUser = useQuery(CURRENT_USER, { fetchPolicy: 'no-cache' })

  if (!show) {
    return null
  }

  if (books.loading || loggedUser.loading) return (
    <div>
      Loading books and current user...
    </div>
  )

  const favoriteGenre = loggedUser.data.me.favoriteGenre

  const filteredBooks = books.data.allBooks.filter(book => {
    return book.genres.includes(favoriteGenre)
  })

  return (
    <div>
      <h2>recommendations</h2>

      books in your favorite genre <strong>{favoriteGenre}</strong>

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
    </div>
  )
}

export default Recommend