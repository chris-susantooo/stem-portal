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

    this.textures.addBase64('background', '@/Games/CodeSomething/Images/test-bg.png')
    this.add.sprite(0, 0, 'background')

    const startButton = this.add.text(200, 200, 'Click here to start', { color: '#00ff00', fontSize: '20px' }).setInteractive()
    this.input.on('gameobjectdown', (pointer, gameObject) => {
      if (gameObject === startButton) {
        this.scene.start('GameScene')
      }
    })
    console.log('created ends')
  }
}
export default new StartScene()
