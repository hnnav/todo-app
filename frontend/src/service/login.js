import axios from "axios"
const baseUrl = "https://todo-users-api.onrender.com/api/login/"

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  console.log('login service:', response.data)
  return response.data
}

export default { login }
