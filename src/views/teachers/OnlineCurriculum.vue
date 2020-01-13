<template>
  <div class="container">
    <div class="headers text-center">
      <h1>Online Courses</h1>
      <p>Manage and host your online courses here for students.</p>
      <br>
    </div>
    <h3 class="mb-n8">Your Online Courses</h3>
    <v-container>
      <v-row>
        <div class="mx-2">
           <course-card v-for="course in courses" :key="course.id" :course="course" />
        </div>
        <div class="mx-2">
          <course-card :course="placeholderCourse" />
        </div>
      </v-row>
    </v-container>
    <!-- <div class="row">
      <div class="row">
        <h3>Your Online Courses</h3>
      </div>
      <div class="row">
        <div class="col">
          <v-card>
            <v-card-title class="d-flex justify-center">
              <h6>Introductory Programming</h6>
            </v-card-title>
            <v-card-text class="d-flex justify-center">
              Students will learn basic techniques of programming in Python.
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn text color="indigo">
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="col">
          <v-card>
            <v-card-title class="d-flex justify-center">
              <h6>Addition and Subtraction I</h6>
            </v-card-title>
            <v-card-text class="d-flex justify-center">
              Students will learn simple arithmetic.
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn text color="indigo">
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="col">
          <v-card>
            <v-card-title class="d-flex justify-center">
              <h6>Geometry I</h6>
            </v-card-title>
            <v-card-text class="d-flex justify-center">
              Students will learn features of different figures
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn text color="indigo">
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div> -->
      <div class="row">
        <div class="flex-grow-1"></div>
        <v-btn rounded color="light-blue" :to="{ name: 'new-course' }">
          Add new courses
        </v-btn>
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
