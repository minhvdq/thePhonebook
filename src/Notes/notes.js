import functions from '../functionarities/brain'

const Filter = ({filters, filtering}) => {
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


const Name = ({names, crossName}) => {
  return(
    <div>
      {names.map(name =>
        <p key = {name.id}>{name.name} {name.number} <button onClick={() => crossName(name.id, name.name)}> delete</button></p>  
      )}
    </div>
  )

}

export default {Filter, PersonForm, Name}