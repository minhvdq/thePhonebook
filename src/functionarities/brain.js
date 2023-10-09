import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const submit =  (newArr) => {
    const request = axios.post(baseUrl, newArr)
    return request.then(response => response.data)
}
const deleteNote = (id) =>{
    const url = `${baseUrl}/${id}`
    const req = axios.delete(url).then(response => response.data)
    return req

}
const update = (id, newArr) => {
    const newUrl = `${baseUrl}/${id}`
    const request = axios.put(newUrl, newArr)
    return request
}

export default {
    getAll, submit, deleteNote, update
}