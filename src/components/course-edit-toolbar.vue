<template>
  <v-toolbar dark class="ma-2">
    {{ options.title }}
    <v-spacer />
    <div class="d-none d-sm-flex">
      <div class="text-center">
        <v-menu offset-y dark :open-on-hover="chapterSelected && subItemSelected" :open-on-click="false">
          <template v-slot:activator="{ on }">
            <v-btn text v-show="chapterSelected || subItemSelected" v-on="on" @click="deleteChapter">
              <v-icon>mdi-delete-circle</v-icon>&nbsp;Delete
              {{ chapterSelected && subItemSelected ? '...' : ' chapter' }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$emit('delete', 'chapter')">
              <v-list-item-title>Chapter</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="sectionSelected" @click="$emit('delete', 'section')">
              <v-list-item-title>Section</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="checkPointSelected" @click="$emit('delete', 'checkpoint')">
              <v-list-item-title>Checkpoint</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="questionSelected" @click="$emit('delete', 'question')">
              <v-list-item-title>Question</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y dark :open-on-hover="chapterSelected" :open-on-click="false">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" @click="!chapterSelected ? $emit('add', 'chapter') : null">
              <v-icon>mdi-plus-circle</v-icon> &nbsp;{{ chapterSelected ? 'New...' : ' chapter' }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$emit('add', 'chapter')">
              <v-list-item-title>Chapter</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="chapterSelected" @click="$emit('add', 'section')">
              <v-list-item-title>Section</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="chapterSelected" @click="$emit('add', 'checkpoint')">
              <v-list-item-title>Checkpoint</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="checkPointSelected" @click="$emit('add', 'question')">
              <v-list-item-title>Question</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="questionSelected" @click="$emit('add', 'option')">
              <v-list-item-title>Option</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div class="d-flex d-sm-none">
      <div class="text-center">
        <v-menu offset-y dark
          :open-on-hover="chapterSelected && subItemSelected"
          :open-on-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="deleteChapter">
              <v-icon>mdi-delete-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$emit('delete', 'chapter')">
              <v-list-item-title>Chapter</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="sectionSelected" @click="$emit('delete', 'section')">
              <v-list-item-title>Section</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="checkPointSelected" @click="$emit('delete', 'checkpoint')">
              <v-list-item-title>Checkpoint</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="questionSelected" @click="$emit('delete', 'question')">
              <v-list-item-title>Question</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y dark :open-on-hover="chapterSelected" :open-on-click="false">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="!chapterSelected ? $emit('add', 'chapter') : null">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$emit('add', 'chapter')">
              <v-list-item-title>Chapter</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="chapterSelected" @click="$emit('add', 'section')">
              <v-list-item-title>Section</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="chapterSelected" @click="$emit('add', 'checkpoint')">
              <v-list-item-title>Checkpoint</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="checkPointSelected" @click="$emit('add', 'question')">
              <v-list-item-title>Question</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="questionSelected" @click="$emit('add', 'option')">
              <v-list-item-title>Option</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    chapterSelected () {
      return this.options.chapter !== undefined
    },
    sectionSelected () {
      return this.options.section !== undefined && this.options.checkpoint === undefined
    },
    checkPointSelected () {
      return this.options.checkpoint !== undefined
    },
    questionSelected () {
      return this.options.question !== undefined
    },
    subItemSelected () {
      return this.options.section !== undefined || this.options.question !== undefined
    }
  },
  methods: {
    deleteChapter () {
      if (this.chapterSelected && !this.subItemSelected) this.$emit('delete', 'chapter')
    }
  }
}
</script>
