import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    setNewName(event.target.value)
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    if (newName !== '') {

      if (persons.some(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
      } else {
        const newPerson = {
          name: newName
        }
        setPersons(persons.concat(newPerson))
        setNewName('')
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={addName} />
        </div>
        <div>
          <button type="submit" onClick={clickSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) =>
        <div key={person.name}> {person.name} </div>
      )}
    </div>
  )
}

export default App