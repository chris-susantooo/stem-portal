import Axios from 'axios'

export function registerUser (username, password, email) {
  return Axios.post('users', {
    username,
    password,
    email
  })
}
