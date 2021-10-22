import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/Contact'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    
    const contact = {
      name: newName,
      number: newNumber
    }

    let oldContact = persons.find(person => person.name === contact.name);
    if (oldContact !== undefined) {
      console.log("Contact exists")
      if (window.confirm(`${contact.name} is already added, replace the old number?`)) {
        handleUpdatePerson(oldContact, contact)
      }
      return
    }

    personsService
      .create(contact)
      .then(response => {
        setPersons(persons.concat(response.data))
        setPersonsToShow(persons.concat(response.data))

        setNewName('')
        setNewNumber('')
      })

  }

  const handleUpdatePerson = (oldContact, contact) => {

    contact = { ...oldContact, number: contact.number}

    personsService.update(contact.id, contact)
      .then(() => {
        personsService.getAll().then(response => {
          console.log("Fetched all contacts")
          console.log(response.data)
        setPersons(response.data)
        setPersonsToShow(response.data)
      })
    })
  }

  const handleDelete = (contact) => {

    if (window.confirm(`Do you want to delete ${contact.name}`)) {
      personsService
        .remove(contact.id)
        .then(() => {
          personsService.getAll().then(response => {
            setPersons(response.data)
            setPersonsToShow(response.data)
          })
        })
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    console.log("Event: ", event.target.value)
    console.log("Filter: ", newFilter)
    if (event.target.value === "") {
      setPersonsToShow(persons)
    } else {
      setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }

  }

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersonsToShow(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Filter</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Phonebook</h2>
      <PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} handleUpdatePerson={handleUpdatePerson}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App