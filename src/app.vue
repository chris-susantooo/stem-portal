<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>

export default {
  name: 'App',
  // if page is redirected from 404, restore the original url
  beforeCreate () {
    const redirect = sessionStorage.getItem('redirect')
    if (redirect) {
      const query = sessionStorage.getItem('query')
      const url = query ? `${redirect}?${query}` : redirect
      sessionStorage.removeItem('redirect')
      sessionStorage.removeItem('query')
      this.$router.push(url)
    }
  }
}
</script>
