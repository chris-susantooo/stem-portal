<template>
<div class="text-center">
  <canvas id="render-canvas" ref="render-canvas" width="1024" height="768"></canvas>
</div>
</template>

<script>
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

BABYLON.GUI = GUI

const spheres = []
const transparentSpheres = {}
const answers = {}
let mainScene
let myScene

function initScene (engine) {
  const scene = new BABYLON.Scene(engine)
  scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8)
  return scene
}

function createMainScene (engine) {
  const scene = initScene(engine)
  const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene)
  camera.attachControl(document.getElementById('render-canvas'), false)
  camera.setTarget(BABYLON.Vector3.Zero())

  const mainSceneAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene)
  const panel = new BABYLON.GUI.StackPanel()
  panel.isVertical = false
  mainSceneAdvancedTexture.addControl(panel)
  const buttons = []
  buttons.push(BABYLON.GUI.Button.CreateSimpleButton('1-1', 'Level 1'))
  buttons.push(BABYLON.GUI.Button.CreateSimpleButton('1-2', 'Level 2'))
  buttons.push(BABYLON.GUI.Button.CreateSimpleButton('1-3', 'Level 3'))
  buttons.push(BABYLON.GUI.Button.CreateSimpleButton('1-4', 'Level 4'))
  buttons.forEach(button => {
    panel.addControl(button)
    button.width = '80px'
    button.height = '40px'
    button.color = 'white'
    button.background = 'green'
    button.onPointerClickObservable.add(() => {
      mainSceneAdvancedTexture.dispose()
      myScene = createGameScene(engine, button.name)
    })
  })
  return scene
}

function createGUI (engine, scene, level) {
  let gameSceneAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene)
  const panel = new BABYLON.GUI.StackPanel()
  panel.isVertical = false
  gameSceneAdvancedTexture.addControl(panel)

  const panel2 = new BABYLON.GUI.StackPanel()
  gameSceneAdvancedTexture.addControl(panel2)
  const image = new BABYLON.GUI.Image('photoplane', require('./Photos/game' + level + '.png'))
  image.width = '200px'
  image.height = '200px'
  panel2.addControl(image)
  panel2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
  panel2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  panel2.width = '200px'
  panel2.height = '300px'

  const panel3 = new BABYLON.GUI.StackPanel()
  gameSceneAdvancedTexture.addControl(panel3)
  const backButton = BABYLON.GUI.Button.CreateSimpleButton('back', 'Back to Main')
  panel3.addControl(backButton)
  panel3.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
  panel3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  panel3.width = '200px'
  panel3.height = '100px'
  backButton.width = '120px'
  backButton.height = '50px'
  backButton.color = 'white'
  backButton.background = 'green'
  backButton.onPointerClickObservable.add(() => {
    gameSceneAdvancedTexture.dispose()
    myScene = createMainScene(engine)
  })

  const panel4 = new BABYLON.GUI.StackPanel()
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
  purpleMaterial.emissiveColor = new BABYLON.Color4(0.4, 0, 0.4, 1)
  redMaterial.emissiveColor = new BABYLON.Color4(1, 0, 0, 1)
  yellowMaterial.emissiveColor = new BABYLON.Color4(1, 1, 0, 1)
  orangeMaterial.emissiveColor = new BABYLON.Color4(1, 0.5, 0, 1)
  greenMaterial.emissiveColor = new BABYLON.Color4(0, 1, 0, 1)
  cyanMaterial.emissiveColor = new BABYLON.Color4(0, 1, 1, 1)
  transparentMaterial.diffuseColor = new BABYLON.Color3(0.768, 0.768, 0.768)
  transparentMaterial.alpha = 0.3
  return { purpleMaterial, redMaterial, yellowMaterial, orangeMaterial, greenMaterial, cyanMaterial, transparentMaterial }
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
    panel4.addControl(winningMessage)
    panel4.height = '50px'
    panel4.width = '200px'
    panel4.background = 'green'
  }
}

function createGameScene (engine, level) {
  const scene = initScene(engine)
  const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene)
  camera.attachControl(document.getElementById('render-canvas'), false)
  camera.setTarget(BABYLON.Vector3.Zero())
  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene)
  light.setEnabled = true

  const { panel, panel4 } = createGUI(engine, scene, level)

  const { purpleMaterial, redMaterial, yellowMaterial, orangeMaterial, greenMaterial, cyanMaterial, transparentMaterial } = createMaterials(scene)

  createBox(0, 3, 0, scene, transparentMaterial)

  // Define spheres
  spheres.push(createSphere(2, 3, 0, scene, 1, purpleMaterial, true))
  spheres.push(createSphere(6, 3, 0, scene, 1, yellowMaterial, true))
  spheres.push(createSphere(8, 3, 0, scene, 1, redMaterial, true))
  spheres.push(createSphere(12, 3, 0, scene, 1, greenMaterial, true))
  spheres.push(createSphere(15, 3, 0, scene, 1, cyanMaterial, true))
  spheres.push(createSphere(18, 3, 0, scene, 1, orangeMaterial, true))

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
    pointerDragBehavior.useObjectOrientationForDragging = false
    pointerDragBehavior.updateDragPlane = false
    parent.addBehavior(pointerDragBehavior)
    // Listen to events
    pointerDragBehavior.onDragObservable.add(e => {
      if (e.dragPlanePoint.x >= 20 || e.dragPlanePoint.x <= -10 || e.dragPlanePoint.y >= 10 || e.dragPlanePoint.y <= -10 || e.dragPlanePoint.z >= 5 || e.dragPlanePoint.z <= -5) {
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
                parentSphere.position.x = 2
                parentSphere.position.y = 3
                parentSphere.position.z = 0
                break
              case 'yellow':
                parentSphere.position.x = 6
                parentSphere.position.y = 3
                parentSphere.position.z = 0
                break
              case 'red':
                parentSphere.position.x = 8
                parentSphere.position.y = 3
                parentSphere.position.z = 0
                break
              case 'green':
                parentSphere.position.x = 12
                parentSphere.position.y = 3
                parentSphere.position.z = 0
                break
              case 'cyan':
                parentSphere.position.x = 15
                parentSphere.position.y = 3
                parentSphere.position.z = 0
                break
              case 'orange':
                parentSphere.position.x = 18
                parentSphere.position.y = 3
                parentSphere.position.z = 0
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
  mounted () {
    const engine = new BABYLON.Engine(this.$refs['render-canvas'])
    mainScene = createMainScene(engine)

    myScene = mainScene

    engine.runRenderLoop(function () {
      myScene.render()
    })
  }
}
</script>
