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
    console.log(location.href)
    const redirect = sessionStorage.getItem('redirect')
    console.log('pushing to', redirect)
    if (redirect) {
      sessionStorage.removeItem(redirect)
      const query = sessionStorage.getItem('query')
      this.$router.push(query ? `${redirect}?${query}` : redirect)
    }
  }
}
</script>
