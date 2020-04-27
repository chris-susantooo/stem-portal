import Phaser from 'phaser'

import StartScene from './Scenes/StartScene'
import GameScene from './Scenes/GameScene'

function launch (containerId, width, height) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width,
    height,
    parent: containerId,
    dom: {
      createContainer: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: [StartScene, GameScene]
  })
}

export default launch
export { launch }
