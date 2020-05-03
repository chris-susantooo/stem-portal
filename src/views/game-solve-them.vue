<template>
  <div id="game-container">
    <div id="game-surface" class="d-flex justify-center">
      <div :id="containerId"/>
    </div>
    <div id="download-overlay" v-if="!downloaded">
      Downloading ...
    </div>
  </div>
</template>

<script>
import http from '../utils/http'

export default {
  name: 'Game',
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  data () {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: 'phaser-game'
    }
  },
  async mounted () {
    const game = await import('@/games/SolveThEM/SolveThEM')
    this.downloaded = true
    this.$nextTick(() => {
      if (this.gameInstance === null) {
        this.gameInstance = game.launch(this.containerId, 897, 689)
      }
    })
  },
  beforeDestroy () {
    this.gameInstance = null
    http.solveThemFinished(this.user._id)
      .then(() => {
        this.$store.dispatch('fetchUser')
      })
      .catch(err => console.log(err))
  }
}
</script>
