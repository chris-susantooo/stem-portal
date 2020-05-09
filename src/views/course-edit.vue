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
      <v-stepper-content step="3">
        <div class="d-flex px-2 align-center">
          <span class="subtitle-1 mr-3 pb-3">Preview Your Course: </span>
          <v-text-field solo readonly
            class="mt-4 preview-link body-2"
            :value="previewLink"
            append-icon="mdi-content-copy"
            @click:append="copyToClipboard(previewLink)"
            ref="preview-link"
          />
        </div>
        <div class="actions pa-1">
          <v-btn depressed v-if="!course.published" color="primary" @click="showDialog('publish')">Save and Publish</v-btn>
          <v-btn depressed v-else color="error" @click="showDialog('unpublish')">Unpublish</v-btn>
          <v-btn text @click="step -= 1" class="ml-2">Back</v-btn>
        </div>
      </v-stepper-content>
    </v-stepper>

    <v-dialog v-model="dialogShow" max-width="400">
      <v-card v-if="dialogShow" class="pt-5 px-5">
        <v-card-title class="title">{{ dialogContent[dialogType].title }}</v-card-title>
        <v-card-text>{{ dialogContent[dialogType].text }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialogShow = false">No</v-btn>
          <v-btn text
            :color="dialogType === 'publish' ? 'primary' : 'error'"
            @click="saveAndTogglePublishCourse"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import BasicInfoEditor from '@/components/course-edit-basic.vue'
import ChapterEditor from '@/components/course-edit-chapters.vue'

export default {
  components: { BasicInfoEditor, ChapterEditor },
  async created () {
    if (!this.$route.params.id) {
      this.course.author = this.user._id
      return
    }
    this.$emit('childBusy')
    await this.fetchCourse()
    this.$emit('childReady')
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    previewLink () {
      return location.href.replace('edit', 'preview')
    }
  },
  data: () => ({
    isCourseNew: true,
    step: 1,
    course: {
      _id: '',
      author: '',
      name: '',
      tags: [],
      description: '',
      chapters: [],
      published: false
    },
    dialogShow: false,
    dialogType: '',
    dialogContent: {
      publish: {
        title: 'Publish Confirmation',
        text: 'Are you sure you would like to publish this course to the public?'
      },
      unpublish: {
        title: 'Unpublish Confirmation',
        text: 'Are you sure you would like to unpublish this course?'
      }
    }
  }),
  methods: {
    fetchCourse () {
      return new Promise((resolve, reject) => {
        this.$http.get(`courses/${this.$route.params.id}`)
          .then(({ data: { course } }) => {
            this.isCourseNew = false
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
              const url = location.href.split('/new')[0]
              history.pushState('', '', `${url}/${this.course._id}`)
              this.isCourseNew = false
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
    },
    copyToClipboard (str) {
      const el = document.createElement('textarea')
      el.value = str
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    },
    showDialog (msgType) {
      this.dialogType = msgType
      this.dialogShow = true
    },
    saveAndTogglePublishCourse () {
      this.course.published = !this.course.published
      this.$http.post(`courses/${this.course._id}/${this.dialogType}`)
        .then(() => {
          if (this.course.published) {
            this.$store.dispatch('fetchUser')
            this.$router.push({ name: 'course-list' })
          }
        })
        .catch(err => console.log(err))
        .finally(() => (this.dialogShow = false))
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-edit {
    flex-grow: 1;
  }
  .preview-link {
    max-width: 500px;
  }
</style>
