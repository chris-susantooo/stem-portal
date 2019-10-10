<template>
  <v-app-bar elevate-on-scroll>
    <div class="container">
      <div class="row">
        <v-toolbar-title class="logo">STEM Portal</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="user.type === 'visitor'" class="ml-2 mt-1">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/login">Teachers</router-link>
          <router-link to="/login">Students</router-link>
          <router-link to="/login">Parents</router-link>
          <router-link to="/login">Discussion</router-link>
        </div>
        <v-spacer />
        <div class="mt-1">
          <router-link v-if="user.type === 'visitor'" to="/login">Login / Register</router-link>
          <user-nav-menu v-else :user="user" @logout="logout" />
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import UserNavMenu from '@/components/UserNavMenu.vue'

export default {
  components: { UserNavMenu },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout () {
      this.$store.commit('setUser', {
        type: 'visitor',
        username: '',
        fullname: '',
        token: ''
      })
      this.$router.push({ name: 'home' })
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
