<template>
  <div class="course-creator">
      <tool-bar :options="toolBarOptions" @add="createItem" @delete="deleteItem" />

      <v-expansion-panels accordion focusable v-model="chapterIndex" class="px-2">
        <draggable v-model="chapters" class="reset-draggable">
          <v-expansion-panel v-for="(chapter, ci) in chapters" :key="'c' + ci">

            <v-expansion-panel-header>
              <span class="py-2">{{ 'Chapter ' + (ci + 1) + ': ' + chapter.title }}</span>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="mx-2 pt-3">
              <v-text-field label="Chapter name" v-model="chapters[ci].title" required />

              <v-expansion-panels accordion focusable v-model="sectionIndex">
                <draggable v-model="chapter.sections" class="reset-draggable">
                  <v-expansion-panel v-for="(section, si) in chapter.sections" :key="'c' + ci + 's' + si">
                    <v-expansion-panel-header>
                      {{ `Section ${(ci + 1)}.${(si + 1)}: ${section.title}` }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pt-3">
                      <v-text-field :label="section.type + ' name'" v-model="section.title" required />
                      <v-text-field required
                        v-if="section.type === 'Section'"
                        label="YouTube link"
                        v-model="section.content.video"
                      />
                      <text-editor />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </draggable>
              </v-expansion-panels>
            </v-expansion-panel-content>

          </v-expansion-panel>
        </draggable>
      </v-expansion-panels>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import ToolBar from './ToolBar.vue'
import TextEditor from './TextEditor.vue'

export default {
  components: { Draggable, ToolBar, TextEditor },
  data: () => ({
    chapters: [],
    chapterIndex: undefined,
    sectionIndex: undefined,
    questionIndex: undefined
  }),
  computed: {
    toolBarTitle () {
      if (this.questionIndex !== undefined) {
        const question = this.chapters[this.chapterIndex].sections[this.sectionIndex].content.questions[this.questionIndex]
        return `Question ${this.questionIndex + 1}: ${question.question}`
      } else if (this.sectionIndex !== undefined) {
        const section = this.chapters[this.chapterIndex].sections[this.sectionIndex]
        return `Section ${this.chapterIndex + 1}.${this.sectionIndex + 1}: ${section.title}`
      } else if (this.chapterIndex !== undefined) {
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
      const section = this.chapters[this.chapterIndex].sections[this.sectionIndex]
      if (section === undefined) return undefined
      return (section.type === 'Checkpoint' ? this.sectionIndex : undefined)
    },
    toolBarOptions () {
      return {
        chapters: this.chapters,
        title: this.toolBarTitle,
        chapter: this.chapterIndex,
        section: this.sectionIndex,
        checkpoint: this.checkpointIndex,
        question: this.questionIndex
      }
    }
  },
  methods: {
    createItem (itemType) {
      switch (itemType) {
        case 'chapter':
          this.chapters.push({ title: 'Untitled Chapter', sections: [] })
          this.chapterIndex = this.chapters.length - 1
          break
        case 'section':
          this.chapters[this.chapterIndex].sections.push({ type: 'Section', title: 'Untitled Section', content: { video: '', text: '' } })
          this.sectionIndex = this.chapters[this.chapterIndex].sections.length - 1
          break
        case 'checkpoint':
          this.chapters[this.chapterIndex].sections.push({ type: 'Checkpoint', title: 'Untitled Checkpoint', content: { questions: [], text: '' } })
          this.sectionIndex = this.chapters[this.chapterIndex].sections.length - 1
          break
        case 'question':
          this.chapters[this.chapterIndex].sections[this.checkpointIndex].content.questions.push({ question: '', options: [], answers: [] })
      }
    },
    deleteItem (itemType) {
      switch (itemType) {
        case 'chapter':
          this.chapters.splice(this.chapterIndex, 1)
          this.chapterIndex = this.chapters.length ? Math.max(0, this.chapterIndex - 1) : undefined
          // watchers don't kick in immediately, we reset the following indices manually
          this.questionIndex = undefined
          this.sectionIndex = undefined
          break
        case 'section':
        case 'checkpoint':
          this.chapters[this.chapterIndex].sections.splice(this.sectionIndex, 1)
          this.sectionIndex = this.chapters[this.chapterIndex].sections.length ? Math.max(0, this.sectionIndex - 1) : undefined
          break
        case 'question':
          const questions = this.chapters[this.chapterIndex].sections[this.checkpointIndex].content.questions
          questions[this.questionIndex].splice(this.questionIndex, 1)
          this.questionIndex = questions.length ? Math.max(0, this.questionIndex - 1) : undefined
      }
    }
  },
  watch: {
    chapterIndex (newValue) {
      this.questionIndex = undefined
      this.sectionIndex = undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-draggable {
  height: 100% !important;
  width: 100% !important;
}
</style>
