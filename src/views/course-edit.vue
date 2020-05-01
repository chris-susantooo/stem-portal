<template>
  <div class="course-edit container">
    <h1 class="px-2 my-3 pb-3">{{ `${isCourseNew ? 'Create' : 'Edit'} Your Course` }}</h1>

    <v-stepper v-model="step" vertical>
      <v-stepper-step :complete="step > 1" step="1" :editable="true">
        Basic information about your course
        <small class="pt-2">Let us know what is it about</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <basic-info-editor :course="course" @change="setCourse" @next="saveAndContinue" />
      </v-stepper-content>
      <v-stepper-step :complete="step > 2" step="2" :editable="true">
        Structure your course with progressive chapters
        <small class="pt-2">A chapter may contain sections and checkpoints</small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <chapter-editor
          :sourceChapters="course.chapters"
          @change="setCourse"
          @next="saveAndContinue"
          @previous="step -= 1"
        />
      </v-stepper-content>
      <v-stepper-step :complete="step > 3" step="3" :editable="true">
        Preview and Publish
        <small class="pt-2">Once you publish the course it will be publicly available</small>
      </v-stepper-step>
    </v-stepper>
  </div>
</template>

<script>
import BasicInfoEditor from '@/components/course-edit-basic.vue'
import ChapterEditor from '@/components/course-edit-chapters.vue'

export default {
  components: { BasicInfoEditor, ChapterEditor },
  async created () {
    if (this.isCourseNew) {
      this.course.author = this.user._id
      return
    }
    this.$emit('childBusy')
    await this.fetchCourse()
    this.$emit('childReady')
  },
  computed: {
    isCourseNew () {
      return !this.$route.params.id
    },
    user () {
      return this.$store.getters.user
    }
  },
  data: () => ({
    step: 1,
    course: {
      _id: '',
      author: '',
      name: '',
      tags: [],
      description: '',
      chapters: [],
      published: false
    }
  }),
  methods: {
    fetchCourse () {
      return new Promise((resolve, reject) => {
        if (this.isCourseNew) resolve()
        this.$http.get(`courses/${this.$route.params.id}`)
          .then(({ data: { course } }) => {
            this.course = course
          })
          .catch(err => console.log(err))
          .finally(() => resolve())
      })
    },
    saveCourse () {
      const { name, description, tags, chapters } = this.course
      const serialized = { name, description, tags, chapters }

      return new Promise((resolve, reject) => {
        if (this.isCourseNew) {
          this.$http.post('courses', serialized)
            .then(({ data: { course } }) => {
              this.course = course
              const url = location.href.split('?')[0]
              history.pushState('', '', `${url}/${this.course._id}`)
            })
            .catch(err => console.log(err))
            .finally(() => resolve())
        } else {
          this.$http.put(`courses/${this.course._id}`, serialized)
            .catch(err => console.log(err))
            .finally(() => resolve())
        }
      })
    },
    setCourse (newProperties) {
      this.course = {
        ...this.course,
        ...newProperties
      }
    },
    async saveAndContinue (toStep) {
      await this.saveCourse()
      this.step = toStep
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
