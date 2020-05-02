<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="row justify-center">
          <v-avatar color="indigo" size="100">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
          </v-avatar>
        </div>
        <div class="row justify-center mt-5 mb-5">
          <h3>{{ user.firstName + ' ' + user.lastName }}</h3>
        </div>
        <div class="row justify-center mt-5 mb-2">
          <h5>Lv.{{ getUserLevel }}</h5>
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
              :value="getUserExcessEXP"
            >
              <h6>{{ getUserExcessEXP }}%</h6>
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
      </div>
      <div class="col-9">
        <div class="row justify-left ml-5">
          <strong>Recent News</strong>
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
        <div class="row justify-left ml-5">
          <strong>Upcoming Events</strong>
        </div>
        <div class="row">
          <v-col>
            <v-card>
              <v-card-title>HKU Hackathon</v-card-title>
              <v-card-text>30 February 2046 9:30am</v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn text color="indigo">
                  View More
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title>ABC Primary School STEM Display</v-card-title>
              <v-card-text>32 December 2046 10:30am</v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn text color="indigo">
                  View More
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </div>
        <div class="row justify-left ml-5">
          <strong>Ongoing Courses</strong>
        </div>
        <div class="row">
          <div class="col">
            <v-card>
              <v-card-title class="d-flex justify-center">
                <h6>Introductory Programming</h6>
              </v-card-title>
              <v-card-text class="d-flex justify-center">
                <v-progress-circular
                  color="indigo"
                  rotate="180"
                  size="64"
                  :value="33.33"
                  width="6"
                >33.3%
                </v-progress-circular>
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
                <v-progress-circular
                  color="indigo"
                  rotate="180"
                  size="64"
                  :value="50"
                  width="6"
                >50%
                </v-progress-circular>
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
                <v-progress-circular
                  color="indigo"
                  rotate="180"
                  size="64"
                  :value="75"
                  width="6"
                >75%
                </v-progress-circular>
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
  </div>
</template>

<script>

export default {
  computed: {
    user () {
      return this.$store.getters.user
    },
    getUserLevel () {
      return Math.floor(this.user.meterEXP / 100)
    },
    getUserExcessEXP () {
      return this.user.meterEXP % 100
    }
  },
  data: () => ({
    news: [],
    upcomingEvents: [],
    ongoingCourses: []
  })
}
</script>
