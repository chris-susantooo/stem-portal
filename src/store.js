import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {
      token: '',
      type: 'visitor',
      username: '',
      fullname: ''
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
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
