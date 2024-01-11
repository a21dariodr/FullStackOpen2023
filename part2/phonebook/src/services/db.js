import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = async () => {
    const response = await axios.get(baseUrl)
    console.log('Data fetched succesfully', response.data)
    return response.data
}

const createPerson = async person => {
    const response = await axios.post(baseUrl, person)
    console.log('New person added succesfully', response.data)
    return response.data
}

const deletePerson = async personId => {
    const response = await axios.delete(`${baseUrl}/${personId}`)
    console.log(`Person with id ${personId} deleted succesfully`, response.data)
}

export default { getAllPersons, createPerson, deletePerson }
