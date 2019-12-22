<template>
  <div>
    <v-carousel
      continuous
      cycle
      :show-arrows="false"
      hide-delimiters
      delimiter-icon="mdi-minus"
      height="70vh"
    >
      <v-carousel-item
        v-for="(item, i) in slides"
        :key="i"
        :src="item.img"
      >
        <div class="carousel-filter">
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">
              <h3 class="carousel-text">Welcome to STEM Portal!</h3>
            </div>
          </v-row>
        </div>
      </v-carousel-item>
    </v-carousel>
    <br>
    <div class="container">
      <div class="row">
        <h2 class="font-weight-bold">Recent News</h2>
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
  data: () => ({
    slides: [
      { img: 'https://anabolicaces.com/wp-content/uploads/2017/12/Cityscape-FB-article.jpg' },
      { img: 'https://jacobsmedia.com/wp-content/uploads/2016/07/mobile-apps-1.jpg' },
      { img: 'https://www.commercialintegrator.com/wp-content/uploads/2019/09/Technology-fast-1400x650.jpeg' },
      { img: 'https://joinpop.org/wp-content/uploads/2019/04/laboratory.jpg' }
    ]
  })
}
</script>

<style scoped>
.carousel-filter {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.carousel-text {
  color: white;
}
</style>
