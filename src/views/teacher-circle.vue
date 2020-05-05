<template>
  <div class="teacher-circle container">
    <attachment-list :files="uploadedAttachments" @delete="deleteAttachment" />
    <v-btn text rounded depressed large @click="showUploader = true">
      <v-icon>mdi-paperclip</v-icon>
      <span class="ml-2">Upload new files</span>
    </v-btn>
    <file-uploader v-model="showUploader" @finish="receiveAttachments" />
  </div>
</template>

<script>
import FileUploader from '@/components/file-uploader.vue'
import AttachmentList from '@/components/attachment-list.vue'

export default {
  components: { FileUploader, AttachmentList },
  data: () => ({
    showUploader: false,
    uploadedAttachments: []
  }),
  methods: {
    receiveAttachments (responseBodies) {
      this.uploadedAttachments = responseBodies
    },
    deleteAttachment (file) {
      this.$http.delete(`uploads/${file.filename}`)
        .then(() => {
          const deleteIndex = this.uploadedAttachments.indexOf(file)
          this.uploadedAttachments.splice(deleteIndex, 1)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
