import { useState } from "react"
import { useMutation } from "@apollo/client"
import { UPDATE_AUTHOR_BIRTHDATE, ALL_AUTHORS } from "../queries"

const BirthyearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateBirthdate] = useMutation(UPDATE_AUTHOR_BIRTHDATE, {
    refetchQueries: [{ query: ALL_AUTHORS }]
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
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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