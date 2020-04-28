import Phaser from 'phaser'

class EndScene extends Phaser.Scene {
  constructor () {
    super('EndScene')
    this.score = 0
  }

  init (data) {
    console.log('EndScene starts')
    this.score = data.score
  }

  preload () {
    console.log('Preload ends')
  }

  create () {
    const camera = this.cameras.main
    camera.setBackgroundColor(0x6f6f6f)
    this.add.text(270, 300, 'Your score: ' + this.score.toString(), { fontSize: '48px', fontFamily: 'Arial Black', color: '#000000' }).setStroke('#ffffff', 6)
    const restart = this.add.text(350, 400, 'Restart', { fontSize: '48px', fontFamily: 'Arial Black', color: '#000000' }).setStroke('#ffffff', 6).setInteractive()
    restart.on('pointerup', function (pointer) {
      this.scene.pause()
      this.scene.start('GameScene', { score: 0 })
    }, this)
    const exit = this.add.text(290, 500, 'Exit to Main', { fontSize: '48px', fontFamily: 'Arial Black', color: '#000000' }).setStroke('#ffffff', 6).setInteractive()
    exit.on('pointerup', function () {
      this.sys.game.destroy(true)
    }, this)
  }
}
export default new EndScene()
