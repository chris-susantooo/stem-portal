<template>
  <div>
    <div class="row">
      <v-img src="https://p2.piqsels.com/preview/138/687/639/children-cute-drawing-friends.jpg"
        alt=""
        contain>
      </v-img>
    </div>
    <div class="row">
      <div class="container">
        <h2 class="sub-title">As students, what can you do in STEM Portal?</h2>
        <p class="sub-title">There are a lot of things that you can do in STEM Portal. Let's see...</p>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <v-icon class="d-flex justify-center" size="128" color="blue darken-2">mdi-gamepad-variant</v-icon>
              <h2 class="card-title">Games</h2>
              <p class="card-description">You can learn about STEM topics through playing games! There must be a game that you love to play so much! Time to aim high score and train your brain!</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <v-icon class="d-flex justify-center" size="128" color="purple darken-2">mdi-book-open-page-variant</v-icon>
              <h2 class="card-title">Online Courses</h2>
              <p class="card-description">You can study online courses that are created by teachers. They are specially designed for you to learn about STEM topics!</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <v-icon class="d-flex justify-center" size="128" color="brown darken-2">mdi-search-web</v-icon>
              <h2 class="card-title">Explore</h2>
              <p class="card-description">You can explore the world by reading trending technologies around the world and recent news! Try to read more to looking for interesting facts!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <h2 class="text-center">And more... </h2>
        <div class="text-center mt-4">
          <p class="whatever">
          Click <router-link to="/login">here</router-link> to register as a student to kick off your own journey in STEM Portal!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.sub-title {
  padding-top: 20px;
  text-align: center;
}
.wrapper {
  position: relative;
}

.whatever a {
  text-decoration: underline !important;
  font-size: 16px !important;
}

.card {
  box-shadow: 0 13px 8px -10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 0rem 1.3rem 1.5rem 1.3rem;
  border-radius: 1rem;
  margin-bottom: 3rem;
}

.card-title {
  text-align: center;
}

.card-description {
  color: grey;
  padding-top: 20px;
}
</style>
