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
    path: '/profile/:username',
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
    path: '*',
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
// },
// {
//   path: '/teachers/courses',
//   name: 'online-course',
//   meta: { role: 'teacher' },
//   component: () => import(/* webpackChunkName: "online-course" */ './views/teachers/OnlineCurriculum.vue')
// },
// {
//   path: '/teachers/courses/new',
//   name: 'new-course',
//   meta: { role: 'teacher' },
//   component: () => import(/* webpackChunkName: "make-new-online-course" */ './views/teachers/CourseEditor.vue')
// },
// {
//   path: '/teachers/courses/:courseId',
//   name: 'edit-course',
//   meta: { role: 'teacher' },
//   component: () => import(/* webpackChunkName: "make-new-online-course" */ './views/teachers/CourseEditor.vue')
// },
// {
//   path: '/teachers/courses/:courseId/preview',
//   name: 'preview-course',
//   meta: { role: 'teacher' },
//   component: () => import(/* webpackChunkName: "make-new-online-course" */ './views/students/Course.vue')
// },
// {
//   path: '/games/1',
//   name: 'MagicCube',
//   component: () => import(/* webpackChunkName: "MagicCube" */ './Games/MagicCube/MagicCube.vue')
// },
// {
//   path: '/games/2',
//   name: 'CodeSomething',
//   component: () => import(/* webpackChunkName: "CodeSomething" */ './Games/CodeSomething/CodeSomething.vue')
// },
// {
//   path: '/students/courses',
//   name: 'student-courses',
//   component: () => import(/* webpackChunkName: "online-course" */ './views/students/OnlineCurriculum.vue')
// },
// {
//   path: '/students/games',
//   name: 'student-games',
//   component: () => import(/* webpackChunkName: "online-course" */ './views/students/Games.vue')
// },
// {
//   path: '/students/courses/:courseId',
//   name: 'take-course',
//   meta: { role: 'student' },
//   component: () => import(/* webpackChunkName: "online-course" */ './views/students/Course.vue')
// }
