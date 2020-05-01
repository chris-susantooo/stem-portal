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
    this.add.text(170, 305, 'How many questions can you answer in 30 seconds?\nClick the numbers or type in keyboard to\nanswer these questions as fast as you can!', { fontSize: '24px', fontFamily: 'Comic Sans MS', color: '#000000', lineSpacing: '32', align: 'center' }).setStroke('#ffffff', 6)
    const addition = this.add.text(140, 550, 'Addition', { color: '#006a6a', fontFamily: 'Comic Sans MS', fontSize: '32px' }).setInteractive()
    addition.setStroke('#00ff0c', 8)
    addition.setShadow(2, 2, '#333333', 2, true, true)
    const subtraction = this.add.text(350, 550, 'Subtraction', { color: '#006a6a', fontFamily: 'Comic Sans MS', fontSize: '32px' }).setInteractive()
    subtraction.setStroke('#00ff0c', 8)
    subtraction.setShadow(2, 2, '#333333', 2, true, true)
    const mixed = this.add.text(620, 550, 'Mixed', { color: '#006a6a', fontFamily: 'Comic Sans MS', fontSize: '32px' }).setInteractive()
    mixed.setStroke('#00ff0c', 8)
    mixed.setShadow(2, 2, '#333333', 2, true, true)

    setUpAdditionButtonListener(addition, this)
    setUpSubtractionButtonListener(subtraction, this)
    setUpMixedButtonListener(mixed, this)

    // get pointer x and y
    this.input.on('pointerup', function (pointer) {
      console.log(pointer.x, pointer.y)
    })
    console.log('created ends')
  }
}
function setUpAdditionButtonListener (additionButton, game) {
  additionButton.on('pointerover', function (pointer) {
    additionButton.scale = 1.2
    additionButton.x = 120
    additionButton.y = 545
  })
  additionButton.on('pointerout', function (pointer) {
    additionButton.scale = 1
    additionButton.x = 140
    additionButton.y = 550
  })
  additionButton.on('pointerdown', function (pointer) {
    game.scene.start('GameAddScene', { score: 0, music: null })
  })
}
function setUpSubtractionButtonListener (subtractionButton, game) {
  subtractionButton.on('pointerover', function (pointer) {
    subtractionButton.scale = 1.2
    subtractionButton.x = 330
    subtractionButton.y = 545
  })
  subtractionButton.on('pointerout', function (pointer) {
    subtractionButton.scale = 1
    subtractionButton.x = 350
    subtractionButton.y = 550
  })
  subtractionButton.on('pointerdown', function (pointer) {
    game.scene.start('GameMinusScene', { score: 0, music: null })
  })
}
function setUpMixedButtonListener (mixedButton, game) {
  mixedButton.on('pointerover', function (pointer) {
    mixedButton.scale = 1.2
    mixedButton.x = 610
    mixedButton.y = 545
  })
  mixedButton.on('pointerout', function (pointer) {
    mixedButton.scale = 1
    mixedButton.x = 620
    mixedButton.y = 550
  })
  mixedButton.on('pointerdown', function (pointer) {
    game.scene.start('GameMixedScene', { score: 0, music: null })
  })
}
export default new StartScene()
