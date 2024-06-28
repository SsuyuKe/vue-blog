export const setToken = (token) => {
  localStorage.setItem('Blog-TOKEN', token)
}

export const getToken = () => {
  return localStorage.getItem('Blog-TOKEN') || ''
}