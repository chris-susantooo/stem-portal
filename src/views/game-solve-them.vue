<template>
  <div id="game-container">
    <div id="game-surface">
      <div :id="containerId"/>
    </div>
    <div id="download-overlay" v-if="!downloaded">
      Downloading ...
    </div>
  </div>
</template>

<script>

export default {
  name: 'Game',
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
      this.gameInstance = game.launch(this.containerId, 897, 689)
    })
  },
  destroyed () {
    this.gameInstance.destroy(false)
  },
  watch: {
    gameInstance (game) {
      if (game === null) this.$router.push({ name: 'student-games' })
    }
  }
}
</script>
