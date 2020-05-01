<template>
  <div class="d-flex justify-center">
    <v-btn large icon @click="$emit('home')" class="mx-2">
      <v-icon color="#ea9085">mdi-home</v-icon>
    </v-btn>
    <v-btn large icon class="mx-2">
      <v-icon color="#d45079">mdi-heart</v-icon>
    </v-btn>
    <v-btn large icon class="mx-2">
      <v-icon color="#010a43">mdi-sort</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {

}
</script>
