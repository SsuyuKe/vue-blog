import axios from 'axios'

export const postApi = {
  // 貼文API
  getPosts: async() => {
    const { data } = await axios.get('/mock/posts')
    return data
  }
}