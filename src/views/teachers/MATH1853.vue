<template>
  <div class="container">
    <div>
      <router-link to="/happy-corner">&lt;Back to Teacher Corner</router-link>
    </div>
    <div class="row">
      <div class="col-8">
        <h1>MATH1853</h1>
        <h2>Linear Algebra, Probability and Statistics</h2>
        <br>
        <p>Here you can find some powerpoint and tutorials for this topic.</p>
        <h4>Linear Algebra</h4>
        <div>
          <a href="/temp/tutorial1.pdf">Tutorial 1</a>
        </div>
        <div>
          <a href="/temp/tutorial2.pdf">Tutorial 2</a>
        </div>
        <br>
        <h4>Probability</h4>
        <div>
          <a href="/temp/tutorial3.pdf">Tutorial 3</a>
        </div>
        <div>
          <a href="/temp/tutorial4.pdf">Tutorial 4</a>
        </div>
        <br>
        <h4>Statistics</h4>
        <div>
          <a href="/temp/tutorial5.pdf">Tutorial 5</a>
        </div>
        <div>
          <a href="/temp/tutorial6.pdf">Tutorial 6</a>
        </div>
        <br>
      </div>
      <div class="col-4">
        <div class="row justify-center">
          <h2>Author</h2>
        </div>
        <div class="row justify-center mt-5">
          <v-avatar color="indigo" size="100">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
          </v-avatar>
        </div>
        <div class="row justify-center mt-5 mb-5">
          <h3>Ricola Osas</h3>
        </div>
        <div class="row justify-center">
          <div class="col">
            STEM Meter
          </div>
          <div class="col">
            <v-progress-linear
              color="green"
              height="20px"
              rounded
              :value="50"
            >
            <h6>50%</h6>
            </v-progress-linear>
          </div>
        </div>
        <hr>
        <div class="row justify-center mt-5">
          Achievement Badges
        </div>
        <div class="row justify-center mt-5">
          <img src="@/assets/images/badges/icon1.jpg" alt="icon 1" height="50" class="pl-3">
          <img src="@/assets/images/badges/icon2.png" alt="icon 2" height="50" class="pl-3">
          <img src="@/assets/images/badges/icon3.png" alt="icon 3" height="50" class="pl-3">
        </div>
        <div class="row justify-center mt-5">
          Uploaded at 30/10/2019
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  a {
    color:blue !important;

    &:hover {
      color:darkmagenta !important;
    }
  }
</style>
