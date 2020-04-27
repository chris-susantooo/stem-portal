<template>
  <div class="container">
    <div class="row">
      <h1>Games</h1>
    </div>
    <div class="row">
      <p>Here you can play different games. Try on some games to have some fun!</p>
    </div>
    <div class="row">
      <div class="row">
        <div class="col">
          <v-card>
            <v-card-title class="d-flex justify-center">
              <h3>Magic Cube</h3>
            </v-card-title>
            <v-container class="d-flex justify-center">
              <v-img
                :src="require('@/assets/images/magic-cube-screenshot.png')"
                contain
                width="200"
                height="200"
            ></v-img>
            </v-container>
            <v-card-text class="text-center">
              Magic Cube is a 3D problem-solving game. You need to alter the orientation and position of pieces of different shapes to form a 3x3 cube.
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn text color="indigo" :to="{ name: 'MagicCube' }">
                Play Game!
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="col">
          <v-card>
            <v-card-title class="d-flex justify-center">
              <h3>SolveThEM</h3>
            </v-card-title>
            <v-container class="d-flex justify-center">
              <v-img
                :src="require('@/assets/images/magic-cube-screenshot.png')"
                contain
                width="200"
                height="200"
            ></v-img>
            </v-container>
            <v-card-text class="text-center">
              SolveThEM is a mathematical game. You need to choose the compute the correct answers in limited time.
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn text color="indigo" :to="{ name: 'SolveThEM' }">
                Play Game!
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
