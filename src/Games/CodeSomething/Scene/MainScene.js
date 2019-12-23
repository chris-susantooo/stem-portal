import Phaser from 'phaser'

export class MainScene extends Phaser.Scene {
  constructor () {
    super('loadGame')

    this.group = undefined
    this.circle = undefined
  }
  preload () {
    this.load.image('cube', require('@/Games/CodeSomething/Images/Cube.jpg'))
  }
  create () {
    this.group = this.add.group()
    this.add.text(20, 20, 'PRESS ME', { font: '25px Arial', fill: 'red' }).setInteractive().on('pointerdown', () => {
      this.scene.start('playGame')
    })
    // make a circle dragable
    this.circle = this.add.circle(600, 300, 100, 0x0000ff).setInteractive()
    this.input.setDraggable(this.circle)
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      this.circle.x = dragX
      this.circle.y = dragY
    })
  }
  update () {
    if (this.circle && this.circle.y >= 400) {
      this.circle.input.enabled = false
    }
  }
}
