<template>
  <v-dialog :value="value" @input="$emit('input', $event)" max-width="800">
    <v-card>
      <vue-file-agent
        v-model="files"
        :multiple="true"
        :deletable="true"
        :meta="false"
        :maxFiles="10"
        @delete="deleteFile"
        ref="uploader"
      />
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="$emit('input', false)">Back</v-btn>
        <v-btn color="primary" text
          :loading="uploading"
          :disabled="uploading || !files.length"
          @click="uploadFiles"
        >
          Upload {{ (files.length ? `${files.length} file`: '') + (files.length > 1 ? 's' : '') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    files: [],
    uploading: false
  }),
  computed: {
    token () {
      return this.$store.getters.token
    },
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    uploadFiles () {
      if (!this.isLoggedIn) return

      this.uploading = true
      const url = process.env.VUE_APP_API_BASE + '/uploads'
      const headers = { Authorization: `Bearer ${this.token}` }
      this.$refs.uploader.upload(url, headers, this.files)
        .then(res => {
          this.$emit('finish', res.map(res => res.body))
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.uploading = false
          this.files = []
          this.$emit('input', false)
        })
    },
    deleteFile (file) {
      const i = this.files.indexOf(file)
      this.files.splice(i, 1)
    }
  }
}
</script>

<style lang="scss">
  .vue-file-agent {
    border: none !important;
    border-radius: $border-radius-root;
    padding: 1rem;
    font-family: $body-font-family !important;

    .file-preview-wrapper {
      border: none !important;
      border-radius: $border-radius-root;
      margin: .5rem !important;
      overflow: hidden;
    }
  }
</style>
