<template>
  <div class="attachment-list">
    <v-card v-for="(filename, i) in filenames" :key="filename" class="attachment pa-4 ma-2" outlined>
      <div class="d-flex align-center">
        <div class="flex-grow-1 d-flex text-truncate">
          <v-icon color="primary">mdi-file-document</v-icon>
          <a class="d-inline-block ml-2 subtitle-2 text-truncate"
            @click="fetchAttachment(files[i])"
            target="_blank"
          >
            {{ filename.substring(33) }}
          </a>
        </div>
        <v-icon v-if="deletable" class="ml-2 grey--text" @click="$emit('delete', files[i])">mdi-close</v-icon>
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
    },
    deletable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    filenames () {
      return this.files.map(link => link.replace(`${this.baseURL}/download/`, ''))
    },
    baseURL: () => process.env.VUE_APP_API_BASE
  },
  methods: {
    fetchAttachment (link) {
      this.$http.get(link, { responseType: 'blob' })
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const a = document.createElement('a')
          a.href = url
          a.setAttribute('download', link.replace(`${this.baseURL}/download/`, ''))
          document.body.appendChild(a)
          a.click()
        })
    }
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
