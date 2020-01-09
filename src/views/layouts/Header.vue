<template>
  <v-app-bar elevate-on-scroll>
    <!-- display width > 600px -->
    <div class="container d-none d-sm-flex">
      <div class="row align-center">
        <router-link to="/"><v-toolbar-title class="logo" v-text="'STEM Portal'" /></router-link>
        <v-spacer />
        <nav-labels :user="user" />
        <v-spacer />
        <div>
          <user-menu v-if="isLoggedIn" :user="user" @logout="logout" />
          <router-link v-else to="/login">Login / Register</router-link>
        </div>
      </div>
    </div>
    <!-- display width <= 600px -->
    <div class="row align-center d-sm-none">
      <router-link to="/"><v-toolbar-title class="logo pl-3" v-text="'STEM Portal'" /></router-link>
      <v-spacer />
      <template v-if="!isLoggedIn">
        <router-link to="/login">Login / Register</router-link>
        <v-app-bar-nav-icon color="black" />
      </template>
      <user-menu v-else :user="user" @logout="logout" />
    </div>
  </v-app-bar>
</template>

<script>
import UserMenu from '@/components/header/UserMenu.vue'
import NavLabels from '@/components/header/NavLabels.vue'

export default {
  components: { UserMenu, NavLabels },
  computed: {
    user () { return this.$store.getters.user },
    isLoggedIn () { return this.$store.getters.isLoggedIn }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        if (this.$route.name !== 'home') {
          this.$router.push({ name: 'home' })
        } else {
          this.$router.go()
        }
      })
    }
  }
}
</script>
