import Phaser from 'phaser'

class StartScene extends Phaser.Scene {
  constructor () {
    super('StartScene')
  }
  init () {
    console.log('Startscene starts')
  }
  preload () {
    console.log('preload ends')
  }
  create () {
    const camera = this.cameras.main
    camera.setBackgroundColor(0x6f6f6f)

    const title = this.add.text(216, 100, 'SolveThEM', { fontFamily: 'Arial Black', fontSize: '74px', color: '#c51b7d' })
    title.setStroke('#de77ae', 16)
    title.setShadow(2, 2, '#333333', 2, true, true)
    const beta = this.add.text(520, 180, 'Beta 1.0', { fontFamily: 'Arial Black', fontSize: '48px', color: '#ffff00' }).setAngle(-15)
    beta.setStroke('#de77ae', 16)
    beta.setShadow(2, 2, '#333333', 2, true, true)
    // this.add.rectangle(455, 365, 640, 200, 0xffffff).setStrokeStyle(2, 0x1a65ac)
    this.add.text(170, 305, 'How many questions can you answer in 30 seconds?\nClick the numbers or type in keyboard to\nanswer these questions as fast as you can!', { fontSize: '24px', fontFamily: 'Comic Sans MS', color: '#000000', lineSpacing: '32', align: 'center' }).setStroke('#ffffff', 6)
    const startButton = this.add.text(350, 550, 'Start Game', { color: '#006a6a', fontFamily: 'Comic Sans MS', fontSize: '32px' }).setInteractive()
    startButton.setStroke('#00ff0c', 16)
    startButton.setShadow(2, 2, '#333333', 2, true, true)

    setUpListener(startButton, this)

    // get pointer x and y
    this.input.on('pointerup', function (pointer) {
      console.log(pointer.x, pointer.y)
    })
    console.log('created ends')
  }
}
function setUpListener (startButton, game) {
  startButton.on('pointerover', function (pointer) {
    startButton.scale = 1.2
    startButton.x = 330
    startButton.y = 545
  })
  startButton.on('pointerout', function (pointer) {
    startButton.scale = 1
    startButton.x = 350
    startButton.y = 550
  })
  startButton.on('pointerdown', function (pointer) {
    game.scene.start('GameScene', { score: 0 })
  })
}
export default new StartScene()
