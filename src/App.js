import { useState, useEffect } from 'react'

import items from './Notes/notes'
import functions from './functionarities/brain'
import './index.css'

/*const Filter = ({filters, filtering}) => {
  return(
    <div>
      filter shown with <input value = {filters} onChange = {filtering} />
    </div>
  )
}

const PersonForm = ({nameSubmit, newName, addName,newNumber, addNumber}) => {
  return(
    <form onSubmit = {nameSubmit}>
      <div>
        name: <input value = {newName} onChange = {addName} />
      </div>
      <div>
        number: <input value = {newNumber} onChange = {addNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Name = ({names}) => {
  return(
    <div>
      {names.map(name =>
        <p key = {name.id}>{name.name} {name.number} </p>  
      )}
    </div>
  )

}*/

const Filter = items.Filter
const PersonForm = items.PersonForm
const Name = items.Name
const Norti = ({norti}) => {
  if(norti === null){
    return null
  }
  else{
    return(
      <div className='norti'>
        <h1 > Added {norti} </h1>
      </div>
    )
  }
}

const Err = ({error}) => {
  if(error === null){
    return null
  }
  return(
    <div className = "error">
      <h1> Information of {error} has already been removed</h1>
    </div>
  )
}

const App = () => {
  const [index, setIndex ] = useState(4)
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filters, setFilter] = useState('')
  const [showPersons, setShowPersons] = useState(persons)
  const [norti, setNorti] = useState(null)
  const [Error, setError] = useState(null)



  useEffect(() => {
    functions.getAll()
    .then(data => {
      console.log(data[1])
      setPersons(data)
      setShowPersons(data)
      let number = data[data.length - 1].id + 1
      setIndex(number)
    })
  },[])

  

  const nameSubmit = (event) => {
    let check = true
    event.preventDefault()
    let count = 0
    let itsIndex = 0
    for(const person of persons){
      if(person.name.toLowerCase() === newName.toLowerCase()){
        itsIndex = count
        check = false
        break
      }
      count ++
    }
    console.log(itsIndex)
    if (check === true){
      let newIndex = index + 1
      const newArr = {
        name: newName,
        number: newNumber,
        id: newIndex
      }
      functions.submit(newArr)
      .then( data => {
        setPersons(persons.concat(data))
        setIndex(newIndex)
        console.log(data)
        console.log(persons)
        setNewName('')
        setNewNumber('')
        setFilter('')
        setShowPersons(persons.concat(data))
        setNorti(data.name)
        setTimeout(() => {
          setNorti(null)
        }, 5000)
      })
    }
    else{
      if(window.confirm(`${persons[itsIndex].name} a is already added to the phonebook, replace the old number with the new one?`)){
        const i = persons[itsIndex].id
        const newArr = {
          name: persons[itsIndex].name,
          number: newNumber,
          id: i
        }
        functions.update(i, newArr).then(data => {
          setPersons(persons.map(person => person.id !== i ? person : data ))
          setShowPersons(persons.map(person => person.id !== i ? person : data ))
          setNewName('')
          setNewNumber('')
          console.log(newArr)
        })
      }
    }
    
  }

  const addName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const filtering = (event) => {
    console.log(showPersons)
    let val = event.target.value
    setFilter(val)
    console.log(val)
    const filtered = persons.filter(x => x.name.toLowerCase().includes(val.toLowerCase()))
    console.log(filtered.length)
    setShowPersons(filtered)
  } 

  const crossName = (id, name) => {
    if(window.confirm(`Delete ${name}`)){
      functions.deleteNote(id).then(
        () => {
          console.log("Deleted")
          setPersons( persons.filter(person => person.id !== id))
          setShowPersons( persons.filter(person => person.id !== id))
        }
      ).catch(error => {
        setError(name)
        setTimeout(() => {setError(null)}, 5000 )
        setPersons( persons.filter(person => person.id !== id))
        setShowPersons( persons.filter(person => person.id !== id))
      })
    }
  }
  console.log(index)

  return (
    <div>
      <h2>Phonebook</h2>  
      <Err error = {Error} />
      <Norti norti = {norti} />
      <Filter filters = {filters} filtering = {filtering}  />
      <h2> add a new</h2>
      <PersonForm nameSubmit = {nameSubmit} newName = {newName} addName = {addName} newNumber={newNumber} addNumber={addNumber} />
      <h2>Numbers</h2>
      <Name names = {showPersons} crossName={crossName}/>
    </div>
  )
}

export default App 