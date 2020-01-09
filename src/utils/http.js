import Axios from 'axios'

const http = {
  registerUser: (username, password, email, isResend) => Axios.post('users', { username, password, email, isResend }),
  activateUser: (username, token, cancel) => Axios.post(`auth/activate/${username}`, { token, cancel }),
  checkUsername: (username) => Axios.get(`users/${username}`),
  resetPassword: (username, email) => Axios.post('auth/reset-password', { username, email }),
  acquirePassword: (username, token, cancel) => Axios.post(`auth/acquire-password/${username}`, { token, cancel }),
  changePassword: (username, password) => Axios.post('users/change-password', { username, password })
}

export default http
