import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import MasterLayout from './views/layouts/Master.vue'

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
      children: [
        {
          name: 'home',
          path: '/',
          component: Home
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
          path: '/UserProfile',
          name: 'UserProfile',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "UserProfile" */ './views/UserProfile.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
        },
        {
          path: '/DiscussionForum',
          name: 'DiscussionForum',
          component: () => import(/* webpackChunkName: "DiscussionForum" */ './views/DiscussionForum.vue')
        }
      ]
    }
  ]
})

export default router

router.afterEach((to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE
})
