<template>
  <div>
    <v-carousel
      cycle
      continuous
      hide-delimiter-background
      delimiter-icon="mdi-circle-small"
      height="70vh"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="`slide-${i}`"
        :src="slide.img"
      >
        <div class="carousel-filter">
          <div class="headline-wrapper container d-flex flex-column justify-center align-center align-md-start">
            <span class="display-3 white--text font-weight-bold">
              {{ slide.headline }}
            </span>
            <span class="title white--text">{{ slide.from }}</span>
          </div>
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
  async created () {
    this.slides = await this.fetchSlides()
  },
  data: () => ({
    slides: []
  }),
  methods: {
    async fetchSlides () {
      return [
        {
          headline: 'Welcome to STEM Portal!',
          from: 'STEM Portal Team',
          img: 'https://anabolicaces.com/wp-content/uploads/2017/12/Cityscape-FB-article.jpg'
        },
        {
          headline: 'STEM Education at its best!',
          from: 'Susanto Christopher Alvin',
          img: 'https://jacobsmedia.com/wp-content/uploads/2016/07/mobile-apps-1.jpg'
        },
        {
          headline: 'Contribute and Benefit with the Community.',
          from: 'Ricola Wan',
          img: 'https://www.commercialintegrator.com/wp-content/uploads/2019/09/Technology-fast-1400x650.jpeg'
        },
        {
          headline: 'Features are Ever-expanding!',
          from: 'Brian Chow Chow Wong',
          img: 'https://joinpop.org/wp-content/uploads/2019/04/laboratory.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .carousel-filter {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .headline-wrapper {
    height: 100%;
    padding: 2rem;
  }

  @media (max-width: 960px) {
    .headline-wrapper {
      text-align: center;
    }
  }

  @media (max-width: 600px) {
    .headline-wrapper {
      padding: 1rem;
    }
  }
</style>
