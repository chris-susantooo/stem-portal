<template>
  <div class="row">
    <div class="col-9">
      <youtube :video-id="videoId" />
    </div>
    <div class="col-3">
      <v-expansion-panels accordion focusable v-model="chapterIndex">
        <v-expansion-panel v-for="(chapter, ci) in course.chapters" :key="'c' + ci">
           <v-expansion-panel-header>
              {{ 'Chapter ' + (ci + 1) + ': ' + chapter.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              d
            </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'
import youtube from 'vue-youtube'

export default {
  components: { youtube },
  beforeCreate () {
    if (!this.$route.params.courseId) {
      this.$router.push({ name: 'home' })
    }
  },
  created () {
    http.readCourse(this.$route.params.courseId).then(({ data: course }) => { this.course = course })
  },
  computed: {
    videoId () {
      return 'YlI4vcBdKuw'
    }
  },
  data: () => ({
    course: {},
    chapterIndex: undefined,
    sectionIndex: undefined,
    checkpointIndex: undefined,
    questionIndex: undefined
  })
}
</script>

<style>

</style>
