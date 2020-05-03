<template>
  <div class="chapter-list">
      <v-expansion-panels v-model="focusedPanel" flat accordion>
        <v-expansion-panel class="py-3">
          <v-expansion-panel-header disable-icon-rotate>
            Course Information
            <template v-slot:actions>
              <v-icon color="primary">mdi-information</v-icon>
            </template>
          </v-expansion-panel-header>
        </v-expansion-panel>

        <v-expansion-panel
          v-for="(chapter, ci) in chapters"
          :key="`chapter${ci}`"
          class="py-3"
        >
          <v-expansion-panel-header :disable-icon-rotate="isChapterCompleted(ci)">
            {{ `Chapter ${ci + 1}: ${chapter.title}` }}
            <template v-if="isChapterCompleted(ci)" v-slot:actions>
              <v-icon color="teal">mdi-check</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="my-n3">
            <v-list>
              <v-list-item
                v-for="(section, si) in chapter.sections"
                :key="`c${ci}s${si}`"
                @click="$emit('selectionChange', 'content', { chapterIndex: ci, sectionIndex: si })"
              >
                <v-list-item-action>
                  <v-checkbox color="primary" value
                    :input-value="progress[ci] && progress[ci].includes(si)"
                    @change="$emit('progressChange', ci, si, $event)"
                  />
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2 py-2">{{ (si + 1) + '. ' + section.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: {
    chapters: {
      type: Array,
      required: true
    },
    progress: {
      type: Object,
      required: true
    }
  },
  watch: {
    focusedPanel (val) {
      if (val === 0) this.$emit('selectionChange', 'info', {})
    }
  },
  data: () => ({
    focusedPanel: 0
  }),
  methods: {
    isChapterCompleted (chapterIndex) {
      if (!this.progress[chapterIndex]) return false
      return this.progress[chapterIndex].length === this.chapters[chapterIndex].sections.length
    }
  }
}
</script>

<style lang="scss" scoped>
  .chapter-list {
    width: 30vw;
    min-width: 300px;
    max-width: 400px;
    height: 100%;
    max-height: 100vh;
    overflow-y: auto;
  }

  @media (max-width: 960px) {
    .chapter-list {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      overflow-y: initial;
    }
  }
</style>
