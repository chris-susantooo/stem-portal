<template>
  <div class="course-creator">
      <tool-bar :options="toolBarOptions" @add="createChapter" @delete="deleteChapter" />
      <v-expansion-panels accordion focusable v-model="chapterIndex" class="my-5 px-2">
        <draggable v-model="chapters" class="chapters">
          <v-expansion-panel v-for="(chapter, index) in chapters" :key="'c' + index">
            <v-expansion-panel-header class="my-2">
              {{ 'Chapter ' + (index + 1) + ': ' + chapter.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mx-5">
              <v-text-field label="Chapter name" v-model="chapters[index].title" required />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </draggable>
      </v-expansion-panels>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import ToolBar from './ToolBar.vue'

export default {
  components: { Draggable, ToolBar },
  data: () => ({
    chapters: [],
    chapterIndex: undefined,
    sectionIndex: undefined,
    questionIndex: undefined
  }),
  computed: {
    toolBarOptions () {
      return {
        title: this.toolBarTitle,
        chapter: this.chapterIndex,
        section: this.sectionIndex,
        checkpoint: this.checkpointIndex,
        question: this.questionIndex
      }
    },
    toolBarTitle () {
      if (this.chapterIndex !== undefined) {
        return `Chapter ${this.chapterIndex + 1}: ${this.chapters[this.chapterIndex].title}`
      } else if (!this.chapters.length) {
        return 'Create and edit chapters with controls on the right.'
      } else {
        return 'Drag and drop to re-order your items.'
      }
    },
    checkpointIndex () {
      if (this.chapterIndex === undefined) return undefined
      if (this.sectionIndex === undefined) return undefined
      const section = this.chapters[this.chapterIndex][this.sectionIndex]
      if (section === undefined) return undefined
      return (section.type === 'checkpoint' ? this.sectionIndex : undefined)
    }
  },
  methods: {
    createChapter () {
      this.chapters.push({ title: 'Untitled Chapter', sections: [] })
      this.chapterIndex = this.chapters.length - 1
    },
    deleteChapter () {
      if (this.chapterIndex !== undefined) {
        this.chapters.splice(this.chapterIndex, 1)
        this.chapterIndex = this.chapters.length ? Math.max(0, this.chapterIndex - 1) : undefined
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chapters {
  height: 100% !important;
  width: 100% !important;
}
</style>
