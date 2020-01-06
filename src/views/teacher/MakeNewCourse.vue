<template>
  <div class="make-course">
    <div class="container">
      <div class="mb-5 text-center">
        <h1>Create a New Course</h1>
      </div>
      <br>
      <v-stepper v-model="currentStep" vertical>
        <v-stepper-step :complete="currentStep > 1" step="1" :editable="isCourseValid && isCourseInfoValid">
          Basic information about your course
          <small class="mt-2">Let us know what is it about</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-form v-model="isCourseInfoValid">
            <v-text-field :counter="60" :rules="courseNameRules" label="Course title" v-model="course.title" required />
            <v-textarea :rules="shortDescRules" label="Short description" v-model="course.description" required />
          </v-form>
          <div class="mt-2 py-2">
            <v-btn color="primary" @click="next(2)">Continue</v-btn>
            <v-btn class="ml-2" text>Save and exit</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="currentStep > 2" step="2" :editable="isCourseValid && isCourseInfoValid">
          Structure your course with progressive chapters
          <small class="mt-2">A chapter may contain sections and checkpoints</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <course-content-creator :save="save" @saveCourse="saveCourse" @courseValidationChanged="setCourseValid" />
          <div class="mt-2 py-2">
            <v-btn color="primary" @click="next(3)">Continue</v-btn>
            <v-btn class="ml-2" text>Save and exit</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="currentStep > 3" step="3" :editable="isCourseValid && isCourseInfoValid">
          Review your course details
          <small class="mt-2">Things to note before you publish to students</small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <div class="mb-2">
            <v-btn color="primary" @click="next(1)">Publish</v-btn>
            <v-btn class="ml-2" text>Save and exit</v-btn>
          </div>
        </v-stepper-content>
      </v-stepper>
    </div>
  </div>
</template>

<script>
import CourseContentCreator from '@/components/teachers/courses/Creator.vue'

export default {
  components: { CourseContentCreator },
  data: () => ({
    isCourseInfoValid: true,
    isCourseValid: true,
    currentStep: 1,
    save: true,
    course: {
      title: '',
      description: '',
      chapters: []
    },
    courseNameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 60) || 'Name must be less than 60 characters'
    ],
    shortDescRules: [ v => !!v || 'Description is required' ]
  }),
  methods: {
    saveCourse (chapters) {
      this.course.chapters = chapters
    },
    next (to) {
      if (to === 3 && this.isCourseValid) this.save = !this.save
      if (this.isCourseInfoValid && this.isCourseValid) this.currentStep = to
    },
    setCourseValid (isCourseValid) {
      this.isCourseValid = isCourseValid
    }
  }
}
</script>
