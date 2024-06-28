export const setToken = (token) => {
  localStorage.setItem('Blog-TOKEN', token)
}

export const getToken = () => {
  return localStorage.getItem('Blog-TOKEN') || ''
}

export const setStoragePosts = (posts) => {
  //localStorage => 存字串
  localStorage.setItem('posts', JSON.stringify(posts))
}

export const getStoragePosts = () => {
  const posts = localStorage.getItem('posts')
  return posts ? JSON.parse(posts) : []
}