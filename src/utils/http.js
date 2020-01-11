import Axios from 'axios'

const http = {
  // GET requests
  checkUsername: username => Axios.get(`check/username/${username}`),
  checkEmail: email => Axios.get(`check/email/${email}`),
  checkCourse: courseName => Axios.get(`/check/course/${courseName}`),

  // POST request
  registerUser: (username, password, email, isResend) => Axios.post('users', { username, password, email, isResend }),
  activateUser: (username, token, cancel) => Axios.post(`auth/activate/${username}`, { token, cancel }),
  resetPassword: (username, email) => Axios.post('auth/reset-password', { username, email }),
  acquirePassword: (username, token, cancel) => Axios.post(`auth/acquire-password/${username}`, { token, cancel }),
  changePassword: (username, password) => Axios.post('users/change-password', { username, password }),
  postRegistrationUser: (username, role, firstName, lastName, gender, school, interests) => Axios.post(`users/${username}`, { role, firstName, lastName, gender, school, interests }),
  createCourse: ({ title, description, tags, chapters, author }) => Axios.post('courses', { name: title, description, tags, chapters, author }),
  updateCourse: course => Axios.put(`courses/${course.id}`, { course })
}

export default http
