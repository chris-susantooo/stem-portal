<template>
  <div class="course-edit container py-0">

  </div>
</template>

<script>

export default {
  async created () {
    if (!this.$route.params.id) return
    this.$emit('childBusy')
    await this.fetchCourse()
    this.$emit('childReady')
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
    }
  }),
  methods: {
    fetchCourse () {
      const _courseId = this.$route.params.id
      return new Promise((resolve, reject) => {
        if (!_courseId) resolve()
        this.$http.get(`courses/${_courseId}`)
          .then(({ data: { course } }) => {
            this.course = course
          })
          .catch(err => console.log(err))
          .finally(() => resolve())
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-edit {
    min-height: calc(100vh - 4rem);
    display: flex;
  }
</style>
