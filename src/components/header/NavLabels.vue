<template>
  <div class="nav-labels">
    <div v-if="!isLoggedIn">
      <a href="https://i.cs.hku.hk/fyp/2019/fyp19030/">About</a>
      <router-link to="/login">Teachers</router-link>
      <router-link to="/login">Students</router-link>
      <router-link to="/login">Parents</router-link>
      <router-link to="/login">Discussion</router-link>
    </div>
    <div v-else-if="isLoggedIn && user.type === 'student'">
        <a href="https://i.cs.hku.hk/fyp/2019/fyp19030/">About</a>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Games</router-link>
        <router-link to="/login">Courses</router-link>
    </div>
    <div v-else-if="isLoggedIn && user.type === 'teacher'">
      <a href="https://i.cs.hku.hk/fyp/2019/fyp19030/">About</a>
      <router-link to="/">Home</router-link>
      <router-link to="/happy-corner">Teachers' Corner</router-link>
      <router-link to="/login">Discussion</router-link>
    </div>
    <div v-else-if="isLoggedIn && user.type === 'parent'">
      <a href="https://i.cs.hku.hk/fyp/2019/fyp19030/">About</a>
      <router-link to="/login">Parents</router-link>
      <router-link to="/login">Discussion</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: true
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
