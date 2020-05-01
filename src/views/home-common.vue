<template>
  <component :is="currentHome" />
</template>

<script>
export default {
  components: {
    VisitorHome: () => import('./home-visitor.vue'),
    TeacherHome: () => import('./home-teacher.vue'),
    StudentHome: () => import('./home-student.vue'),
    ParentHome: () => import('./home-parent.vue')
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    currentHome () {
      const role = this.user.type || 'visitor'
      return `${role}-home`
    }
  }
}
</script>
