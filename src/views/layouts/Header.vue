<template>
  <v-app-bar elevate-on-scroll>
    <div class="container">
      <div class="row">
        <v-toolbar-title class="logo">STEM Portal</v-toolbar-title>
        <div v-if="user.type === 'visitor'" class="ml-2 mt-1">
          <router-link to="/login">Teachers</router-link>
          <router-link to="/login">Students</router-link>
          <router-link to="/login">Parents</router-link>
          <router-link to="/login">Discussion</router-link>
        </div>
        <v-spacer />
        <div class="mt-1">
          <router-link v-if="user.type === 'visitor'" to="/login">Login / Register</router-link>
          <a v-else @click="$store.dispatch('logout')">{{ user.name }}</a>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  padding-left: 6px;
  padding-right: 6px;
}
</style>
