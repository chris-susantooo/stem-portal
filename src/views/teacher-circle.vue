<template>
  <div class="teacher-circle container">
    <v-btn text rounded depressed large @click="showUploader = true">
      Upload new files
    </v-btn>
    <file-uploader v-model="showUploader" />
  </div>
</template>

<script>
import FileUploader from '@/components/file-uploader.vue'

export default {
  components: { FileUploader },
  data: () => ({
    showUploader: false
  })
}
</script>

<style lang="scss" scoped>

</style>
