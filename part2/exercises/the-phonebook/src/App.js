import React, { useState } from 'react'
import Filter from './componets/Filter'
import PersonForm from './componets/PersonForm'
import Persons from './componets/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [searchResults, setSearchResults] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const addName = (event) => {
    setNewName(event.target.value)
  }

  const addNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const inputSearchName = (event) => {
    const v = event.target.value
    setSearchName(v)

    if (v === '') {
      setSearchResults([])
    } else {
      const results = [...persons].filter(person => person.name.toLocaleLowerCase().includes(v.toLocaleLowerCase()))
      setSearchResults(results)
    }
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    if (newName !== '' && newNumber !== '') {

      if (persons.some(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
      } else {
        const newPerson = {
          name: newName,
          number: newNumber
        }
        console.log(newPerson)
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchName} onChange={inputSearchName} />
      <h3>add a new</h3>
      <PersonForm
        valueName={newName}
        onChangeName={addName}
        valueNumber={newNumber}
        onChangeNumber={addNumber}
        onClickSubmit={clickSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={(searchName.length > 0 ? searchResults : persons)} />
    </div>
  )
}

export default App