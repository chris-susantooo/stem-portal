import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: localStorage.getItem('token') || ''
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    initToken (state) {
      state.user.token = localStorage.getItem('token') || ''
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        Axios({ url: '/auth/login', data: user, method: 'POST' })
          .then(({ data: { user, token } }) => {
            user.token = token
            localStorage.setItem('token', user.token)
            Axios.defaults.headers.common['Authorization'] = user.token
            commit('setUser', user)
            resolve(user)
          })
          .catch(err => {
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('setUser', { token: '' })
        localStorage.removeItem('token')
        delete Axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    fetchUser ({ commit, getters }) {
      return new Promise((resolve, reject) => {
        if (getters.isLoggedIn) {
          Axios({ url: '/user', method: 'GET' })
            .then(({ data: user }) => {
              commit('setUser', user)
              resolve(user)
            })
            .catch(err => {
              commit('setUser', { token: '' })
              localStorage.removeItem('token')
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
      if (state.user.token !== '') {
        const decodedToken = state.user.token.split('.')[1]
        const decodedValue = JSON.parse(window.atob(decodedToken))
        if (decodedValue.exp < new Date().getTime() / 1000) {
          isExpired = true
        }
      }
      return isExpired
    },
    isLoggedIn: (state, getters) => { console.log(!!state.user.token, !getters.isTokenExpired); return !!state.user.token && !getters.isTokenExpired },
    user: state => state.user
  }
})
