import Phaser from 'phaser'

import bgm from '../music/bgm.mp3'

class GameMixedScene extends Phaser.Scene {
  constructor () {
    super('GameMixedScene')
    this.scoreText = null
    this.score = 0
    this.timeText = null
    this.timer = null
    this.music = null
  }
  init (data) {
    console.log('Gamescene starts')
    this.score = data.score
    this.music = data.music
  }
  preload () {
    this.load.audio('bgm', bgm)
    console.log('preload ends')
  }
  create () {
    const camera = this.cameras.main
    camera.setBackgroundColor(0x6f6f6f)

    if (this.music === null) {
      this.music = this.sound.add('bgm', { loop: true })
      this.music.play()
    }

    this.add.graphics().fillStyle(0xffffff).fillRoundedRect(330, 235, 300, 90, 10)
    this.add.graphics().lineStyle(3, 0x000000).strokeRoundedRect(330, 235, 300, 90, 10)
    this.add.graphics().fillStyle(0x1a65ac).fillRoundedRect(165, 490, 640, 150, 10)
    this.add.graphics().lineStyle(3, 0x000000).strokeRoundedRect(165, 490, 640, 150, 10)
    let inputNumber = []
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 5; j++) {
        let temp = i * 5 + j + 1
        if (temp === 10) temp = 0
        inputNumber.push(this.add.text(200 + 80 * j, 505 + 80 * i, temp.toString(), { fontSize: '32px', fontFamily: 'Comic Sans MS', color: '#000000', lineSpacing: 32 }).setInteractive().setStroke('#ffffff', 4))
      }
    }
    inputNumber.push(this.add.text(680, 505, 'Cancel', { fontSize: '32px', fontFamily: 'Comic Sans MS', color: '#000000', lineSpacing: 32 }).setInteractive().setStroke('#ffffff', 4))
    inputNumber.push(this.add.text(680, 585, 'Enter', { fontSize: '32px', fontFamily: 'Comic Sans MS', color: '#000000', lineSpacing: 32 }).setInteractive().setStroke('#ffffff', 4))

    let displayAnswer = ''
    let playerText = this.add.text(460, 440, 'Your answer: ' + displayAnswer, { fontSize: '32px', fontFamily: 'Comic Sans MS', color: '#ff0000' }).setStroke('#ffffff', 6)

    let { numberA, symbol, numberB, answer } = createQuestion(this)
    let emitter = new Phaser.Events.EventEmitter()
    emitter.on('newQuestion', newQuestion, this)

    this.scoreText = this.add.text(10, 10, '', { fontSize: '32px', fontFamily: 'Comic Sans MS', color: '#000000' }).setStroke('#ffffff', 6)
    this.timeText = this.add.text(10, 50, '', { fontSize: '32px', fontFamily: 'Comic Sans MS', color: '#000000' }).setStroke('#ffffff', 6)

    this.timer = this.time.addEvent({ delay: 30000, callback: gameOver, callbackScope: this })

    inputNumber.forEach(input => {
      // mouseover
      input.on('pointermove', function (pointer) {

      }, this)

      // mouseclick
      input.on('pointerdown', function () {
        let num = input.text
        if (num !== undefined) {
          if (num === 'Enter') {
            if (displayAnswer === answer.toString()) {
              console.log('Correct')
              this.score += 10
            } else {
              console.log('Wrong')
              this.score -= 5
            }
            emitter.emit('newQuestion', numberA, symbol, numberB)
            if (symbol.text === '+') {
              answer = parseInt(numberA.text) + parseInt(numberB.text)
            } else {
              answer = parseInt(numberA.text) - parseInt(numberB.text)
            }
            displayAnswer = ''
            playerText.text = 'Your answer: '
          } else if (num === 'Cancel' && displayAnswer.length > 0) {
            displayAnswer = displayAnswer.substr(0, displayAnswer.length - 1)
            playerText.text = 'Your answer: ' + displayAnswer
          } else if (displayAnswer.length < 3) {
            displayAnswer = displayAnswer.concat(num)
            playerText.text = 'Your answer: ' + displayAnswer
          }
        }
      }, this)
    })

    // Capture Keyboard inputs
    this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) => {
      if (event.code) { // Digit1, KeyQ, Enter, Backspace
        if (event.code === 'Enter') {
          if (displayAnswer === answer.toString()) {
            console.log('Correct')
            this.score += 10
          } else {
            console.log('Wrong')
            this.score -= 5
          }
          emitter.emit('newQuestion', numberA, symbol, numberB)
          if (symbol.text === '+') {
            answer = parseInt(numberA.text) + parseInt(numberB.text)
          } else {
            answer = parseInt(numberA.text) - parseInt(numberB.text)
          }
          displayAnswer = ''
          playerText.text = 'Your answer: '
        } else if (event.code === 'Backspace' && displayAnswer.length > 0) {
          displayAnswer = displayAnswer.substr(0, displayAnswer.length - 1)
          playerText.text = 'Your answer: ' + displayAnswer
        } else if (displayAnswer.length < 3) {
          if (event.code.substr(0, 5) === 'Digit') {
            displayAnswer = displayAnswer.concat(event.code.substr(5, 1))
            playerText.text = 'Your answer: ' + displayAnswer
          }
        }
      }
    })

    // get pointer x and y
    this.input.on('pointerup', function (pointer) {
      console.log(pointer.x, pointer.y)
    })
    console.log('created ends')
  }

  update () {
    this.scoreText.setText('Score: ' + this.score)
    this.timeText.setText('Time left: ' + (Math.floor(30000 - this.timer.getElapsed()) / 1000).toFixed(1))
  }
}

function createQuestion (game) {
  let symbols = ['+', '-']
  let numA = Phaser.Math.Between(1, 19)
  let numB = Phaser.Math.Between(1, 19)
  let chooser = Phaser.Math.Between(0, 1)
  let sym = symbols[chooser]
  let answer
  if (sym === '+') {
    answer = numA + numB
  } else {
    if (numA < numB) {
      let temp = numA
      numA = numB
      numB = temp
    }
    answer = numA - numB
  }

  let numberA = game.add.text(345, 250, numA.toString(), { fontSize: '56px', fontFamily: 'Arial', color: '#00ff00' }).setStroke('#000000', 4)
  let symbol = game.add.text(450, 250, sym, { fontSize: '56px', fontFamily: 'Arial', color: '#00ff00' }).setStroke('#000000', 4)
  let numberB = game.add.text(545, 250, numB.toString(), { fontSize: '56px', fontFamily: 'Arial', color: '#00ff00' }).setStroke('#000000', 4)

  return { numberA, symbol, numberB, answer }
}

function newQuestion (numberA, symbol, numberB) {
  let symbols = ['+', '-']
  let numA = Phaser.Math.Between(1, 19)
  let numB = Phaser.Math.Between(1, 19)
  let chooser = Phaser.Math.Between(0, 1)
  let sym = symbols[chooser]
  if (numA > numB) {
    numberA.text = numA.toString()
    numberB.text = numB.toString()
  } else {
    numberA.text = numB.toString()
    numberB.text = numA.toString()
  }
  symbol.text = sym

  return { numberA, symbol, numberB }
}

function gameOver () {
  console.log('Time\'s up')
  this.scene.pause()
  this.scene.start('EndScene', { score: this.score, music: this.music, lastScene: this })
}
export default new GameMixedScene()
