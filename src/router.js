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
        },
        {
          path: '/happy-corner',
          name: 'corner',
          component: () => import(/* webpackChunkName: "corner" */ './views/teacher/Teacher_corner.vue')
        },
        {
          path: '/happy-corner/upload',
          name: 'upload-corner',
          component: () => import(/* webpackChunkName: "upload-corner" */ './views/teacher/Upload_corner.vue')
        },
        {
          path: '/happy-corner/MATH1853',
          name: 'MATH1853',
          component: () => import(/* webpackChunkName: "MATH1853" */ './views/teacher/MATH1853.vue')
        },
        {
          path: '/teacher/home',
          name: 'teacher-home',
          component: () => import(/* webpackChunkName: "teacher-home" */ './views/teacher/Home.vue')
        },
        {
          path: '/teacher/course',
          name: 'online-course',
          component: () => import(/* webpackChunkName: "online-course" */ './views/teacher/OnlineCurriculum.vue')
        },
        {
          path: '/teacher/makenewcourse',
          name: 'make-new-online-course',
          component: () => import(/* webpackChunkName: "make-new-online-course" */ './views/teacher/MakeNewCourse.vue')
        },
        {
          path: '/games/1',
          name: 'MagicCube',
          component: () => import(/* webpackChunkName: "MagicCube" */ './Games/MagicCube/test.vue')
        },
        {
          path: '/games/2',
          name: 'CodeSomething',
          component: () => import(/* webpackChunkName: "CodeSomething" */ './Games/CodeSomething/CodeSomething.vue')
        },
        {
          path: '/teacher',
          name: 'teacher-intro',
          component: () => import(/* webpackChunkName: "online-course" */ './views/visitor/Teacher.vue')
        },
        {
          path: '/student',
          name: 'student-intro',
          component: () => import(/* webpackChunkName: "online-course" */ './views/visitor/Student.vue')
        },
        {
          path: '/parent',
          name: 'parent-intro',
          component: () => import(/* webpackChunkName: "online-course" */ './views/visitor/Parent.vue')
        },
        {
          path: '/student/course',
          name: 'student-course',
          component: () => import(/* webpackChunkName: "online-course" */ './views/student/Course.vue')
        }
      ]
    }
  ]
})

export default router

router.afterEach((to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE
})
