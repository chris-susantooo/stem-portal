<template>
  <div class="wrapper">
    <transition name="fade">
      <div v-if="isLoading" class="preloader d-flex justify-center align-center defer-500">
        <bounce-spinner :color="spinnerColors[animStep]"/>
        <span class="text-center mt-12" style="position: fixed;">{{ 'STEM Portal is Loading' + '.'.repeat(animStep) }}</span>
      </div>
    </transition>
    <v-header />
    <router-view @childBusy="isChildBusy = true" @childReady="isChildBusy = false" />
    <v-footer />
  </div>
</template>

<script>
import VHeader from './Header.vue'
import VFooter from './Footer.vue'
import BounceSpinner from '@/components/loader/BounceSpinner.vue'

let animInterval = null

export default {
  components: { VHeader, VFooter, BounceSpinner },
  created () {
    this.$store.dispatch('fetchUser')
      .catch(err => { console.log(err) })
      .finally(() => { this.isFetchingUser = false })
  },
  mounted () {
    window.onload = () => (this.isLoadingPage = false)
    animInterval = setInterval(() => (this.animStep = (this.animStep + 1) % 4), 1000)
  },
  computed: {
    isLoading () { return this.isLoadingPage || this.isFetchingUser || this.isChildBusy }
  },
  data: () => ({
    isLoadingPage: true,
    isFetchingUser: true,
    isChildBusy: false,
    spinnerColors: ['#6789ba', '#ffed78', '#d35656', '#347474'],
    animStep: 0
  }),
  watch: {
    isLoading (newVal) {
      if (newVal) setTimeout(() => clearInterval(animInterval), 500)
    }
  }
}
</script>

<style lang="sass">
@import '~@/styles/style.scss'
</style>
