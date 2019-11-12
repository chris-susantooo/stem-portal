<template>
  <v-toolbar dark class="ma-2">
    {{ options.title }}
    <v-spacer />
    <div class="d-none d-sm-flex">
      <div class="text-center">
        <v-menu offset-y dark
          :open-on-hover="!(options.section === undefined && options.checkpoint === undefined && options.question === undefined)"
          :open-on-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" @click="options.chapter === undefined ? null : $emit('delete', 'chapter')">
              <v-icon>mdi-delete-circle</v-icon>&nbsp;Delete
              {{ !(options.section === undefined && options.checkpoint === undefined && options.question === undefined) ? '...' : '' }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$emit('delete', 'chapter')">
              <v-list-item-title>Chapter</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="options.section !== undefined" @click="$emit('delete', 'section')">
              <v-list-item-title>Section</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="options.checkpoint !== undefined" @click="$emit('delete', 'checkpoint')">
              <v-list-item-title>Checkpoint</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="options.chapter !== undefined && options.checkpoint !== undefined && options.question !== undefined"
              @click="$emit('delete', 'question')"
            >
              <v-list-item-title>Question</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y dark :open-on-hover="options.chapter !== undefined" :open-on-click="false">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" @click="options.chapter === undefined ? $emit('add', 'chapter') : null">
              <v-icon>mdi-plus-circle</v-icon> &nbsp;{{ options.chapter !== undefined ? 'New...' : ' chapter' }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$emit('add', 'chapter')">
              <v-list-item-title>Chapter</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="options.chapter !== undefined" @click="$emit('add', 'section')">
              <v-list-item-title>Section</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="options.chapter !== undefined" @click="$emit('add', 'checkpoint')">
              <v-list-item-title>Checkpoint</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="options.chapter !== undefined && options.checkpoint !== undefined" @click="$emit('add', 'question')">
              <v-list-item-title>Question</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div class="d-flex d-sm-none">
      <div class="text-center">
        <v-menu offset-y dark :open-on-hover="options.chapter !== undefined" :open-on-click="false">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="options.chapter === undefined ? $emit('delete', 'chapter') : null">
              <v-icon>mdi-delete-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$emit('delete', 'chapter')">
              <v-list-item-title>Chapter</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="options.chapter !== undefined" @click="$emit('delete', 'section')">
              <v-list-item-title>Section</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="options.chapter !== undefined" @click="$emit('delete', 'checkpoint')">
              <v-list-item-title>Checkpoint</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="options.chapter !== undefined && options.checkpoint !== undefined && options.question !== undefined"
              @click="$emit('add', 'question')"
            >
              <v-list-item-title>Question</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y dark :open-on-hover="options.chapter !== undefined" :open-on-click="false">
          <template v-slot:activator="{ on }">
            <v-btn icon @click="options.chapter === undefined ? $emit('add', 'chapter') : null">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-if="options.chapter === undefined" @click="$emit('add', 'chapter')">
              <v-list-item-title>Chapter</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="options.chapter !== undefined" @click="$emit('add', 'section')">
              <v-list-item-title>Section</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="options.chapter !== undefined" @click="$emit('add', 'checkpoint')">
              <v-list-item-title>Checkpoint</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="options.chapter !== undefined && options.checkpoint !== undefined" @click="$emit('add', 'question')">
              <v-list-item-title>Question</v-list-item-title>
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
  }
}
</script>
