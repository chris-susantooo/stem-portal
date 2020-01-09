<template>
  <component :is="currentHome" />
</template>

<script>
export default {
  components: {
    VisitorHome: () => import('./visitors/Home.vue'),
    StudentHome: () => import('./students/Home.vue'),
    TeacherHome: () => import('./teachers/Home.vue')
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    currentHome () {
      const userType = this.user.type || 'visitor'
      return userType + '-' + 'home'
    }
  }
}
</script>
