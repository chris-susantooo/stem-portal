import Phaser from 'phaser'
import router from '@/routes'

class EndScene extends Phaser.Scene {
  constructor () {
    super('EndScene')
    this.score = 0
    this.music = null
    this.lastScene = null
  }

  init (data) {
    console.log('EndScene starts')
    this.score = data.score
    this.music = data.music
    this.lastScene = data.lastScene
  }

  preload () {
    console.log('Preload ends')
  }

  create () {
    const camera = this.cameras.main
    camera.setBackgroundColor(0x6f6f6f)
    this.add.text(270, 200, 'Your score: ' + this.score.toString(), { fontSize: '48px', fontFamily: 'Arial Black', color: '#000000' }).setStroke('#ffffff', 6)
    const restart = this.add.text(360, 400, 'Restart', { fontSize: '36px', fontFamily: 'Arial Black', color: '#000000' }).setStroke('#ffffff', 6).setInteractive()
    restart.on('pointerup', function (pointer) {
      this.scene.pause()
      this.scene.start(this.lastScene, { score: 0, music: this.music })
    }, this)
    restart.on('pointerover', function (pointer) {
      restart.scale = 1.2
      restart.x = 340
      restart.y = 395
    })
    restart.on('pointerout', function (pointer) {
      restart.scale = 1
      restart.x = 360
      restart.y = 400
    })
    const backToMain = this.add.text(255, 500, 'Back To Main Menu', { fontSize: '36px', fontFamily: 'Arial Black', color: '#000000' }).setStroke('#ffffff', 6).setInteractive()
    backToMain.on('pointerup', function () {
      this.music.stop()
      this.scene.start('StartScene')
    }, this)
    backToMain.on('pointerover', function (pointer) {
      backToMain.scale = 1.2
      backToMain.x = 235
      backToMain.y = 495
    })
    backToMain.on('pointerout', function (pointer) {
      backToMain.scale = 1
      backToMain.x = 255
      backToMain.y = 500
    })
    const exit = this.add.text(330, 600, 'Quit Game', { fontSize: '36px', fontFamily: 'Arial Black', color: '#000000' }).setStroke('#ffffff', 6).setInteractive()
    exit.on('pointerup', function () {
      this.sys.game.destroy(true)
      router.push({ name: 'game-list' })
    }, this)
    exit.on('pointerover', function (pointer) {
      exit.scale = 1.2
      exit.x = 310
      exit.y = 595
    })
    exit.on('pointerout', function (pointer) {
      exit.scale = 1
      exit.x = 330
      exit.y = 600
    })
  }
}
export default new EndScene()
