import React, { useState } from 'react'

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
      <div>
        filter shown with<input value={searchName} onChange={inputSearchName} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={addName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={addNumber} />
        </div>
        <div>
          <button type="submit" onClick={clickSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {console.log(searchResults.length)}
      {(searchName.length > 0 ? searchResults : persons)
        .map((person) =>
          <div key={person.name}> {person.name} {person.number} </div>
        )
      }
    </div>
  )
}

export default App