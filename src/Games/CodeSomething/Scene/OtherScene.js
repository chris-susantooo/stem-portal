import Phaser from 'phaser'

export class OtherScene extends Phaser.Scene {
  constructor () {
    super('playGame')
  }

  create () {
    this.add.text(20, 20, 'Playing game...', { font: '25px Arial', fill: 'black' })
  }
}
