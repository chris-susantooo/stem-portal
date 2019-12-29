<template>
<canvas id="render-canvas" ref="render-canvas" width="1024" height="768"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

BABYLON.GUI = GUI

const spheres = []

function initScene (engine) {
  const scene = new BABYLON.Scene(engine)
  scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8)
  engine.runRenderLoop(() => {
    scene.render()
  })

  return scene
}

function initUI () {
  const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
  const panel = new BABYLON.GUI.StackPanel()
  panel.isVertical = false
  advancedTexture.addControl(panel)

  return panel
}

function createSphere (x, y, z, scene, id, material, parent = null) {
  const sphere = BABYLON.MeshBuilder.CreateSphere(material.id + '-' + id, scene)

  if (parent) sphere.parent = parent
  if (material) sphere.material = material

  sphere.position.x = x
  sphere.position.y = y
  sphere.position.z = z

  return sphere
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
    parent.rotate(text === '<' ? BABYLON.Axis.Y : BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.LOCAL)
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
  purpleMaterial.emissiveColor = new BABYLON.Color4(0.4, 0, 0.4, 1)
  redMaterial.emissiveColor = new BABYLON.Color4(1, 0, 0, 1)
  yellowMaterial.emissiveColor = new BABYLON.Color4(1, 1, 0, 1)
  orangeMaterial.emissiveColor = new BABYLON.Color4(1, 0.5, 0, 1)
  greenMaterial.emissiveColor = new BABYLON.Color4(0, 1, 0, 1)
  cyanMaterial.emissiveColor = new BABYLON.Color4(0, 1, 1, 1)
  return { purpleMaterial, redMaterial, yellowMaterial, orangeMaterial, greenMaterial, cyanMaterial }
}

export default {
  mounted () {
    const engine = new BABYLON.Engine(this.$refs['render-canvas'])
    const scene = initScene(engine)

    const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene)
    camera.attachControl(this.$refs['render-canvas'], false)
    camera.setTarget(BABYLON.Vector3.Zero())

    const light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 0), scene)
    light.setEnabled = false

    const panel = initUI()

    const { purpleMaterial, redMaterial, yellowMaterial, orangeMaterial, greenMaterial, cyanMaterial } = createMaterials(scene)

    // var box = BABYLON.Mesh.CreateBox('box', 2, scene)
    // box.rotation.x = -0.2
    // box.rotation.y = -0.4
    // var boxMaterial = new BABYLON.StandardMaterial('material', scene)
    // boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86)
    // box.material = boxMaterial

    // Define spheres
    // Purple shape
    spheres.push(createSphere(2, 3, 0, scene, 1, purpleMaterial))
    spheres.push(createSphere(6, 3, 0, scene, 1, yellowMaterial))
    spheres.push(createSphere(8, 3, 0, scene, 1, redMaterial))
    spheres.push(createSphere(12, 3, 0, scene, 1, greenMaterial))
    spheres.push(createSphere(15, 3, 0, scene, 1, cyanMaterial))
    spheres.push(createSphere(18, 3, 0, scene, 1, orangeMaterial))

    spheres.push(createSphere(1, 0, 0, scene, 2, purpleMaterial, spheres[0]))
    spheres.push(createSphere(1, 0, 1, scene, 3, purpleMaterial, spheres[0]))

    spheres.push(createSphere(1, 0, 0, scene, 2, yellowMaterial, spheres[1]))
    spheres.push(createSphere(-1, 0, 0, scene, 3, yellowMaterial, spheres[1]))
    spheres.push(createSphere(0, 1, 0, scene, 4, yellowMaterial, spheres[1]))
    spheres.push(createSphere(0, 2, 0, scene, 5, yellowMaterial, spheres[1]))

    spheres.push(createSphere(1, 0, 0, scene, 2, redMaterial, spheres[2]))
    spheres.push(createSphere(2, 0, 0, scene, 3, redMaterial, spheres[2]))
    spheres.push(createSphere(0, 1, 0, scene, 4, redMaterial, spheres[2]))

    spheres.push(createSphere(-1, 0, 0, scene, 2, greenMaterial, spheres[3]))
    spheres.push(createSphere(-1, 1, 0, scene, 3, greenMaterial, spheres[3]))
    spheres.push(createSphere(1, 0, 0, scene, 4, greenMaterial, spheres[3]))
    spheres.push(createSphere(1, 1, 0, scene, 5, greenMaterial, spheres[3]))

    spheres.push(createSphere(-1, 0, 0, scene, 2, cyanMaterial, spheres[4]))
    spheres.push(createSphere(-1, 1, 0, scene, 3, cyanMaterial, spheres[4]))
    spheres.push(createSphere(0, 1, 0, scene, 4, cyanMaterial, spheres[4]))
    spheres.push(createSphere(1, 0, 0, scene, 5, cyanMaterial, spheres[4]))

    spheres.push(createSphere(-1, 0, 0, scene, 2, orangeMaterial, spheres[5]))
    spheres.push(createSphere(1, 0, 0, scene, 3, orangeMaterial, spheres[5]))
    spheres.push(createSphere(0, 1, 0, scene, 4, orangeMaterial, spheres[5]))
    spheres.push(createSphere(1, -1, 0, scene, 5, orangeMaterial, spheres[5]))

    spheres.filter(sphere => sphere.id.split('-')[1] === '1').forEach(parent => {
      const pointerDragBehavior = new BABYLON.PointerDragBehavior()
      pointerDragBehavior.useObjectOrientationForDragging = false
      pointerDragBehavior.updateDragPlane = false
      parent.addBehavior(pointerDragBehavior)
      // Listen to events
      pointerDragBehavior.onDragObservable.add(e => {
        // const pick = scene.pick(scene.pointerX, scene.pointerY)
        // if (pick.hit) {
        //   const selectedColor = pick.pickedMesh.material.id
        //   const selectedSpheres = spheres.filter(sphere => sphere.id.split('-')[0] === selectedColor)
        //   selectedSpheres.forEach(s1 => {
        //     spheres.forEach(s2 => {
        //       if (s1.id.split('-')[0] !== s2.id.split('-')[0] && s1.intersectsMesh(s2)) {
        //       }
        //     })
        //   })
        // }

        if (e.dragPlanePoint.x >= 20 || e.dragPlanePoint.x <= -10 || e.dragPlanePoint.y >= 10 || e.dragPlanePoint.y <= -10 || e.dragPlanePoint.z >= 5 || e.dragPlanePoint.z <= -5) {
          pointerDragBehavior.releaseDrag()
        }
      })
      pointerDragBehavior.onDragEndObservable.add(e => {
        console.log(e)
        // fuck clip the spheres to the model
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
  }
}
// main page, select difficulties, .vue for each stage
</script>
