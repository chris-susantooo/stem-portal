import Axios from 'axios'

export function registerUser ({ username, password }) {
  return Axios.post('/api/register', {
    username,
    password
  })
}
