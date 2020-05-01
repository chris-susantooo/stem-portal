<template>
  <div class="course-edit-chapter">
    <tool-bar :options="toolBarOptions" @add="createItem" @delete="deleteItem" />
    <v-form v-model="areChaptersValid" :lazy-validation="false">
      <v-expansion-panels accordion focusable v-model="chapterIndex" class="px-2">
        <draggable :list="chapters" handle=".handle" class="reset-draggable">
          <v-expansion-panel v-for="(chapter, ci) in chapters" :key="'c' + ci">

            <v-expansion-panel-header>
              <v-icon class="handle">mdi-drag-vertical</v-icon>
              <span class="py-2">{{ 'Chapter ' + (ci + 1) + ': ' + chapter.title }}</span>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="mt-3 mx-2 pt-3">
              <v-text-field outlined :counter="60" :rules="nameRules('Chapter', 60)" label="Chapter name" v-model="chapter.title" required />

              <v-expansion-panels accordion focusable v-model="sectionIndex">
                <draggable :list="chapter.sections" handle=".handle" class="reset-draggable">
                  <v-expansion-panel v-for="(section, si) in chapter.sections" :key="'c' + ci + 's' + si">
                    <v-expansion-panel-header>
                      <v-icon class="handle">mdi-drag-vertical</v-icon>
                      {{ `Section ${(ci + 1)}.${(si + 1)}: ${section.title}` }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pt-3 mt-3">
                      <v-text-field outlined :counter="60" :rules="nameRules(section.type, 60)" :label="section.type + ' name'" v-model="section.title" required />
                      <template v-if="section.type === 'Section'">
                        <v-text-field outlined :rules="linkRules" label="YouTube link or video ID" v-model="section.content.video" required />
                        <text-editor v-model="section.content.text" />
                        <div class="mt-4" />
                      </template>
                      <template v-else>
                        <text-editor v-model="section.content.text" />
                        <div class="mt-4" />

                        <v-expansion-panels accordion focusable v-model="questionIndex" class="pt-3">
                          <draggable :list="section.content.questions" handle=".handle" class="reset-draggable">
                            <v-expansion-panel v-for="(question, qi) in section.content.questions" :key="'c' + ci + 's' + si + 'q' + qi">
                              <v-expansion-panel-header>
                                <v-icon class="handle">mdi-drag-vertical</v-icon>
                                {{ `Question ${qi + 1}: ${question.title}` }}
                              </v-expansion-panel-header>
                              <v-expansion-panel-content class="mt-3 pt-3">
                                <v-text-field outlined :rules="nameRules('Question')" label="Your question here" v-model="question.title" required />
                                One or more answers may be selected.
                                <v-card flat>
                                  <v-card-text class="mb-n4 mt-3">
                                    <v-row v-for="(option, oi) in question.options" :key="'c' + ci + 's' + si + 'q' + qi + 'o' + oi" class="my-n2" >
                                      <v-checkbox v-model="question.answers" :value="String.fromCharCode('A'.charCodeAt(0) + oi)" hide-details />
                                      <v-text-field
                                        outlined
                                        :counter="100"
                                        :rules="nameRules('Option', 100)"
                                        v-model="option.title"
                                        :append-outer-icon="'mdi-delete'"
                                        :label="'Option ' + String.fromCharCode('A'.charCodeAt(0) + oi)"
                                        @click:append-outer="deleteOption(oi)"
                                      />
                                    </v-row>
                                  </v-card-text>
                                </v-card>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </draggable>
                        </v-expansion-panels>
                      </template>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </draggable>
              </v-expansion-panels>
            </v-expansion-panel-content>

          </v-expansion-panel>
        </draggable>
      </v-expansion-panels>
    </v-form>
    <div class="mt-4">
      <v-btn text color="primary" @click="emitNextIfValid">Save and Continue</v-btn>
      <v-btn text @click="emitPrevIfValid">Back</v-btn>
    </div>
  </div>
</template>

<script>
import ToolBar from '@/components/course-edit-toolbar.vue'
import Draggable from 'vuedraggable'
import TextEditor from '@/components/text-editor.vue'

export default {
  components: { Draggable, ToolBar, TextEditor },
  props: {
    sourceChapters: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    areChaptersValid: false,
    chapters: [],
    chapterIndex: undefined,
    sectionIndex: undefined,
    questionIndex: undefined,
    linkRules: [
      v => !!v || 'A YouTube link or video ID is required'
    ]
  }),
  computed: {
    toolBarTitle () {
      if (this.questionIndex !== undefined) {
        const question = this.chapters[this.chapterIndex].sections[this.sectionIndex].content.questions[this.questionIndex]
        return `Question ${this.questionIndex + 1}: ${question.title}`
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
          this.chapters[this.chapterIndex].sections.push({ type: 'Section', title: 'Untitled Section', content: { video: '', text: '<p>Your section content...</p>' } })
          this.sectionIndex = this.chapters[this.chapterIndex].sections.length - 1
          break
        case 'checkpoint':
          this.chapters[this.chapterIndex].sections.push({ type: 'Checkpoint', title: 'Untitled Checkpoint', content: { questions: [], text: '<p>Your checkpoint description...</p>' } })
          this.sectionIndex = this.chapters[this.chapterIndex].sections.length - 1
          break
        case 'question':
          const questions = this.chapters[this.chapterIndex].sections[this.checkpointIndex].content.questions
          questions.push({ title: '', options: [], answers: [] })
          this.questionIndex = questions.length - 1
          break
        case 'option':
          const question = this.chapters[this.chapterIndex].sections[this.checkpointIndex].content.questions[this.questionIndex]
          question.options.push({ title: '' })
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
          this.questionIndex = undefined
          break
        case 'question':
          const questions = this.chapters[this.chapterIndex].sections[this.checkpointIndex].content.questions
          questions[this.questionIndex].splice(this.questionIndex, 1)
          this.questionIndex = questions.length ? Math.max(0, this.questionIndex - 1) : undefined
          break
      }
    },
    deleteOption (optionIndex) {
      if (this.chapterIndex !== undefined && this.checkpointIndex !== undefined && this.questionIndex !== undefined) {
        const options = this.chapters[this.chapterIndex].sections[this.checkpointIndex].content.questions[this.questionIndex].options
        options.splice(optionIndex, 1)
      }
    },
    nameRules (name, length) {
      const rules = [ v => !!v || 'This field is required', v => v !== 'Untitled ' + name || 'Please use a valid name' ]
      if (length) rules.push(v => (v && v.length <= length) || 'This field must be less than ' + length + ' characters')
      return rules
    },
    emitNextIfValid () {
      if (this.areChaptersValid) this.$emit('next', 3)
    },
    emitPrevIfValid () {
      if (this.areChaptersValid) this.$emit('previous')
    }
  },
  watch: {
    chapterIndex () {
      this.questionIndex = undefined
      this.sectionIndex = undefined
    },
    sectionIndex () {
      this.questionIndex = undefined
    },
    sourceChapters (val) {
      if (val.length) this.chapters = val
    },
    chapters: {
      deep: true,
      handler (val) {
        if (!this.areChaptersValid) return
        this.$emit('change', { chapters: val })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .reset-draggable {
    height: 100% !important;
    width: 100% !important;
  }
  .handle {
    flex: none;
    margin-right: 15px;
    cursor: grab;
  }
</style>
