<template>
  <div class="container">
    <div class="headers text-center">
      <h1>Online Courses</h1>
      <p>Manage and host your online courses here for students.</p>
      <br>
    </div>
    <h3>Your Online Courses</h3>
    <v-container>

    </v-container>
    <div class="d-flex overflow-x-auto">
      <!-- add new course button -->
      <div class="mx-2">
        <v-card flat class="my-4 d-flex justify-center align-center text-center" width="300" height="90%">
          <div class="content">
            <div class="row">
              <v-btn text icon height="128" :to="{ name: 'new-course' }">
                <v-icon color="indigo" size="128">mdi-plus-circle</v-icon>
              </v-btn>
            </div>
            <div class="row">
              <h4>Add New Course</h4>
            </div>
          </div>
        </v-card>
      </div>
      <!-- courses -->
      <div v-for="course in courses" :key="course.id" class="mx-2">
          <course-card :course="course" />
      </div>
      <!-- placeholder course -->
      <div class="mx-2">
        <course-card :course="placeholderCourse" />
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
    this.$http.get(`courses?teacher=${this.$store.getters.user.username}`)
      .then(({ data: courses }) => { this.courses = courses })
  },
  data: () => ({
    courses: [],
    placeholderCourse: {
      id: 'demo',
      thumbnail: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      title: 'Introductory Programming! Learn fast.',
      author: 'christophers',
      tags: ['JavaScript', 'Coding', 'Technology'],
      rating: 4.5,
      votes: 100
    }
  })
}
</script>

<style lang="sass" scoped>

</style>
