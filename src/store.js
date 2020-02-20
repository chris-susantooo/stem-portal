import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || { type: 'visitor' },
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken (state, token) {
      state.token = token
      token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        Axios({ url: '/auth/login', data: user, method: 'POST' })
          .then(({ data: { user, token } }) => {
            commit('setUser', user)
            commit('setToken', token)
            Axios.defaults.headers.common['Authorization'] = 'bearer ' + token
            resolve(user)
          })
          .catch(err => reject(err))
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('setUser', { type: 'visitor' })
        commit('setToken', '')
        delete Axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    fetchUser ({ state, commit, getters }) {
      return new Promise((resolve, reject) => {
        if (getters.isLoggedIn) {
          Axios.defaults.headers.common['Authorization'] = 'bearer ' + state.token
          Axios({ url: '/user', method: 'GET' })
            .then(({ data: { user } }) => {
              commit('setUser', user)
              resolve(user)
            })
            .catch(err => {
              commit('setUser', { type: 'visitor' })
              commit('setToken', '')
              delete Axios.defaults.headers.common['Authorization']
              reject(err)
            })
        } else {
          resolve()
        }
      })
    }
  },
  getters: {
    isTokenExpired (state) {
      let isExpired = false
      if (state.token !== '') {
        const decodedToken = state.token.split('.')[1]
        const decodedValue = JSON.parse(window.atob(decodedToken))
        if (decodedValue.exp < new Date().getTime() / 1000) {
          isExpired = true
        }
      }
      return isExpired
    },
    isLoggedIn: (state, getters) => !!state.token && !getters.isTokenExpired,
    user: state => state.user
  }
})
