import Phaser from 'phaser'
import { MainScene } from './Scene/MainScene'
import { OtherScene } from './Scene/OtherScene'

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
  parent: 'game-container',
  dom: {
    createContainer: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [MainScene, OtherScene]
}

export function launch (containerId) {
  return new Phaser.Game(config)
}
