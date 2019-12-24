<template>
<div class="container">
  <Scene v-model="myScene" @pointer$="doSth">
    <!-- <Camera v-model="myCamera"></Camera> -->
    <Box :position="[0, 3, 0]" :scaling="[3, 3, 3]">
      <Material emissive="#ffffff" :alpha="0.1"></Material>
    </Box>
    <Sphere :position="[0, 3, 0]">
      <Material emissive="#FF0000"></Material>
    </Sphere>
    <Sphere :position="[0, 4, 0]">
      <Material emissive="#1BA1E2"></Material>
    </Sphere>
    <Sphere :position="[0, 2, 0]">
      <Material emissive="#60A917"></Material>
    </Sphere>
    <Sphere :position="[0, 3, 1]">
      <Material emissive="#E3C800"></Material>
    </Sphere>
    <Sphere :position="[0, 4, 1]">
      <Material emissive="#E3C800"></Material>
    </Sphere>
    <Sphere :position="[0, 2, 1]">
      <Material emissive="#E3C800"></Material>
    </Sphere>
    <Sphere :position="[0, 4, -1]">
      <Material emissive="#1BA1E2"></Material>
    </Sphere>
    <Sphere :position="[0, 2, -1]">
      <Material emissive="#FA6800"></Material>
    </Sphere>
    <Sphere :position="[0, 3, -1]">
      <Material emissive="#FA6800"></Material>
    </Sphere>
    <Sphere :position="[1, 3, 0]">
      <Material emissive="#FF0000"></Material>
    </Sphere>
    <Sphere :position="[1, 4, 0]">
      <Material emissive="#1BA1E2"></Material>
    </Sphere>
    <Sphere :position="[1, 2, 0]">
      <Material emissive="#60A917"></Material>
    </Sphere>
    <Sphere :position="[1, 3, 1]">
      <Material emissive="#FF0000"></Material>
    </Sphere>
    <Sphere :position="[1, 4, 1]">
      <Material emissive="#1BA1E2"></Material>
    </Sphere>
    <Sphere :position="[1, 2, 1]">
      <Material emissive="#E3C800"></Material>
    </Sphere>
    <Sphere :position="[1, 4, -1]">
      <Material emissive="#1BA1E2"></Material>
    </Sphere>
    <Sphere :position="[1, 2, -1]">
      <Material emissive="#60A917"></Material>
    </Sphere>
    <Sphere :position="[1, 3, -1]">
      <Material emissive="#FA6800"></Material>
    </Sphere>
    <Sphere :position="[-1, 3, 0]">
      <Material emissive="#FF0000"></Material>
    </Sphere>
    <Sphere :position="[-1, 4, 0]">
      <Material emissive="#AA00FF"></Material>
    </Sphere>
    <Sphere :position="[-1, 2, 0]">
      <Material emissive="#60A917"></Material>
    </Sphere>
    <Sphere :position="[-1, 3, 1]">
      <Material emissive="#AA00FF"></Material>
    </Sphere>
    <Sphere :position="[-1, 4, 1]">
      <Material emissive="#AA00FF"></Material>
    </Sphere>
    <Sphere :position="[-1, 2, 1]">
      <Material emissive="#E3C800"></Material>
    </Sphere>
    <Sphere :position="[-1, 4, -1]">
      <Material emissive="#FA6800"></Material>
    </Sphere>
    <Sphere :position="[-1, 2, -1]">
      <Material emissive="#60A917"></Material>
    </Sphere>
    <Sphere :position="[-1, 3, -1]">
      <Material emissive="#FA6800"></Material>
    </Sphere>
    <Sphere :position="[3, 3, 3]" @entity="onSphere">
      <Material emissive="#ffffff"></Material>
    </Sphere>
  </Scene>
  <div class="row">
    <p>Hi</p>
  </div>
</div>
</template>

<script>
import * as BABYLON from 'babylonjs'
export default {
  data: () => ({
    myCamera: {
      position: [0, 20, -20],
      target: [0, 3, 0],
      radius: 10
    },
    myMaterial: {
      emissive: '#F00'
    },
    myScene: {
      setLightEnabled: false
    },
    sphere: null
  }),
  methods: {
    doSth (event) {
      if (event.observable._eventState.mask === BABYLON.PointerEventTypes.POINTERDOWN) {
        console.log(event)
      }
    },
    onSphere (event) {
      console.log(event)
      this.sphere = event.entity
      console.log(this.sphere)
    }
  }
}
</script>
