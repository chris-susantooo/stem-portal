import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Axios from 'axios'

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
          component: () => import(/* webpackChunkName: "register" */ './views/visitors/Register.vue')
        },
        {
          path: '/reset-password/:username',
          name: 'reset-password',
          component: () => import(/* webpackChunkName: "register" */ './views/visitors/ResetPassword.vue')
        },
        {
          path: '/discussion-forum',
          name: 'DiscussionForum',
          component: () => import(/* webpackChunkName: "discussionforum" */ './views/DiscussionForum.vue')
        },
        {
          path: '/create-post',
          name: 'createpost',
          meta: { role: 'teacher' },
          component: () => import(/* webpackChunkName: "creatpost" */ './views/Makecomment.vue')
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
          meta: { role: 'teacher' },
          component: () => import(/* webpackChunkName: "online-course" */ './views/teachers/OnlineCurriculum.vue')
        },
        {
          path: '/teachers/courses/new',
          name: 'new-course',
          meta: { role: 'teacher' },
          component: () => import(/* webpackChunkName: "make-new-online-course" */ './views/teachers/CourseEditor.vue')
        },
        {
          path: '/teachers/courses/:courseId',
          name: 'edit-course',
          meta: { role: 'teacher' },
          component: () => import(/* webpackChunkName: "make-new-online-course" */ './views/teachers/CourseEditor.vue')
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
  if (store.getters.isTokenExpired) {
    store.commit('setToken', '')
    delete Axios.defaults.headers.common['Authorization']
  }
  const hasRequiredRole = to.matched.reduce((acc, { meta: { role } }) => (role ? acc && role === store.getters.user.type : acc), true)
  hasRequiredRole ? next() : next({ name: 'login' })
})

router.afterEach((to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE
})
