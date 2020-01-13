<template>
  <div class="container">
    <div class="headers text-center">
      <h1>Online Courses</h1>
      <p>Choose an online course and start to learn something interesting!</p>
      <br>
    </div>
    <h3 class="mb-n8 d-flex justify-center">Available Online Courses</h3>
    <v-container>
      <v-row class="d-flex justify-center">
        <div class="mx-2" v-for="course in courses" :key="course.id">
           <course-card :course="course" :role="user.type" />
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CourseCard from '@/components/teachers/courses/CourseCard.vue'

export default {
  components: { CourseCard },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  created () {
    this.$http.get('courses')
      .then(({ data: courses }) => { this.courses = courses })
  },
  data: () => ({
    courses: []
  })
}
</script>

<style lang="sass" scoped>

</style>
