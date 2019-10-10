import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: localStorage.getItem('token') || '',
      type: localStorage.getItem('type') || 'visitor',
      name: localStorage.getItem('name') || ''
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.setItem('token', user.token)
      localStorage.setItem('type', user.type)
      localStorage.setItem('name', user.name)
    }
  },
  actions: {
    login ({ commit }, credentials) {
      // for now pretend every login is success
      const res = {
        token: 'abcd1234',
        type: credentials.username, // fake, for demo only
        name: 'SPAdmin'
      }
      if (['teacher', 'student', 'parent'].includes(res.type)) {
        commit('setUser', res)
      }
    },
    logout ({ commit }) {
      commit('setUser', { token: '', type: 'visitor', name: '' })
    }
  },
  getters: {
    isTokenExpired (state) {
      let isExpired = false
      // uncomment below after server login is set up
      // if (state.user.token) {
      //   const decodedToken = state.user.token.split('.')[1]
      //   const decodedValue = JSON.parse(window.atob(decodedToken))
      //   if (decodedValue.exp < new Date().getTime() / 1000) {
      //     isExpired = true
      //   }
      // }
      return isExpired
    },
    isLoggedIn (state) {
      return state.user.type !== 'visitor'
    },
    user (state) {
      return state.user
    }
  }
})
