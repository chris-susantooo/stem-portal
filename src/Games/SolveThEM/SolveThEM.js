import Phaser from 'phaser'

import StartScene from './scenes/StartScene'
import GameAddScene from './scenes/GameAddScene'
import GameMinusScene from './scenes/GameMinusScene'
import GameMixedScene from './scenes/GameMixedScene'
import EndScene from './scenes/EndScene'

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
    scene: [StartScene, GameAddScene, GameMinusScene, GameMixedScene, EndScene]
  })
}

export default launch
export { launch }
