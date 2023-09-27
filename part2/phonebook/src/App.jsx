import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNewPerson = (e) => {
    e.preventDefault()

    const repeatedPerson = persons.find( person => person.name === newName )

    if (repeatedPerson) alert(`${repeatedPerson.name} is already added to the phonebook`)
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length+1
      }
      console.log('New person added: ', newPerson)
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  /* 
   * The list of persons is only filtered if the filter input field is not empty
   * Filtering finds persons whose name contains the filter input
   * The toLowerCase() method makes the filtering case-insensitive
   */
  const filteredPersons = filter
    ? persons.filter( person => person.name.toLowerCase().includes(filter.toLowerCase()) )
    : persons
  console.log('Filtered persons: ', filteredPersons)
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleNewFilter={(e) => setFilter(e.target.value)} />
      <h2>Add a new contact</h2>
      <PersonForm 
        states={{
          newName: newName,
          newNumber: newNumber
        }}
        handlers={{
          handleNewName: (e) => setNewName(e.target.value),
          handleNewNumber: (e) => setNewNumber(e.target.value),
          handleSubmit: handleNewPerson
        }}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
