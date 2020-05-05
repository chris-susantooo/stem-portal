<template>
  <div class="attachment-list">
    <v-card v-for="(file, i) in files" :key="file._id" class="attachment pa-4 ma-2" outlined>
      <div class="d-flex align-center">
        <div class="flex-grow-1 d-flex text-truncate">
          <v-icon color="primary">mdi-file-document</v-icon>
          <a class="d-inline-block ml-2 subtitle-2 text-truncate"
            :href="baseURL + '/download/' + file.filename"
            target="_blank"
          >
            {{ file.filename.substring(33) }}
          </a>
        </div>
        <v-icon class="ml-2 grey--text" @click="$emit('delete', files[i])">mdi-close</v-icon>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  computed: {
    baseURL: () => process.env.VUE_APP_API_BASE
  }
}
</script>

<style lang="scss" scoped>
  .attachment-list {
    display: flex;
    flex-wrap: wrap;
  }

  .attachment {
    width: 300px;
  }
</style>
