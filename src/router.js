import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

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
          component: () => import(/* webpackChunkName: "UserProfile" */ './views/UserProfile.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
        },
        {
          path: '/register/:username',
          name: 'register',
          meta: { noAuth: true },
          component: () => import(/* webpackChunkName: "register" */ './views/visitors/Register.vue')
        },
        {
          path: '/DiscussionForum',
          name: 'DiscussionForum',
          component: () => import(/* webpackChunkName: "DiscussionForum" */ './views/DiscussionForum.vue')
        },
        {
          path: '/happy-corner',
          name: 'corner',
          component: () => import(/* webpackChunkName: "corner" */ './views/teachers/Teacher_corner.vue')
        },
        {
          path: '/happy-corner/upload',
          name: 'upload-corner',
          component: () => import(/* webpackChunkName: "upload-corner" */ './views/teachers/Upload_corner.vue')
        },
        {
          path: '/happy-corner/MATH1853',
          name: 'MATH1853',
          component: () => import(/* webpackChunkName: "MATH1853" */ './views/teachers/MATH1853.vue')
        },
        {
          path: '/teachers/home',
          name: 'teachers-home',
          component: () => import(/* webpackChunkName: "teacher-home" */ './views/teachers/Home.vue')
        },
        {
          path: '/teachers/courses',
          name: 'online-course',
          component: () => import(/* webpackChunkName: "online-course" */ './views/teachers/OnlineCurriculum.vue')
        },
        {
          path: '/teachers/courses/new',
          name: 'new-course',
          // meta: { requiresAuth: true },
          component: () => import(/* webpackChunkName: "make-new-online-course" */ './views/teachers/MakeNewCourse.vue')
        },
        {
          path: '/games/1',
          name: 'MagicCube',
          component: () => import(/* webpackChunkName: "MagicCube" */ './Games/MagicCube/MagicCube.vue')
        },
        {
          path: '/games/2',
          name: 'CodeSomething',
          component: () => import(/* webpackChunkName: "CodeSomething" */ './Games/CodeSomething/CodeSomething.vue')
        },
        {
          path: '/teacher',
          name: 'teacher-intro',
          component: () => import(/* webpackChunkName: "online-course" */ './views/visitors/Teacher.vue')
        },
        {
          path: '/student',
          name: 'student-intro',
          component: () => import(/* webpackChunkName: "online-course" */ './views/visitors/Student.vue')
        },
        {
          path: '/parent',
          name: 'parent-intro',
          meta: { noAuth: true },
          component: () => import(/* webpackChunkName: "online-course" */ './views/visitors/Parent.vue')
        },
        {
          path: '/student/course',
          name: 'student-course',
          component: () => import(/* webpackChunkName: "online-course" */ './views/students/Course.vue')
        },
        {
          path: '/student/games',
          name: 'student-games',
          component: () => import(/* webpackChunkName: "online-course" */ './views/students/Games.vue')
        }
      ]
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn && !store.getters.isTokenExpired) {
      next()
      return
    } else if (store.getters.isTokenExpired) {
      localStorage.setItem('token', '')
      store.commit('initToken')
    }
    next({ name: 'login' })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE
})
