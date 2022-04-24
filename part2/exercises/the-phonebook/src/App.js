import React, { useState, useEffect } from 'react'
import Filter from './componets/Filter'
import PersonForm from './componets/PersonForm'
import Persons from './componets/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(
    () => {
      axios.get("http://localhost:3001/persons")
        .then((response) => {
            const data = response.data
            setPersons(data)
        })
    },
    []
  )

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