<template>
  <v-app-bar elevate-on-scroll>
    <!-- display width > 600px -->
    <div class="container d-none d-sm-flex">
      <div class="row align-center">
        <router-link to="/"><v-toolbar-title class="logo" v-text="'STEM Portal'" /></router-link>
        <v-spacer />
        <nav-labels />
        <v-spacer />
        <div>
          <user-menu v-if="isLoggedIn" @logout="logout" />
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
      <user-menu v-else @logout="logout" />
    </div>
  </v-app-bar>
</template>

<script>
import UserMenu from '@/components/header/UserMenu.vue'
import NavLabels from '@/components/header/NavLabels.vue'

export default {
  components: { UserMenu, NavLabels },
  computed: {
    isLoggedIn () { return this.$store.getters.isLoggedIn }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        console.log(this.$store.getters.isLoggedIn)
        if (this.$route.name !== 'home') {
          this.$router.push({ name: 'home' })
        }
      })
    }
  }
}
</script>
