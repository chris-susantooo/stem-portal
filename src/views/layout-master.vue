<template>
  <div class="wrapper">
    <transition name="fade">
      <div v-if="isLoading" class="preloader d-flex justify-center align-center defer-500">
        <bounce-spinner :color="spinnerColors[animStep]"/>
        <span class="text-center mt-10" style="position: fixed;">{{ 'STEM Portal is Loading' + '.'.repeat(animStep) }}</span>
      </div>
    </transition>
    <v-header />
    <router-view class="d-flex flex-column" style="margin-top: 4rem;" @childBusy="isChildBusy = true" @childReady="isChildBusy = false" />
    <v-footer />
  </div>
</template>

<script>
import VHeader from './layout-header.vue'
import VFooter from './layout-footer.vue'
import BounceSpinner from '@/components/loader-spinner.vue'

let animInterval = null

export default {
  components: { VHeader, VFooter, BounceSpinner },
  beforeCreate () {
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

<style lang="scss">
  @import '~@/styles/style.scss';

  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
  }
</style>
