<template>
  <v-app-bar elevate-on-scroll>
    <div class="container">
      <div class="row">
          <router-link to="/">
            <v-toolbar-title class="logo">STEM Portal</v-toolbar-title>
          </router-link>
        <v-spacer></v-spacer>
        <div v-if="user.type === 'visitor'">
          <a href="https://i.cs.hku.hk/fyp/2019/fyp19030/">About</a>
          <router-link to="/login">Teachers</router-link>
          <router-link to="/home/student">Students</router-link>
          <router-link to="/login">Parents</router-link>
          <router-link to="/login">Discussion</router-link>
        </div>
        <div v-else-if="user.type === 'student'">
            <a href="https://i.cs.hku.hk/fyp/2019/fyp19030/">About</a>
            <router-link to="/home/student">Students</router-link>
            <router-link to="/login">Games</router-link>
            <router-link to="/login">Courses</router-link>
        </div>
        <div v-else-if="user.type === 'teacher'">
          <a href="https://i.cs.hku.hk/fyp/2019/fyp19030/">About</a>
          <router-link to="/login">Teachers</router-link>
          <router-link to="/login">Materials</router-link>
          <router-link to="/login">Discussion</router-link>
        </div>
        <div v-else-if="user.type === 'parent'">
          <a href="https://i.cs.hku.hk/fyp/2019/fyp19030/">About</a>
          <router-link to="/login">Parents</router-link>
          <router-link to="/login">Discussion</router-link>
        </div>
        <v-spacer />
        <div>
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
  padding-left: 12px;
  padding-right: 12px;
}
</style>
