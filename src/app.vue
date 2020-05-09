<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
  beforeCreate () {
    const redirect = sessionStorage.getItem('redirect')
    console.log('pushing to', redirect)
    if (redirect) {
      sessionStorage.removeItem(redirect)
      this.$router.push(redirect)
    }
  }
}
</script>
