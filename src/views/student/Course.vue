<template>
  <div class="container">
    <div class="row">
      <h1>Online Courses</h1>
    </div>
    <div class="row">
      <p>Here you can view your own online courses. Complete your ongoing courses!</p>
    </div>
    <br>
    <div class="row">
      <div class="row ml-1">
        <h4>Ongoing Online Courses</h4>
      </div>
      <div class="row">
        <div class="col">
          <v-card>
            <v-card-title class="d-flex justify-center">
              <h6>Introductory Programming</h6>
            </v-card-title>
            <v-card-text class="d-flex justify-center">
              Students will learn basic techniques of programming in Python.
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn text color="indigo">
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="col">
          <v-card>
            <v-card-title class="d-flex justify-center">
              <h6>Addition and Subtraction I</h6>
            </v-card-title>
            <v-card-text class="d-flex justify-center">
              Students will learn simple arithmetic.
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn text color="indigo">
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="col">
          <v-card>
            <v-card-title class="d-flex justify-center">
              <h6>Geometry I</h6>
            </v-card-title>
            <v-card-text class="d-flex justify-center">
              Students will learn features of different figures
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn text color="indigo">
                Continue
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
