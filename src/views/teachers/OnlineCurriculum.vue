<template>
  <div class="container">
    <div class="headers text-center">
      <h1>Online Courses</h1>
      <p>Manage and host your online courses here for students.</p>
      <br>
    </div>
    <h3>Your Online Courses</h3>
    <div class="d-flex overflow-x-auto">
      <!-- add new course button -->
      <div class="mx-2">
        <v-card flat class="my-4 d-flex align-center justify-center text-center" width="300" height="90%">
          <div>
            <v-btn text icon width="128" height="128" :to="{ name: 'new-course' }">
              <v-icon color="indigo" size="128">mdi-plus-circle</v-icon>
            </v-btn>
            <p>Add New Course</p>
          </div>
        </v-card>
      </div>
      <!-- courses -->
      <div v-for="course in courses" :key="course._id" class="mx-2">
          <course-card :course="course" :role="user.type" @courseDeleted="fetchTeachingCourses" />
      </div>
      <div class="px-2" />
    </div>
  </div>
</template>

<script>
import CourseCard from '@/components/teachers/courses/CourseCard.vue'

export default {
  components: { CourseCard },
  created () {
    this.fetchTeachingCourses()
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  data: () => ({
    courses: []
  }),
  methods: {
    fetchTeachingCourses () {
      this.$http.get('courses')
        .then(({ data: { courses, page, pages } }) => { this.courses = courses })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
