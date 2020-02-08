import Axios from 'axios'

const http = {
  // HEAD requests
  checkValid: key => Axios.head(`users/${key}`),
  checkCourse: name => Axios.head(`courses/${name}`),

  // GET requests
  getPosts: () => Axios.get('forum/posts'),
  readCourse: courseId => Axios.get(`courses/${courseId}`),
  getPost: id => Axios.get(`/forum/posts/${id}`),
  getComments: (id, page) => Axios.get(`/forum/posts/${id}/comments?page=${page}`),

  // POST request
  registerUser: (username, password, email, resend) => Axios.post('users', { username, password, email, resend }),
  verifyUser: (username, token, cancel) => Axios.post(`auth/verify/${username}`, { token, cancel }),
  activateUser: (username, role, firstName, lastName, gender, school, interests) => Axios.post(`auth/activate/${username}`, { role, firstName, lastName, gender, school, interests }),
  forgotPassword: (username, email) => Axios.post('auth/forgot-password', { username, email }),
  cancelToken: (username, token) => Axios.post(`auth/cancel-token/${token}`, { username }),
  resetPassword: (username, password, token) => Axios.post('auth/reset-password', { username, password, token }),
  createCourse: ({ name, description, tags, chapters }) => Axios.post('courses', { name, description, tags, chapters }),
  createPost: (author, title, tags, content) => Axios.post('forum/posts', { author, title, tags, content }),
  createComment: (id, content, replyto) => Axios.post(`/forum/posts/${id}/comments`, { content, replyto }),

  // PATCH request
  publishCourse: _id => Axios.patch(`courses/${_id}`),

  // PUT request
  updateCourse: ({ _id, name, description, tags, chapters }) => Axios.put(`courses/${_id}`, { name, description, tags, chapters }),

  // DELETE request
  deleteCourse: courseId => Axios.delete(`courses/${courseId}`)

}
export default http
