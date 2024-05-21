/* eslint-disable react/prop-types */
import { useState } from "react"
import { useMutation } from "@apollo/client"
import Select from 'react-select'
import { UPDATE_AUTHOR_BIRTHDATE, ALL_AUTHORS } from "../queries"

const BirthyearForm = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState('')

  const [updateBirthdate] = useMutation(UPDATE_AUTHOR_BIRTHDATE, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const selectOptions = authors.map(author => {
    return { value: author.name, label: author.name }
  })

  const submit = event => {
    event.preventDefault()

    console.log('updating author...');

    updateBirthdate({ variables: { name: selectedAuthor.value, birthdate: Number(born) } })
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          options={selectOptions}
          placeholder={'Select author'}
          onChange={setSelectedAuthor}
        />
        <div>
          born{' '}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm