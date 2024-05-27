/* eslint-disable react/prop-types */
import { useState } from "react"
import { useMutation } from "@apollo/client"
import Select from 'react-select'
import { UPDATE_AUTHOR_BIRTHDATE, ALL_AUTHORS } from "../queries"

const BirthyearForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateBirthdate] = useMutation(UPDATE_AUTHOR_BIRTHDATE, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const selectOptions = authors?.map(author => {
    return { value: author.name, label: author.name }
  })

  const submit = event => {
    event.preventDefault()

    console.log('updating author...');

    updateBirthdate({ variables: { name, birthdate: Number(born) } })
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          options={selectOptions}
          placeholder={'Select author'}
          onChange={option => setName(option.value)}
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