/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client"
import BirthyearForm from "./BirthyearForm"
import { ALL_AUTHORS } from "../queries"

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const token = localStorage.getItem('phonenumbers-user-token')

  if (!props.show) {
    return null
  }

  if (authors.loading) return (
    <div>
      Loading authors...
    </div>
  )

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { token ? (<BirthyearForm authors={authors.data.allAuthors} />) : null }
    </div>
  )
}

export default Authors
