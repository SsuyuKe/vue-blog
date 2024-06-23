import axios from "axios"

export const userApi = {
  login: async(username, password) => {
    const { data } = await axios.post('/mock/login' , { username, password })
    return data
  }
}