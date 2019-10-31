<template>
  <div class="container">
    <div class="text-center">
      <h1>Resources For Teachers</h1>
      <br>
      Here you can upload your own teaching materials for others or <br>
      find useful teaching materials shared by other teachers. <br>
    </div>
    <div class="row justify-center d-flex justify-space-around">
        <v-btn @click="filter=filter==='Maths' ? '' : 'Maths'" depressed small>Maths</v-btn>
        <v-btn @click="filter=filter==='Coding' ? '' : 'Coding'" depressed small>Coding</v-btn>
        <v-btn @click="filter=filter==='Physics' ? '' : 'Physics'" depressed small>Physics</v-btn>
        <v-btn @click="filter=filter==='Chemistry' ? '' : 'Chemistry'" depressed small>Chemistry</v-btn>
        <v-btn @click="filter=filter==='Engineering' ? '' : 'Engineering'" depressed small>Engineering</v-btn>
        <v-btn @click="filter=filter==='Biology' ? '' : 'Biology'" depressed small>Biology</v-btn>
    </div>
    <div class="row">
      <v-col v-if="filter === 'Maths' || filter === ''">
        <v-card>
          <v-card-title>MATH1851</v-card-title>
          <v-card-text>Calculus and Ordinary Differiential Equations</v-card-text>
          <v-card-text>Here you can find some powerpoint and tutorials...</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn text color="indigo">
              More
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-if="filter === 'Maths' || filter === ''">
        <v-card>
          <v-card-title>MATH1853</v-card-title>
          <v-card-text>Linear Algebra, Probability and Statistics</v-card-text>
          <v-card-text>Here you can find some powerpoint and tutorials...</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn text color="indigo" to="/teacher/MATH1853.vue">
              More
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-if="filter === 'Coding' || filter === ''">
        <v-card>
          <v-card-title>ENGG1330</v-card-title>
          <v-card-text>Computer Programming I</v-card-text>
          <v-card-text>Here you can find some powerpoint and tutorials...</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn text color="indigo">
              More
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </div>
    <div class="row">
      <v-col v-if="filter === 'Engineering' || filter === ''">
        <v-card>
          <v-card-title>ENGG1310</v-card-title>
          <v-card-text>Electricity and Electronics</v-card-text>
          <v-card-text>Here you can find some powerpoint and tutorials...</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn text color="indigo">
              More
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-if="filter === 'Physics' || filter === ''">
        <v-card>
          <v-card-title>PHYS1250</v-card-title>
          <v-card-text>Fundamental Physics</v-card-text>
          <v-card-text>Here you can find some powerpoint and tutorials...</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn text color="indigo">
              More
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-if="filter === 'Chemistry' || filter === ''">
        <v-card>
          <v-card-title>CHEM1041</v-card-title>
          <v-card-text>Fundamental Chemistry</v-card-text>
          <v-card-text>Here you can find some powerpoint and tutorials...</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn text color="indigo">
              More
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </div>
    <div class="text-center mt-6" v-if="filter==='Biology'">
      <p>Opps! Looks like there is nothing here. Maybe you can try upload something...?</p>
    </div>
    <div class="text-center">
      <v-btn to="/happy-corner/upload">Upload</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    filter: ''
  })
}
</script>
