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
