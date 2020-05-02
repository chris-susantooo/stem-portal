<template>
<div class="text-center">
  <canvas id="render-canvas" ref="render-canvas"></canvas>
</div>
</template>

<script>
import http from '../utils/http'

import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

BABYLON.GUI = GUI

let spheres = []
let transparentSpheres = {}
let answers = {}
let myScene

function initScene (engine) {
  const scene = new BABYLON.Scene(engine)
  scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8)
  return scene
}

function createChooseLevelScene (engine, scene) {
  const background = new BABYLON.Layer('background', require('@/games/MagicCube/Photos/MainPage/background.jpg'), scene)
  background.alpha = 1
  // GUI set up
  const chooseLevelAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene)
  const buttons = []
  buttons.push(BABYLON.GUI.Button.CreateImageOnlyButton('1-1', require('@/games/MagicCube/Photos/MainPage/game1-1.jpg')))
  buttons.push(BABYLON.GUI.Button.CreateImageOnlyButton('1-2', require('@/games/MagicCube/Photos/MainPage/game1-2.jpg')))
  buttons.push(BABYLON.GUI.Button.CreateImageOnlyButton('1-3', require('@/games/MagicCube/Photos/MainPage/game1-3.jpg')))
  buttons.push(BABYLON.GUI.Button.CreateImageOnlyButton('1-4', require('@/games/MagicCube/Photos/MainPage/game1-4.jpg')))
  buttons.forEach((button, index) => {
    chooseLevelAdvancedTexture.addControl(button)
    button.width = '80px'
    button.height = '80px'
    button.top = '150px'
    button.left = (-200 + index * 135).toString() + 'px'
    button.onPointerClickObservable.add(() => {
      chooseLevelAdvancedTexture.dispose()
      spheres = []
      answers = {}
      transparentSpheres = {}
      myScene = createGameScene(engine, button.name)
    })
  })
  const home = BABYLON.GUI.Button.CreateImageOnlyButton('home', require('@/games/MagicCube/Photos/MainPage/home.jpg'))
  chooseLevelAdvancedTexture.addControl(home)
  home.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
  home.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  home.width = '80px'
  home.height = '80px'
  home.onPointerClickObservable.add(() => {
    chooseLevelAdvancedTexture.dispose()
    myScene = createMainScene(engine)
  })
  return scene
}

function createMainScene (engine) {
  const scene = initScene(engine)
  const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 20, new BABYLON.Vector3(0, 0, 0), scene)
  camera.setPosition(new BABYLON.Vector3(13, 17, -13))
  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, -1), scene)
  light.intensity = 0.5
  const light2 = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0, -1, 1), scene)
  light2.intensity = 1
  const light3 = new BABYLON.DirectionalLight('light3', new BABYLON.Vector3(0, 0, 1), scene)
  light3.intensity = 0.5
  const background = new BABYLON.Layer('background', require('@/games/MagicCube/Photos/MainPage/background.jpg'), scene)
  background.alpha = 1
  const { purpleMaterial, redMaterial, yellowMaterial, orangeMaterial, greenMaterial, cyanMaterial, transparentMaterial } = createMaterials(scene)
  const box = createBox(0, 0, 0, scene, transparentMaterial)
  createSphere(0, 0, 0, scene, '1', cyanMaterial, false, box)
  createSphere(0, 1, 0, scene, '2', cyanMaterial, false, box)
  createSphere(0, 1, 1, scene, '3', cyanMaterial, false, box)
  createSphere(0, -1, 0, scene, '4', cyanMaterial, false, box)
  createSphere(0, 0, 1, scene, '5', cyanMaterial, false, box)
  createSphere(0, -1, 1, scene, '1', greenMaterial, false, box)
  createSphere(-1, -1, 1, scene, '2', greenMaterial, false, box)
  createSphere(1, -1, 1, scene, '3', greenMaterial, false, box)
  createSphere(-1, 0, 1, scene, '4', greenMaterial, false, box)
  createSphere(1, 0, 1, scene, '5', greenMaterial, false, box)
  createSphere(-1, 1, 0, scene, '1', yellowMaterial, false, box)
  createSphere(-1, 1, -1, scene, '2', yellowMaterial, false, box)
  createSphere(-1, 1, 1, scene, '3', yellowMaterial, false, box)
  createSphere(-1, 0, 0, scene, '4', yellowMaterial, false, box)
  createSphere(-1, -1, 0, scene, '5', yellowMaterial, false, box)
  createSphere(-1, -1, -1, scene, '1', redMaterial, false, box)
  createSphere(-1, 0, -1, scene, '2', redMaterial, false, box)
  createSphere(0, -1, -1, scene, '3', redMaterial, false, box)
  createSphere(1, -1, -1, scene, '4', redMaterial, false, box)
  createSphere(0, 1, -1, scene, '1', purpleMaterial, false, box)
  createSphere(0, 0, -1, scene, '2', purpleMaterial, false, box)
  createSphere(1, 1, -1, scene, '3', purpleMaterial, false, box)
  createSphere(1, 0, 0, scene, '1', orangeMaterial, false, box)
  createSphere(1, 1, 0, scene, '2', orangeMaterial, false, box)
  createSphere(1, 1, 1, scene, '3', orangeMaterial, false, box)
  createSphere(1, 0, -1, scene, '4', orangeMaterial, false, box)
  createSphere(1, -1, 0, scene, '5', orangeMaterial, false, box)
  const frameRate = 10
  const rotation = new BABYLON.Animation('rotation', 'rotation.y', frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
  const keyFramesR = []
  keyFramesR.push({
    frame: 0,
    value: 0
  })
  keyFramesR.push({
    frame: frameRate,
    value: Math.PI
  })
  keyFramesR.push({
    frame: 2 * frameRate,
    value: 2 * Math.PI
  })
  rotation.setKeys(keyFramesR)
  scene.beginDirectAnimation(box, [rotation], 0, 20, true)
  // GUI set up
  const mainSceneAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene)
  const instructionButton = BABYLON.GUI.Button.CreateImageOnlyButton('instruction', require('@/games/MagicCube/Photos/MainPage/instruction.jpg'))
  instructionButton.cornerRadius = 500
  mainSceneAdvancedTexture.addControl(instructionButton)
  const playButton = BABYLON.GUI.Button.CreateImageOnlyButton('play', require('@/games/MagicCube/Photos/MainPage/play.jpg'))
  playButton.cornerRadius = 500
  mainSceneAdvancedTexture.addControl(playButton)
  instructionButton.left = '-200px'
  instructionButton.top = '200px'
  instructionButton.width = '80px'
  instructionButton.height = '80px'
  instructionButton.onPointerClickObservable.add(() => {
    const panel = new BABYLON.GUI.StackPanel()
    panel.background = 'green'
    panel.width = '600px'
    panel.height = '400px'
    mainSceneAdvancedTexture.addControl(panel)
    const howToPlayMessage = new BABYLON.GUI.TextBlock()
    howToPlayMessage.text = 'How To Play'
    howToPlayMessage.color = 'white'
    howToPlayMessage.fontSize = '36px'
    howToPlayMessage.width = '300px'
    howToPlayMessage.height = '100px'
    howToPlayMessage.textWrapping = true
    const instructionMessage = new BABYLON.GUI.TextBlock()
    instructionMessage.text = 'Alter the orientation of the pieces and drag them to different positions to form a cube according to the image at the top right corner.'
    instructionMessage.color = 'white'
    instructionMessage.fontSize = 24
    instructionMessage.width = '500px'
    instructionMessage.height = '200px'
    instructionMessage.textWrapping = true
    const confirmButton = BABYLON.GUI.Button.CreateSimpleButton('OK', 'OK!')
    confirmButton.width = '80px'
    confirmButton.height = '80px'
    confirmButton.background = 'white'
    confirmButton.onPointerClickObservable.add(() => {
      panel.dispose()
    })
    panel.addControl(howToPlayMessage)
    panel.addControl(instructionMessage)
    panel.addControl(confirmButton)
  })
  playButton.left = '200px'
  playButton.top = '200px'
  playButton.width = '80px'
  playButton.height = '80px'
  playButton.onPointerClickObservable.add(() => {
    mainSceneAdvancedTexture.dispose()
    myScene = createChooseLevelScene(engine, scene)
  })
  return scene
}

function createGameSceneGUI (engine, scene, level) {
  let gameSceneAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene)
  const music = new BABYLON.Sound('background-music', require('@/games/MagicCube/Music/bgm.mp3'), scene, null)
  music.loop = true
  music.autoplay = true

  const panel = new BABYLON.GUI.StackPanel()
  panel.isVertical = false
  gameSceneAdvancedTexture.addControl(panel)

  const panel2 = new BABYLON.GUI.StackPanel()
  gameSceneAdvancedTexture.addControl(panel2)
  const image = new BABYLON.GUI.Image('photoplane', require('@/games/MagicCube/Photos/GameScene/game' + level + '.png'))
  image.width = '200px'
  image.height = '200px'
  panel2.addControl(image)
  panel2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
  panel2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  panel2.width = '200px'
  panel2.height = '300px'

  const backButton = BABYLON.GUI.Button.CreateImageOnlyButton('home', require('@/games/MagicCube/Photos/MainPage/home.jpg'))
  gameSceneAdvancedTexture.addControl(backButton)
  backButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
  backButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  backButton.width = '80px'
  backButton.height = '80px'
  backButton.onPointerClickObservable.add(() => {
    gameSceneAdvancedTexture.dispose()
    music.stop()
    myScene = createMainScene(engine)
  })

  const panel4 = new BABYLON.GUI.StackPanel()
  panel4.isVertical = false
  gameSceneAdvancedTexture.addControl(panel4)

  return { panel, panel4 }
}

function createSphere (x, y, z, scene, id, material, pickable, parent = null) {
  const sphere = BABYLON.MeshBuilder.CreateSphere(material.id + '-' + id, {}, scene)

  if (parent) sphere.parent = parent
  if (material) sphere.material = material

  sphere.position.x = x
  sphere.position.y = y
  sphere.position.z = z

  sphere.isPickable = pickable

  return sphere
}

function createBox (x, y, z, scene, material) {
  const box = BABYLON.Mesh.CreateBox('transparent-box', 3, scene)

  box.material = material

  box.position.x = x
  box.position.y = y
  box.position.z = z

  box.renderingGroupId = 3
  box.isPickable = false

  return box
}

function createRotationButton (targetMesh, panel, id, text) {
  const button = BABYLON.GUI.Button.CreateSimpleButton(id, text)
  button.width = '30px'
  button.height = '30px'
  button.top = '70px'
  button.color = 'black'
  button.background = 'white'
  button.onPointerClickObservable.add(() => {
    const parentID = targetMesh.id.split('-')[0] + '-1'
    const parent = spheres.find(sphere => sphere.id === parentID)
    const s = spheres.filter(s => s.id.split('-')[0] === parent.id.split('-')[0])
    s.forEach(s1 => {
      if (s1 !== parent) {
        let temp = 0
        if (text === '<') {
          temp = s1.position.x
          s1.position.x = -s1.position.z
          s1.position.z = temp
        } else {
          temp = s1.position.y
          s1.position.y = s1.position.z
          s1.position.z = -temp
        }
      }
    })
  })
  panel.addControl(button)
}

function createMaterials (scene) {
  const purpleMaterial = new BABYLON.StandardMaterial('purple', scene)
  const redMaterial = new BABYLON.StandardMaterial('red', scene)
  const yellowMaterial = new BABYLON.StandardMaterial('yellow', scene)
  const orangeMaterial = new BABYLON.StandardMaterial('orange', scene)
  const greenMaterial = new BABYLON.StandardMaterial('green', scene)
  const cyanMaterial = new BABYLON.StandardMaterial('cyan', scene)
  const transparentMaterial = new BABYLON.StandardMaterial('transparent', scene)
  const lightGreenMaterial = new BABYLON.StandardMaterial('lightgreen', scene)
  purpleMaterial.diffuseColor = new BABYLON.Color4(0.4, 0, 0.4, 1)
  redMaterial.diffuseColor = new BABYLON.Color4(1, 0, 0, 1)
  yellowMaterial.diffuseColor = new BABYLON.Color4(1, 1, 0, 1)
  orangeMaterial.diffuseColor = new BABYLON.Color4(1, 0.5, 0, 1)
  greenMaterial.diffuseColor = new BABYLON.Color4(0, 1, 0, 1)
  cyanMaterial.diffuseColor = new BABYLON.Color4(0, 1, 1, 1)
  transparentMaterial.diffuseColor = new BABYLON.Color3(0.768, 0.768, 0.768)
  transparentMaterial.alpha = 0.3
  lightGreenMaterial.diffuseColor = new BABYLON.Color3(0.56, 0.93, 0.56)
  return { purpleMaterial, redMaterial, yellowMaterial, orangeMaterial, greenMaterial, cyanMaterial, transparentMaterial, lightGreenMaterial }
}

function getPos (sphere) {
  let { x, y, z } = 0
  const parentSphere = spheres.find(s => s.id === sphere.id.split('-')[0] + '-1')
  if (sphere === parentSphere) {
    x = Math.round(sphere.position.x)
    y = Math.round(sphere.position.y)
    z = Math.round(sphere.position.z)
  } else {
    x = Math.round(parentSphere.position.x) + sphere.position.x
    y = Math.round(parentSphere.position.y) + sphere.position.y
    z = Math.round(parentSphere.position.z) + sphere.position.z
  }
  return { x, y, z }
}

function checkValid (spheres) {
  let counter = 0
  spheres.forEach(sphere => {
    const { x, y, z } = getPos(sphere)
    const targetSphere = (Object.values(transparentSpheres)).find(s => s.position.x === x && s.position.y === y && s.position.z === z)
    if (targetSphere && transparentSpheres[targetSphere.id.split('-')[1]].isOccupied === false) {
      counter++
    }
  })
  if (counter === spheres.length) {
    return true
  } else {
    return false
  }
}

function isOccupied (s1, s2) {
  const { x, y, z } = getPos(s2)
  if ((s1.position.x === x) && (s1.position.y === y) && (s1.position.z === z)) {
    return true
  } else {
    return false
  }
}

function updateOccupancy () {
  Object.values(transparentSpheres).forEach(s1 => {
    let occupied = false
    spheres.forEach(s2 => {
      if (isOccupied(s1, s2)) {
        occupied = true
      }
    })
    if (occupied) {
      transparentSpheres[s1.id.split('-')[1]].isOccupied = true
    } else {
      transparentSpheres[s1.id.split('-')[1]].isOccupied = false
    }
  })
}

function createAnswers (scene, { purpleMaterial, redMaterial, yellowMaterial, orangeMaterial, greenMaterial, cyanMaterial, transparentMaterial }) {
  let answer = []
  answer.push(createSphere(0, 4, -1, scene, 1, purpleMaterial, false))
  answer.push(createSphere(-1, 4, 0, scene, 1, yellowMaterial, false))
  answer.push(createSphere(-1, 2, -1, scene, 1, redMaterial, false))
  answer.push(createSphere(0, 2, 1, scene, 1, greenMaterial, false))
  answer.push(createSphere(0, 3, 0, scene, 1, cyanMaterial, false))
  answer.push(createSphere(1, 3, 0, scene, 1, orangeMaterial, false))
  answer.forEach(s1 => {
    s1.isVisible = false
  })
  answers['1-1'] = answer
  answer = []
  answer.push(createSphere(1, 2, -1, scene, 1, purpleMaterial, false))
  answer.push(createSphere(0, 2, 1, scene, 1, yellowMaterial, false))
  answer.push(createSphere(1, 4, 1, scene, 1, redMaterial, false))
  answer.push(createSphere(0, 4, 0, scene, 1, greenMaterial, false))
  answer.push(createSphere(-1, 3, 0, scene, 1, cyanMaterial, false))
  answer.push(createSphere(0, 3, 0, scene, 1, orangeMaterial, false))
  answer.forEach(s1 => {
    s1.isVisible = false
  })
  answers['1-2'] = answer
  answer = []
  answer.push(createSphere(0, 2, 0, scene, 1, purpleMaterial, false))
  answer.push(createSphere(-1, 4, 0, scene, 1, yellowMaterial, false))
  answer.push(createSphere(1, 3, -1, scene, 1, redMaterial, false))
  answer.push(createSphere(0, 3, 1, scene, 1, greenMaterial, false))
  answer.push(createSphere(-1, 2, 0, scene, 1, cyanMaterial, false))
  answer.push(createSphere(0, 3, -1, scene, 1, orangeMaterial, false))
  answer.forEach(s1 => {
    s1.isVisible = false
  })
  answers['1-3'] = answer
  answer = []
  answer.push(createSphere(0, 3, 0, scene, 1, purpleMaterial, false))
  answer.push(createSphere(0, 2, 1, scene, 1, yellowMaterial, false))
  answer.push(createSphere(1, 2, -1, scene, 1, redMaterial, false))
  answer.push(createSphere(1, 3, 0, scene, 1, greenMaterial, false))
  answer.push(createSphere(0, 4, 0, scene, 1, cyanMaterial, false))
  answer.push(createSphere(-1, 3, 0, scene, 1, orangeMaterial, false))
  answer.forEach(s1 => {
    s1.isVisible = false
  })
  answers['1-4'] = answer
}

function checkAnswer (answer, panel4) {
  let counter = 0
  for (var i = 0; i < 6; i++) {
    if (spheres[i].position.x === answer[i].position.x && spheres[i].position.y === answer[i].position.y && spheres[i].position.z === answer[i].position.z) {
      counter++
    }
  }
  if (counter === 6) {
    const winningMessage = new BABYLON.GUI.TextBlock()
    winningMessage.text = 'You win!!!'
    winningMessage.color = 'white'
    winningMessage.fontSize = 24
    winningMessage.width = '150px'
    winningMessage.height = '45px'
    panel4.addControl(winningMessage)
    panel4.height = '50px'
    panel4.width = '200px'
    panel4.background = 'green'
  }
}

function createGameScene (engine, level) {
  const scene = initScene(engine)
  const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, new BABYLON.Vector3(0, -1, 0), scene)
  camera.attachControl(document.getElementById('render-canvas'), false)
  camera.setPosition(new BABYLON.Vector3(13, 17, -13))
  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, -1), scene)
  light.intensity = 0.5
  const light2 = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0, -1, 1), scene)
  light2.intensity = 1
  const light3 = new BABYLON.DirectionalLight('light3', new BABYLON.Vector3(0, 0, 1), scene)
  light3.intensity = 0.5
  const background = new BABYLON.Layer('background', require('@/games/MagicCube/Photos/GameScene/gameBackground.jpg'), scene)
  background.alpha = 1
  const { panel, panel4 } = createGameSceneGUI(engine, scene, level)

  const { purpleMaterial, redMaterial, yellowMaterial, orangeMaterial, greenMaterial, cyanMaterial, transparentMaterial, lightGreenMaterial } = createMaterials(scene)

  createBox(0, 3, 0, scene, transparentMaterial)

  const indicator = BABYLON.MeshBuilder.CreateDisc('indicator', { sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene)
  indicator.position.x = -1.5
  indicator.position.y = 4.8
  indicator.position.z = 1.5
  indicator.rotation.y = -Math.PI / 4
  indicator.material = lightGreenMaterial

  // Define spheres
  spheres.push(createSphere(-3, 3, -2.5, scene, 1, purpleMaterial, true))
  spheres.push(createSphere(0.3, 2.4, -3, scene, 1, yellowMaterial, true))
  spheres.push(createSphere(-2, 2, -4.4, scene, 1, redMaterial, true))
  spheres.push(createSphere(5.4, 2.8, 2.4, scene, 1, greenMaterial, true))
  spheres.push(createSphere(4.8, 2.8, 0.2, scene, 1, cyanMaterial, true))
  spheres.push(createSphere(4.6, 3.4, -2.5, scene, 1, orangeMaterial, true))

  spheres.push(createSphere(1, 0, 0, scene, 2, purpleMaterial, true, spheres[0]))
  spheres.push(createSphere(0, 1, 0, scene, 3, purpleMaterial, true, spheres[0]))

  spheres.push(createSphere(1, 0, 0, scene, 2, yellowMaterial, true, spheres[1]))
  spheres.push(createSphere(-1, 0, 0, scene, 3, yellowMaterial, true, spheres[1]))
  spheres.push(createSphere(0, 1, 0, scene, 4, yellowMaterial, true, spheres[1]))
  spheres.push(createSphere(0, 2, 0, scene, 5, yellowMaterial, true, spheres[1]))

  spheres.push(createSphere(1, 0, 0, scene, 2, redMaterial, true, spheres[2]))
  spheres.push(createSphere(2, 0, 0, scene, 3, redMaterial, true, spheres[2]))
  spheres.push(createSphere(0, 1, 0, scene, 4, redMaterial, true, spheres[2]))

  spheres.push(createSphere(-1, 0, 0, scene, 2, greenMaterial, true, spheres[3]))
  spheres.push(createSphere(-1, 1, 0, scene, 3, greenMaterial, true, spheres[3]))
  spheres.push(createSphere(1, 0, 0, scene, 4, greenMaterial, true, spheres[3]))
  spheres.push(createSphere(1, 1, 0, scene, 5, greenMaterial, true, spheres[3]))

  spheres.push(createSphere(-1, 0, 0, scene, 2, cyanMaterial, true, spheres[4]))
  spheres.push(createSphere(-1, 1, 0, scene, 3, cyanMaterial, true, spheres[4]))
  spheres.push(createSphere(0, 1, 0, scene, 4, cyanMaterial, true, spheres[4]))
  spheres.push(createSphere(1, 0, 0, scene, 5, cyanMaterial, true, spheres[4]))

  spheres.push(createSphere(-1, 0, 0, scene, 2, orangeMaterial, true, spheres[5]))
  spheres.push(createSphere(1, 0, 0, scene, 3, orangeMaterial, true, spheres[5]))
  spheres.push(createSphere(0, 1, 0, scene, 4, orangeMaterial, true, spheres[5]))
  spheres.push(createSphere(1, -1, 0, scene, 5, orangeMaterial, true, spheres[5]))

  // create transparent spheres
  let n = 1
  for (var x = -1; x < 2; x++) {
    for (var y = 2; y < 5; y++) {
      for (var z = -1; z < 2; z++) {
        transparentSpheres[n.toString()] = createSphere(x, y, z, scene, n, transparentMaterial, false)
        transparentSpheres[n.toString()].isOccupied = false
        n++
      }
    }
  }

  createAnswers(scene, { purpleMaterial, redMaterial, yellowMaterial, orangeMaterial, greenMaterial, cyanMaterial, transparentMaterial })

  const answer = answers[level]

  spheres.filter(sphere => sphere.id.split('-')[1] === '1').forEach(parent => {
    const pointerDragBehavior = new BABYLON.PointerDragBehavior()
    pointerDragBehavior.useObjectOrientationForDragging = true
    pointerDragBehavior.updateDragPlane = false
    parent.addBehavior(pointerDragBehavior)
    // Listen to events
    pointerDragBehavior.onDragObservable.add(e => {
      if (e.dragPlanePoint.x >= 20 || e.dragPlanePoint.x <= -10 || e.dragPlanePoint.y >= 20 || e.dragPlanePoint.y <= -20 || e.dragPlanePoint.z >= 20 || e.dragPlanePoint.z <= -20) {
        pointerDragBehavior.releaseDrag()
      }
    })
    pointerDragBehavior.onDragEndObservable.add(e => {
      const pickResult = scene.pick(scene.pointerX, scene.pointerY)
      if (pickResult.pickedMesh) { // prevent quick flick of cursor
        const selectedColor = pickResult.pickedMesh.material.id
        const selectedSpheres = spheres.filter(sphere => sphere.id.split('-')[0] === selectedColor)
        const parentSphere = spheres.find(sphere => sphere.id === selectedColor + '-' + '1')
        selectedSpheres.sort((s1, s2) => {
          if (s1.id.split('-')[1] > s2.id.split('-')[1]) return false
          else return true
        })
        if (checkValid(selectedSpheres)) {
          // match the spheres
          const { x, y, z } = getPos(parentSphere)
          parentSphere.position.x = x
          parentSphere.position.y = y
          parentSphere.position.z = z
        } else {
          // return the target spheres to start position
          let putAttempt = false
          selectedSpheres.forEach(s1 => {
            Object.values(transparentSpheres).forEach(s2 => {
              if (s1.intersectsMesh(s2)) {
                putAttempt = true
              }
            })
          })
          if (putAttempt) {
            switch (selectedColor) {
              case 'purple':
                parentSphere.position.x = -3
                parentSphere.position.y = 3
                parentSphere.position.z = -2.5
                break
              case 'yellow':
                parentSphere.position.x = 0.3
                parentSphere.position.y = 2.4
                parentSphere.position.z = -3
                break
              case 'red':
                parentSphere.position.x = -2
                parentSphere.position.y = 2
                parentSphere.position.z = -4.4
                break
              case 'green':
                parentSphere.position.x = 5.4
                parentSphere.position.y = 2.8
                parentSphere.position.z = 2.4
                break
              case 'cyan':
                parentSphere.position.x = 4.8
                parentSphere.position.y = 2.8
                parentSphere.position.z = 0.2
                break
              case 'orange':
                parentSphere.position.x = 4.6
                parentSphere.position.y = 3.4
                parentSphere.position.z = -2.5
            }
          }
        }
        updateOccupancy()
        checkAnswer(answer, panel4)
      }
    })
  })
  window.addEventListener('click', () => {
    const pickResult = scene.pick(scene.pointerX, scene.pointerY)
    if (pickResult.hit && !panel.linkedMesh) {
      const targetMesh = pickResult.pickedMesh
      panel.linkWithMesh(targetMesh)
      createRotationButton(targetMesh, panel, 'rotate-x', '<')
      createRotationButton(targetMesh, panel, 'rotate-y', 'v')
    } else {
      panel.clearControls()
      panel.linkWithMesh(null)
    }
  })
  return scene
}

export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    const engine = new BABYLON.Engine(this.$refs['render-canvas'])
    myScene = createMainScene(engine)

    engine.runRenderLoop(function () {
      myScene.render()
    })
  },
  beforeDestroy () {
    myScene.dispose()
    http.magicCubeFinished(this.user._id)
      .then(() => {
        this.$store.dispatch('fetchUser')
      })
      .catch(err => console.log(err))
  }
}
</script>

<style scoped lang="scss">
  #render-canvas {
    width: 100%;
    height: calc(100vh - 4rem);
  }
</style>
