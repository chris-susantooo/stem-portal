<template>
  <div>
    <div class="row">
      <v-img src="http://kaskertaxation.com.au/wp-content/uploads/2015/05/Fotolia_83992779_Subscription_Monthly_M.jpg"
        alt=""
        contain>
      </v-img>
    </div>
    <div class="row">
      <div class="container">
        <h2 class="sub-title">As teachers, what can you do in STEM Portal?</h2>
        <p class="sub-title">There are a lot of things that you can do in STEM Portal. Let's see...</p>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <v-icon class="d-flex justify-center" size="128" color="blue darken-2">mdi-github-circle</v-icon>
              <h2 class="card-title">Teachers' Circle</h2>
              <p class="card-description">You can share your own teaching materials to other counterparts, and download from other friendly teachers. Your contribution will be significant to the community!</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <v-icon class="d-flex justify-center" size="128" color="purple darken-2">mdi-book-open-page-variant</v-icon>
              <h2 class="card-title">Online Courses</h2>
              <p class="card-description">You can create courses for students. You are free to design your own courses by adding sections, checkpoints or even decorate them with styles!</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <v-icon class="d-flex justify-center" size="128" color="brown darken-2">mdi-forum</v-icon>
              <h2 class="card-title">Discussion Forum</h2>
              <p class="card-description">You can share your experience with other teachers and parents here. You can also gain inspiration when they leave comments to give you feedbacks!</p>
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
          Click <router-link to="/login">here</router-link> to register as a teacher to kick off your own journey in STEM Portal!
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
