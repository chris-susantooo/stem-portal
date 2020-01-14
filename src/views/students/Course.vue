<template>
  <div class="row mt-n3">
    <div class="col-9 pr-0">
      <div class="section-content">
        <div v-if="showCourse" class="text-center mt-6">
          <h1>{{ course.title }}</h1>
          <v-row align="center" justify="center">
            <router-link to="#">{{ course.author }}</router-link>
            <v-rating dense half-increments
              :value="course.ratings.length ? courseRating : 4"
              color="amber"
              size="25"
              class="ml-3"
            />
            <div class="grey--text ml-4">{{ course.ratings.length ? courseRating + ' (' + course.ratings.length + ')' : 'No ratings yet' }}</div>
          </v-row>
          <div class="mb-12" />
          <p>{{ course.description }}</p>
          <div class="d-flex justify-center mt-11">
            <v-chip-group active-class="primary--text">
              <v-chip v-for="tag in course.tags" :key="tag">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </div>
        </div>
        <div v-show="showSection" :key="showSection">
          <keep-alive>
            <youtube :video-id="videoId" resize fitParent ref="youtube" />
          </keep-alive>
        </div>
        <div v-if="showCheckpoint">
          Checkpoint
        </div>
      </div>
    </div>
    <div class="col-3">
      <v-expansion-panels accordion focusable v-model="ci">
        <v-expansion-panel v-for="(chapter, ci) in course.chapters" :key="'c' + ci">
           <v-expansion-panel-header>
              <span class="py-3">{{ 'Chapter ' + (ci + 1) + ': ' + chapter.title }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mx-n4 pt-2 mb-n2">
              <v-list>
                <v-list-item v-for="(section, si) in chapter.sections" :key="'c' + ci + 's' + si" @click="setIndices(ci, si)">
                  <v-list-item-action>
                    <v-checkbox v-model="progress[ci][si]" color="primary"/>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="py-1">{{ (si + 1) + '. ' + section.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'

export default {
  beforeCreate () {
    if (!this.$route.params.courseId) {
      this.$router.push({ name: 'home' })
    }
  },
  created () {
    http.readCourse(this.$route.params.courseId).then(({ data: course }) => {
      this.course = course
      this.initProgress(course.chapters)
    })
  },
  computed: {
    showCheckpoint () {
      return this.chapterIndex !== undefined && this.sectionIndex !== undefined && this.course.chapters[this.chapterIndex].sections[this.sectionIndex].type === 'Checkpoint'
    },
    showSection () {
      return this.chapterIndex !== undefined && this.sectionIndex !== undefined && this.course.chapters[this.chapterIndex].sections[this.sectionIndex].type === 'Section'
    },
    showCourse () {
      return this.sectionIndex === undefined
    },
    videoId () {
      if (this.chapterIndex === undefined || this.sectionIndex === undefined) return ''
      const section = this.courses.chapters[this.chapterIndex].sections[this.sectionIndex]
      if (section.type === 'Checkpoint') return ''
      const video = section.content.video
      if (video.includes('http')) return video.split('=')[1]
      return video
    },
    courseRating () {
      const votes = this.course.ratings.length
      if (!votes) return 4
      return this.course.ratings.reduce((total, rating) => (total + rating.score), 0) / votes
    }
  },
  data: () => ({
    course: {},
    progress: [],
    ci: undefined,
    sectionIndex: undefined,
    chapterIndex: undefined
  }),
  methods: {
    initProgress (chapters) {
      chapters.forEach(chapter => {
        const chapterProgress = []
        chapter.sections.forEach(section => { chapterProgress.push(false) })
        this.progress.push(chapterProgress)
      })
    },
    setIndices (chapterIndex, sectionIndex) {
      this.chapterIndex = chapterIndex
      this.sectionIndex = sectionIndex
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
