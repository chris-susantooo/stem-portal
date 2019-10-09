<template>
  <div class="wrapper">
    <v-header />
    <router-view />
    <v-footer />
  </div>
</template>

<script>
import VHeader from './Header.vue'
import VFooter from './Footer.vue'

export default {
  components: { VHeader, VFooter }
}
</script>

<style lang="sass">
@import '~@/styles/style.scss'
</style>
