<template>
  <div class="teacher-circle container">
    <attachment-list :files="attachmentLinks" :deletable="true" @delete="deleteAttachment" />
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
    attachmentLinks: []
  }),
  methods: {
    receiveAttachments (links) {
      this.attachmentLinks = links
    },
    deleteAttachment (link) {
      this.$http.delete(link.replace('download', 'uploads'))
        .then(() => {
          const deleteIndex = this.attachmentLinks.indexOf(link)
          this.attachmentLinks.splice(deleteIndex, 1)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
