import axios from "axios"
// remember to switch url to 'https://todo-app-api-u0az.onrender.com/api/items' for deploying
const baseUrl = "http://localhost:8080/api/items"

let token = null

const setToken = (newToken) => {
  token = newToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createNew = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateDone = async (id, updatedItem) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.put(`${baseUrl}/${id}`, updatedItem, config)
}

const deleteItem = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

export default { getAll, createNew, setToken, updateDone, deleteItem }