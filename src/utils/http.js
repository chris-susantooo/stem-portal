import Axios from 'axios'

const http = {
  // HEAD requests
  checkValid: key => Axios.head(`users/${key}`),
  checkCourse: name => Axios.head(`courses/${name}`),

  // GET requests
  getPosts: () => Axios.get('forum/posts'),
  readCourse: courseId => Axios.get(`courses/${courseId}`),
  getPost: id => Axios.get(`/forum/posts/${id}`),
  getComments: (id, page, reply) => Axios.get(`/forum/posts/${id}/comments` + (page && !reply ? `?page=${page}` : '') + (reply && !page ? `?reply=${reply}` : '') + (reply && page ? `?page=${page}&reply=${reply}` : '')),

  // POST request
  registerUser: (username, password, email, resend) => Axios.post('users', { username, password, email, resend }),
  verifyUser: (username, token, cancel) => Axios.post(`auth/verify/${username}`, { token, cancel }),
  activateUser: (username, role, firstName, lastName, gender, school, interests) => Axios.post(`auth/activate/${username}`, { role, firstName, lastName, gender, school, interests }),
  forgotPassword: (username, email) => Axios.post('auth/forgot-password', { username, email }),
  cancelToken: (username, token) => Axios.post(`auth/cancel-token/${token}`, { username }),
  resetPassword: (username, password, token) => Axios.post('auth/reset-password', { username, password, token }),
  createCourse: ({ name, description, tags, chapters }) => Axios.post('courses', { name, description, tags, chapters }),
  createPost: (title, content, tags) => Axios.post('forum/posts', { title, content, tags }),
  createComment: (id, content, reply) => Axios.post(`/forum/posts/${id}/comments`, { content, reply }),
  publishCourse: _id => Axios.post(`courses/${_id}/publish`),
  unpublishCourse: _id => Axios.post(`courses/${_id}/unpublish`),

  // PUT request
  updateCourse: ({ _id, name, description, tags, chapters }) => Axios.put(`courses/${_id}`, { name, description, tags, chapters }),

  // DELETE request
  deleteCourse: courseId => Axios.delete(`courses/${courseId}`)

}
export default http
