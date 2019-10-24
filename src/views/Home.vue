<template>
  <component :is="currentHome" />
</template>

<script>
export default {
  components: {
    VisitorHome: () => import('./visitor/Home.vue'),
    StudentHome: () => import('./student/Home.vue')
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
