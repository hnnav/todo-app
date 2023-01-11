import axios from "axios"
const baseUrl = "http://localhost:8080/api/login/"

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  console.log(response.data)
  return response.data
}

export default { login }
