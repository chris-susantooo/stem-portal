import Axios from 'axios'

const registerUser = (username, password, email) => Axios.post('users', { username, password, email })
const activateUser = (username, token, cancel) => Axios.post(`activate/${username}`, { token, cancel })

export { registerUser, activateUser }
