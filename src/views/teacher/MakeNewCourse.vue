<template>
  <div class="make-course">
    <div class="container">
      <div class="mb-5 text-center">
        <h1>Create a New Course</h1>
      </div>
      <br>
      <v-stepper v-model="currentStep" vertical>
        <v-stepper-step :complete="currentStep > 1" step="1" editable>
          Basic information about your course
          <small class="mt-2">Let us know what is it about</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-text-field label="Course title" v-model="course.title" required />
          <v-textarea label="Short description" v-model="course.description" required />
          <div class="mb-2">
            <v-btn color="primary" @click="currentStep = 2">Continue</v-btn>
            <v-btn class="ml-2" text>Save and exit</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="currentStep > 2" step="2" editable>
          Structure your course with progressive chapters
          <small class="mt-2">A chapter may contain sections and checkpoints</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <course-content-creator />
          <div class="mt-2 py-2">
            <v-btn color="primary" @click="currentStep = 3">Continue</v-btn>
            <v-btn class="ml-2" text>Save and exit</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="currentStep > 3" step="3" editable>
          Review your course details
          <small class="mt-2">Things to note before you publish to students</small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <div class="mb-2">
            <v-btn color="primary" @click="currentStep = 1">Publish</v-btn>
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
    currentStep: 1,
    itemTypes: ['section', 'quiz'],
    course: {
      title: '',
      description: '',
      chapters: []
    },
    chapterTemplate: {
      title: '',
      sections: []
    }
  })
}
</script>
