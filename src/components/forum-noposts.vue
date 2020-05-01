<template>
  <div>
    <v-row class="justify-center">
      <v-icon size="80" color="#ea9085">mdi-file-question</v-icon>
    </v-row>
    <v-row>
      <span class="grey--text text-center pt-2" v-html="'No posts available...'" />
    </v-row>
    <v-row class="justify-center pt-2">
      <v-btn icon @click="refreshPosts">
        <v-progress-circular v-if="isRefeshing" indeterminate color="#ea9085" />
        <v-icon v-else color="#ea9085">mdi-refresh</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    isRefeshing: false
  }),
  methods: {
    refreshPosts () {
      this.$emit('refresh')
      this.isRefeshing = true
    }
  }
}
</script>
