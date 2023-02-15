import axios from "axios"

const baseUrl = "https://todo-users-api.onrender.com/api/users/"

const createNewUser = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

  export default { createNewUser }