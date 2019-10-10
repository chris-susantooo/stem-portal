<template>
  <div class="wrapper">
    <transition name="fade">
      <div v-if="isLoading" class="preloader d-flex justify-center align-center defer-500">
        <bounce-spinner />
        <span class="text-center mt-12 ml-1" style="position: fixed;">Loading...</span>
      </div>
    </transition>
    <v-header />
    <router-view />
    <v-footer />
  </div>
</template>

<script>
import VHeader from './Header.vue'
import VFooter from './Footer.vue'
import { BounceSpinner } from 'vue-spinners'

export default {
  components: { VHeader, VFooter, BounceSpinner },
  mounted () {
    this.$nextTick(() => {
      window.onload = () => (this.isLoading = false)
    })
  },
  data: () => ({
    isLoading: true
  })
}
</script>

<style lang="sass">
@import '~@/styles/style.scss'
</style>
