<template>
  <div class="course-view flex-md-row">
    <content-display
      :course="course"
      :page="display"
      :progress="progress"
      @complete="markSectionComplete"
    />
    <chapter-list
      :chapters="course.chapters"
      :progress="progress"
      @progressChange="updateProgress"
      @selectionChange="displayNewContent"
    />
  </div>
</template>

<script>
import ContentDisplay from '@/components/course-view-display.vue'
import ChapterList from '@/components/course-view-chapters.vue'

export default {
  components: { ContentDisplay, ChapterList },
  async created () {
    await this.fetchCourse()
    if (this.isPreview) {
      if (this.course.author._id !== this.user._id) {
        this.$router.push({ name: 'login', params: { next: 'course-list' } })
      }
    } else {
      if (!this.course.published) {
        this.$router.push({ name: 'login', params: { next: 'course-list' } })
      }
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    isPreview () {
      return this.$route.name === 'course-preview'
    },
    user () {
      return this.$store.getters.user
    }
  },
  data: () => ({
    course: {
      _id: '',
      author: '',
      name: '',
      tags: [],
      description: '',
      chapters: [],
      published: false
    },
    display: {
      type: 'info',
      chapterIndex: 0,
      sectionIndex: 0
    },
    progress: {}
  }),
  methods: {
    fetchCourse () {
      return new Promise((resolve, reject) => {
        this.$http.get(`courses/${this.$route.params.id}`)
          .then(({ data: { course, progress } }) => {
            this.course = course
            if (progress) this.progress = progress
          })
          .catch(err => console.log(err))
          .finally(() => resolve())
      })
    },
    updateProgress (chapterIndex, sectionIndex, finished) {
      if (this.isPreview || !this.isLoggedIn) return
      if (finished) {
        this.progress[chapterIndex]
          ? this.progress[chapterIndex].push(sectionIndex)
          : this.progress[chapterIndex] = [ sectionIndex ]
      } else {
        this.progress[chapterIndex] = this.progress[chapterIndex].filter(item => item !== sectionIndex)
      }
      this.progress = { ...this.progress }
      this.$http.put(`courses/${this.course._id}/progress`, { progress: this.progress })
        .catch(err => console.log(err))
    },
    displayNewContent (contentType, options) {
      this.display = {
        type: contentType,
        ...options
      }
    },
    markSectionComplete () {
      const chapterProgress = this.progress[this.display.chapterIndex]
      if (!chapterProgress) {
        this.progress[this.display.chapterIndex] = [this.display.sectionIndex]
        return
      }
      if (!chapterProgress.includes(this.display.sectionIndex)) {
        chapterProgress.push(this.display.sectionIndex)
      }
      this.progress = { ...this.progress }
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-view {
    flex-grow: 1;
  }
</style>
