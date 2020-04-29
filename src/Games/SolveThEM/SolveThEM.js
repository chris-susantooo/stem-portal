import Phaser from 'phaser'

import StartScene from './Scenes/StartScene'
import GameScene from './Scenes/GameScene'
import EndScene from './Scenes/EndScene'

function launch (containerId, width, height) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width,
    height,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: [StartScene, GameScene, EndScene]
  })
}

export default launch
export { launch }
