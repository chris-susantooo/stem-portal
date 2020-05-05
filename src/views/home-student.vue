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
              class="meter-bar"
              color="green"
              height="20px"
              rounded
              :value="meterEXP"
            >
              <h6>{{ meterEXP }}%</h6>
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
        <template v-if="followingActivities.length">
          <div v-for="(follower, i) in followingActivities" :key="i">
            <div class="row justify-left ml-5">
              <strong>{{ follower.username }}'s Recent Activities</strong>
            </div>
            <div class="row">
              <home-activity-card
                v-for="(activity, j) in follower.activities"
                :key="j"
                :activity="activity"
                :follower="follower"
              />
            </div>
          </div>
        </template>
        <!-- Level Up Dialog -->
        <v-dialog v-model="levelUpDialog" max-width="600">
          <v-card class="pt-3 px-5">
            <v-card-title class="headline mb-3">Congratulations!</v-card-title>
            <v-card-text>
              You have leveled up from {{ user.meterLevel }} to {{ getUserLevel }}!.<br>
              Keep your work and aim for higher levels!
            </v-card-text>
            <v-progress-linear
              class="meter-bar-full"
              color="green"
              height="20px"
              rounded
              :value="meterFullEXP"
            >
            <h6>{{ meterFullEXP }}%</h6>
            </v-progress-linear>
            <v-card-actions>
              <v-spacer />
              <v-btn text color="primary" @click="updateUserMeterLevel">Yeah!</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../utils/http'
import HomeActivityCard from '@/components/home-activity-card.vue'

export default {
  components: { HomeActivityCard },
  computed: {
    user () {
      return this.$store.getters.user
    },
    getUserLevel () {
      return Math.floor(this.user.meterEXP / 100)
    }
  },
  created () {
    http.getFollowingActivities()
      .then(({ status, data }) => {
        if (status === 200) {
          this.followingActivities = data.activities
        }
      })
      .catch(err => console.log(err))
  },
  mounted () {
    setTimeout(() => {
      this.meterEXP = this.user.meterEXP % 100
      this.meterFullEXP = 100
    }, 1000)
    if (Math.floor(this.user.meterEXP / 100) > this.user.meterLevel) {
      this.levelUpDialog = true
    }
  },
  data: () => ({
    news: [],
    upcomingEvents: [],
    ongoingCourses: [],
    meterEXP: 0,
    meterFullEXP: 0,
    levelUpDialog: false,
    followingActivities: []
  }),
  methods: {
    updateUserMeterLevel () {
      this.levelUpDialog = false
      http.updateUserMeterLevel(this.user._id, Math.floor(this.user.meterEXP / 100))
        .then(this.$store.dispatch('fetchUser'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
.meter-bar {
  transition: .8s all ease-in-out !important
}
.meter-bar-full {
  transition: 1.8s all ease-in-out !important
}
</style>
