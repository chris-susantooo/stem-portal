<template>
  <v-card class="ma-2 pa-2 text-center" outlined width="300">
    <v-icon class="d-flex justify-center" size="128" :color="color">{{ icon }}</v-icon>
    <h2>{{ title }}</h2>
    <p class="text--secondary mt-1">{{ description }}</p>
  </v-card>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>
