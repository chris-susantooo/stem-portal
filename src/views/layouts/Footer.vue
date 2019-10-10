<template>
  <v-footer dark padless>
    <div class="container">
      <div class="d-flex justify-center pt-5">
        <h1 class="pt-2 pr-3">STEM Portal</h1>
        <div class="separator" />
        <img src="@/assets/images/hku_logo.png" alt="HKU logo" height="70" class="pl-3">
      </div>
      <div class="d-flex pt-3">
        <v-card-text class="white--text text-center">
          STEM Portal is a final year project conducted by a team of undergraduate students from the Department of Computer Science, Faculty of Engineering, The University of Hong Kong.
          By using STEM Portal, you agree to have read and accepted our terms of use, cookie and privacy policy.
        </v-card-text>
      </div>
      <v-divider></v-divider>

      <v-card-text class="white--text text-center">
        {{ new Date().getFullYear() }} — &copy; <strong>STEM Portal Team</strong>
      </v-card-text>
    </div>
  </v-footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.separator {
  border-left: 1px solid white;
  height: 70px;
}
</style>
