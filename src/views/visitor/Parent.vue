<template>
  <div>
    <div class="row">
      <v-img src="https://cdn.diredonna.it/app/uploads/2017/04/shutterstock_278188052-980x480.jpg"
        alt=""
        contain>
      </v-img>
    </div>
    <div class="row">
      <div class="container">
        <h2 class="sub-title">As parents, what can you do in STEM Portal?</h2>
        <p class="sub-title">There are a lot of things that you can do in STEM Portal. Let's see...</p>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <v-icon class="d-flex justify-center" size="128" color="blue darken-2">mdi-cloud-search</v-icon>
              <h2 class="card-title">Discover</h2>
              <p class="card-description">You can find out what events will be held in advanced, and plan for your children! You can also read interesting articles that may benefit you and your children!</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <v-icon class="d-flex justify-center" size="128" color="purple darken-2">mdi-home-heart</v-icon>
              <h2 class="card-title">Parenting</h2>
              <p class="card-description">You can learn with your children, by looking for some science hands-on projects at home! Parents take an important role in STEM education for children!</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <v-icon class="d-flex justify-center" size="128" color="brown darken-2">mdi-forum</v-icon>
              <h2 class="card-title">Discussion Forum</h2>
              <p class="card-description">You can share your experience on guiding your children with other parents. You may also get some answers from teachers on how to teach your children at home!</p>
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
          Click <router-link to="/login">here</router-link> to register as a parent to kick off your own journey in STEM Portal!
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
