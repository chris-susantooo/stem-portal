<template>
  <div>
      <v-carousel
      cycle
      height="400"
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">{{ slide }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <div class="container">
      <div class="row">
        <p class="font-weight-bold">Recent News</p>
      </div>
      <div class="row">
        <v-col>
          <v-card>
            <v-card-title>First</v-card-title>
            <v-card-text>Hi there, I am using Whatsapp!</v-card-text>
          </v-card>
        </v-col>
         <v-col>
          <v-card>
            <v-card-title>Second</v-card-title>
            <v-card-text>Hi there, I am using Facebook!</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Third</v-card-title>
            <v-card-text>Hi there, I am using STEM Portal!</v-card-text>
          </v-card>
        </v-col>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  //
  data: () => ({
    colors: [
      'indigo',
      'warning',
      'pink darken-2',
      'red lighten-1',
      'deep-purple accent-4'
    ],
    slides: [
      'Welcome',
      'To',
      'STEM',
      'Portal',
      ':)'
    ]
  })
}
</script>
