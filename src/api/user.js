import axios from "axios";

// api網址 => 模擬登入
export const userApi = {
  login: async(username, password) => {
    const { data, status } = await axios.post('https://dummyjson.com/auth/login', { username, password })
    return { data, code: status }
  }
}