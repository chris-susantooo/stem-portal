<template>
<canvas id="render-canvas" ref="render-canvas"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs'
export default {
  mounted () {
    var engine = new BABYLON.Engine(this.$refs['render-canvas'])
    var scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8)
    engine.runRenderLoop(() => {
      scene.render()
    })
    var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene)
    var light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 0), scene)
    var box = BABYLON.Mesh.CreateBox('box', 2, scene)
    box.rotation.x = -0.2
    box.rotation.y = -0.4
    var boxMaterial = new BABYLON.StandardMaterial('material', scene)
    boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86)
    box.material = boxMaterial
  }
}
</script>
