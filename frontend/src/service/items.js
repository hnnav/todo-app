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
    headers: { Authorization: token },
  }
  // Token defined when logged in, backend auth headers too
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, createNew, setToken }