<template>
  <v-menu left offset-y nudge-bottom="13" min-width="350" transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <a v-on="on">
        <v-avatar size="36" :color="user.avatar ? 'transparent' : 'primary'">
          <v-img v-if="user.avatar" :src="user.avatar" />
          <span v-else class="white--text">{{ user.firstName[0] + user.lastName[0] }}</span>
        </v-avatar>
        <span class="ml-2">{{ user.username }}</span>
      </a>
    </template>
    <v-card class="nav-user-menu">
      <div class="pt-2" />
      <v-avatar size="64" :color="user.avatar ? 'transparent' : 'primary'">
        <v-img v-if="user.avatar" :src="user.avatar" />
        <span v-else class="white--text">{{ user.firstName[0] + user.lastName[0] }}</span>
      </v-avatar>
      <div class="pt-2" />
      <h3>{{ `${user.firstName} ${user.lastName}` }}</h3>
      <p class="grey--text text--darken-2">Veteran {{ user.type }}</p><!-- todo -->
      <v-card-actions>
        <v-btn text :to="{ name: 'profile', params: { username: user.username } }">
          My Profile
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="red" @click="$emit('logout')">Sign Out</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
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

<style scoped lang="scss">
  .nav-user-menu {
    text-align: center;
    padding: 1rem 1rem .5rem 1rem;
  }
</style>
