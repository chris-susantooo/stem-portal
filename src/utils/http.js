import Axios from 'axios'

const http = {
  // GET requests
  checkUsername: username => Axios.get(`check/username/${username}`),
  checkEmail: email => Axios.get(`check/email/${email}`),
  checkCourse: courseName => Axios.get(`/check/course/${courseName}`),
  getPosts: ({ search, tags, sort, page, size }) => {
    let url = 'forum/posts?'
    if (search) {
      url += `search=${search}&`
    } if (tags) {
      url += `tags=${tags.join(',')}&`
    } if (sort) {
      url += `sort=${sort}&`
    }
    url += `page=${page}&size=${size}`
    return Axios.get(url)
  },
  getPost: id => Axios.get(`/forum/posts/${id}`),
  getComments: (id, page) => Axios.get(`/forum/posts/${id}/comments?page=${page}`),

  // POST request
  registerUser: (username, password, email, isResend) => Axios.post('users', { username, password, email, isResend }),
  activateUser: (username, token, cancel) => Axios.post(`auth/activate/${username}`, { token, cancel }),
  resetPassword: (username, email) => Axios.post('auth/reset-password', { username, email }),
  acquirePassword: (username, token, cancel) => Axios.post(`auth/acquire-password/${username}`, { token, cancel }),
  changePassword: (username, password) => Axios.post('users/change-password', { username, password }),
  postRegistrationUser: (username, role, firstName, lastName, gender, school, interests) => Axios.post('users/register', { username, role, firstName, lastName, gender, school, interests }),
  createCourse: ({ title, description, tags, chapters, author }) => Axios.post('courses', { name: title, description, tags, chapters, author }),
  readCourse: courseId => Axios.get(`courses/${courseId}`),
  updateCourse: course => Axios.put(`courses/${course.id}`, { course }),
  deleteCourse: courseId => Axios.delete(`courses/${courseId}`),
  createPost: (author, title, tags, content) => Axios.post('forum/posts', { author, title, tags, content }),
  createComment: (id, content, replyto) => Axios.post(`/forum/posts/${id}/comments`, { content, replyto })
}

export default http
