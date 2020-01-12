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
          <small class="pt-2">Let us know what is it about</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-form v-model="isCourseInfoValid" class="mt-2">
            <v-text-field outlined required
              :error-messages="courseProps.errMsgs"
              :count="60"
              :rules="courseProps.courseName"
              label="Course title"
              v-model="course.title"
              :hint="courseProps.hint"
            />
            <v-textarea outlined :rules="courseProps.shortDesc" label="Short description" v-model="course.description" required />
            <v-combobox multiple outlined chips clearable
              v-model="course.tags"
              :items="tags"
              label="Your course tags"
              :rules="courseProps.tag"
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="removeTag(item)"
                >
                <v-avatar class="accent white--text" left>
                  {{ item.slice(0, 1).toUpperCase() }}
                </v-avatar>
                  {{ item }}
                </v-chip>
              </template>
            </v-combobox>
          </v-form>
          <div class="pt-2 pb-2">
            <v-btn color="primary" @click="next(2)">Continue</v-btn>
            <v-btn class="ml-2" text @click="saveExit">Save and exit</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="currentStep > 2" step="2" :editable="isCourseValid && isCourseInfoValid">
          Structure your course with progressive chapters
          <small class="mt-2">A chapter may contain sections and checkpoints</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <course-content-creator :save="trigger" @saveCourse="saveCourse" @courseValidationChanged="setCourseValid" />
          <div class="mt-2 py-2">
            <v-btn color="primary" @click="next(3)">Continue</v-btn>
            <v-btn class="ml-2" text @click="saveExit">Save and exit</v-btn>
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
            <v-btn class="ml-2" text @click="saveExit">Save and exit</v-btn>
          </div>
        </v-stepper-content>
      </v-stepper>
    </div>
  </div>
</template>

<script>
import CourseContentCreator from '@/components/teachers/courses/Creator.vue'
import http from '@/utils/http'

export default {
  components: { CourseContentCreator },
  created () {
    const courseId = this.$route.params.courseId
    if (courseId) {
      http.readCourse(courseId).then(({ data: course }) => {
        course.chapters = JSON.parse(course.chapters)
        this.course = course
      })
    }
    this.course.author = this.$store.getters.user.username
    this.$http.get('tags').then(({ data: tags }) => { this.tags = tags })
  },
  computed: {
    courseTitle () { return this.course.title }
  },
  data: () => ({
    isCourseInfoValid: true,
    isCourseValid: true,
    tags: [],
    currentStep: 1,
    trigger: true,
    course: {
      id: '',
      author: '',
      title: '',
      tags: [],
      description: '',
      chapters: []
    },
    courseProps: {
      errMsgs: '',
      hint: '',
      tag: [ v => !!v.length || 'At least a tag is required' ],
      courseName: [
        v => !!v || 'Name is required',
        v => (v.length >= 10 && v.length <= 60) || 'Must be 10 to 60 characters long'
      ],
      shortDesc: [ v => !!v || 'Description is required' ]
    }
  }),
  methods: {
    saveCourse (chapters = []) {
      if (chapters) this.course.chapters = chapters
      if (this.isCourseInfoValid && this.isCourseValid) {
        const course = { ...this.course }
        course.chapters = JSON.stringify(course.chapters)
        this.course.id ? http.updateCourse(course) : http.createCourse(course)
          .then(({ data: course }) => {
            course.chapters = JSON.parse(course.chapters)
            this.course = course
            this.$http.get('tags').then(({ data: tags }) => { this.tags = tags })
          })
          .catch(err => { console.log(err) })
      }
    },
    next (to) {
      if (this.isCourseInfoValid && this.isCourseValid) {
        this.currentStep = to
        this.trigger = !this.trigger
      }
    },
    saveExit () {
      this.trigger = !this.trigger
      this.$router.push({ name: 'online-course' })
    },
    setCourseValid (isCourseValid) {
      this.isCourseValid = isCourseValid
    },
    removeTag (item) {
      this.course.tags.splice(this.course.tags.indexOf(item), 1)
      this.course.tags = [ ...this.course.tags ]
    }
  },
  watch: {
    courseTitle (val) {
      setTimeout(() => {
        const isValid = this.courseProps.courseName.every(r => typeof r(val) !== 'string')
        if (val === this.course.title && isValid) {
          http.checkCourse(val)
            .then(() => {
              this.courseProps.hint = undefined
              this.courseProps.errMsgs = 'Name already used'
            })
            .catch(() => {
              this.courseProps.hint = 'Name available'
              this.courseProps.errMsgs = ''
            })
        }
      }, 1000)
    }
  }
}
</script>
