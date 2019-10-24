<template>
  <v-app-bar elevate-on-scroll>
    <!-- display width > 600px -->
    <div class="container d-none d-sm-flex">
      <div class="row">
        <router-link to="/"><v-toolbar-title class="logo" v-text="'STEM Portal'" /></router-link>
        <v-spacer />
        <nav-labels  :isLoggedIn="isLoggedIn" :user="user" />
        <v-spacer />
        <div>
          <router-link v-if="!isLoggedIn" to="/login">Login / Register</router-link>
          <user-menu v-else :user="user" @logout="logout" />
        </div>
      </div>
    </div>
    <!-- display width <= 600px -->
    <router-link to="/"><v-toolbar-title class="logo hidden-sm-and-up" v-text="'STEM Portal'" /></router-link>
    <v-spacer class="hidden-sm-and-up" />
    <template v-if="!isLoggedIn">
      <router-link to="/login" class="hidden-sm-and-up">Login / Register</router-link>
      <v-app-bar-nav-icon color="black" class="hidden-sm-and-up" />
    </template>
    <user-menu v-else :user="user" @logout="logout" />
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
        this.$router.push({ name: 'home' })
      })
    }
  }
}
</script>
