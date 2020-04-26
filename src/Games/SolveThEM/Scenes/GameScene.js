import Phaser from 'phaser'

class GameScene extends Phaser.Scene {
  constructor () {
    super('GameScene')
  }
  init () {
    console.log('Gamescene starts')
  }
  preload () {
    console.log('preload ends')
  }
  create () {
    const camera = this.cameras.main
    camera.setBackgroundColor(0x6f6f6f)

    this.textures.addBase64('block', '@/Games/CodeSomething/content/images/block.png')
    let block = this.add.sprite(190, 495, 'block').setOrigin(0)

    this.add.rectangle(485, 565, 640, 150, 0xffffff).setStrokeStyle(2, 0x1a65ac)
    let inputNumber = []
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 5; j++) {
        let temp = i * 5 + j + 1
        if (temp === 10) temp = 0
        inputNumber.push(this.add.text(200 + 80 * j, 500 + 80 * i, temp.toString(), { fontSize: '32px', fontFamily: 'Comic Sans MS', color: '#000000', lineSpacing: 32 }).setInteractive())
      }
    }
    inputNumber.push(this.add.text(680, 500, 'Cancel', { fontSize: '32px', fontFamily: 'Comic Sans MS', color: '#000000', lineSpacing: 32 }).setInteractive())
    inputNumber.push(this.add.text(680, 580, 'Enter', { fontSize: '32px', fontFamily: 'Comic Sans MS', color: '#000000', lineSpacing: 32 }).setInteractive())

    let displayAnswer = ''
    let playerText = this.add.text(450, 450, 'Your answer: ' + displayAnswer, { fontSize: '32px', fontFamily: 'Comic Sans MS', color: '#ff0000' })

    let { numberA, symbol, numberB, answer } = createQuestion(this)
    let emitter = new Phaser.Events.EventEmitter()
    emitter.on('newQuestion', newQuestion, this)

    inputNumber.forEach(input => {
      // mouseover
      input.on('pointermove', function (pointer) {
        block.x = input.x - 10
        block.y = input.y - 5
      }, this)

      // mouseclick
      input.on('pointerup', function () {
        let num = input.text
        if (num !== undefined) {
          if (num === 'Enter') {
            if (displayAnswer === answer.toString()) {
              console.log('Correct')
            } else {
              console.log('Wrong')
            }
            emitter.emit('newQuestion', numberA, symbol, numberB)
            answer = parseInt(numberA.text) + parseInt(numberB.text)
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
          } else {
            console.log('Wrong')
          }
          emitter.emit('newQuestion', numberA, symbol, numberB)
          answer = parseInt(numberA.text) + parseInt(numberB.text)
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
}

function createQuestion (game) {
  let numA = Phaser.Math.Between(0, 9)
  let numB = Phaser.Math.Between(0, 9)
  let answer = numA + numB

  let numberA = game.add.text(350, 250, numA.toString(), { fontSize: '56px', fontFamily: 'Arial', color: '#00ff00' })
  let symbol = game.add.text(450, 250, '+', { fontSize: '56px', fontFamily: 'Arial', color: '#00ff00' })
  let numberB = game.add.text(550, 250, numB.toString(), { fontSize: '56px', fontFamily: 'Arial', color: '#00ff00' })

  return { numberA, symbol, numberB, answer }
}

function newQuestion (numberA, symbol, numberB) {
  let numA = Phaser.Math.Between(0, 9)
  let numB = Phaser.Math.Between(0, 9)
  numberA.text = numA.toString()
  numberB.text = numB.toString()
  symbol.text = '+'

  return { numberA, symbol, numberB }
}
export default new GameScene()
