<template>
  <div class="row">
    <div class="col-9">
      
    </div>
    <div class="col-3">
      
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'

export default {
  beforeCreate () {
    if (!this.$route.params.courseId) {
      this.$router.push({ name: 'home' })
    }
  },
  created () {
    http.readCourse(this.$route.params.courseId).then(({ data: course }) => { this.course = course })
  },
  data: () => ({
    course: {}
  })
}
</script>

<style>

</style>
