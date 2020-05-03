const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home-common.vue')
  },
  {
    path: '/features',
    name: 'features-intro',
    component: () => import('@/views/features-intro.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/profile/:username?',
    name: 'profile',
    component: () => import('@/views/profile.vue')
  },
  {
    path: '/register/:username',
    name: 'register',
    component: () => import('@/views/first-register.vue')
  },
  {
    path: '/reset-password/:username',
    name: 'reset-password',
    component: () => import('@/views/forgot-password.vue')
  },
  {
    path: '/forum',
    name: 'forum',
    component: () => import('@/views/forum.vue')
  },
  {
    path: '/forum/posts/new',
    name: 'forum-new-post',
    component: () => import('@/views/forum-post-new.vue')
  },
  {
    path: '/games',
    name: 'game-list',
    component: () => import('@/views/game-list.vue')
  },
  {
    path: '/games/magic-cube',
    name: 'game-magic-cube',
    component: () => import('@/views/game-magic-cube.vue')
  },
  {
    path: '/games/solve-them',
    name: 'game-solve-them',
    component: () => import('@/views/game-solve-them.vue')
  },
  {
    path: '/courses',
    name: 'course-list',
    component: () => import('@/views/course-list.vue')
  },
  {
    path: '/courses/:id/edit',
    name: 'course-edit',
    meta: { role: 'teacher' },
    component: () => import('@/views/course-edit.vue')
  },
  {
    path: '/courses/new',
    name: 'course-new',
    meta: { role: 'teacher' },
    component: () => import('@/views/course-edit.vue')
  },
  {
    path: '/courses/:id/preview',
    name: 'course-preview',
    meta: { role: 'teacher' },
    component: () => import('@/views/course-view.vue')
  },
  {
    path: '/courses/:id',
    name: 'course-view',
    component: () => import('@/views/course-view.vue')
  },
  {
    path: '/teacher-circle',
    name: 'teacher-circle'
  },
  {
    path: '/tags/:name',
    name: 'tag-view'
  },
  {
    path: '*', // wildcard route-matching redirects unspecified routes
    component: () => import('@/views/home-common.vue') // todo: 404 not found page
  }
]

export default routes

// {
//   path: '/happy-corner',
//   name: 'corner',
//   component: () => import(/* webpackChunkName: "corner" */ './views/teachers/Teacher_corner.vue')
// },
// {
//   path: '/happy-corner/upload',
//   name: 'upload-corner',
//   component: () => import(/* webpackChunkName: "upload-corner" */ './views/teachers/Upload_corner.vue')
// },
// {
//   path: '/happy-corner/MATH1853',
//   name: 'MATH1853',
//   component: () => import(/* webpackChunkName: "MATH1853" */ './views/teachers/MATH1853.vue')
// }
