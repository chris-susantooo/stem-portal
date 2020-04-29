import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Axios from 'axios'

import MasterLayout from '../views/layout-master.vue'
import routes from './routes'

Vue.use(Router)

const DEFAULT_TITLE = 'STEM Portal'

const router = new Router({
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: MasterLayout,
      children: routes
    }
  ]
})

// set title as specified in meta if any
router.afterEach((to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE
})

// navigation guards
router.beforeEach((to, from, next) => {
  if (store.getters.isTokenExpired) {
    store.commit('setToken', '')
    delete Axios.defaults.headers.common['Authorization']
  }
  const hasRequiredRole = to.matched.reduce((acc, { meta: { role } }) => (
    role
      ? acc && role === store.getters.user.type
      : acc
  ), true)
  hasRequiredRole ? next() : next({ name: 'login' })
})

export default router
