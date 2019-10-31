<template>
  <div id="login-bg" class="wrapper">
    <div class="container d-flex justify-end">
      <v-card max-width="400" class="vertical-center pa-3">
        <!-- Tab headers -->
        <v-tabs v-model="tabs" fixed-tabs>
          <v-tab>Login</v-tab>
          <v-tab>Register</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <!-- Login form -->
          <v-tab-item>
            <v-card flat>
              <v-card-title class="mb-3">Login to the World of STEM.</v-card-title>
              <v-card-text>
                View more, learn more with your account @STEM Portal.
                Don't have one? Get yours for free, <a @click="tabs = 1">here</a>.
              </v-card-text>
              <v-form>
                <v-container>
                  <v-text-field v-model="username" label="Username" outlined @keydown.enter="login" autofocus dense/>
                  <v-text-field v-model="password" label="Password" outlined @keydown.enter="login" type="password" dense/>
                </v-container>
                <v-card-actions>
                  <v-btn text @click="true">Reset Password</v-btn>
                  <div class="flex-grow-1"></div>
                  <v-btn color="primary" text @click="login">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-tab-item>
          <!-- Register form -->
          <v-tab-item>
            <v-card flat>
              <v-card-title class="mb-3">Join STEM Portal, 100% free.</v-card-title>
              <v-card-text>Experience STEM in the way you've never tried. The community is waiting for you.</v-card-text>
              <v-form>
                <v-container>
                  <v-text-field v-model="username" label="Username" outlined autofocus dense/>
                  <v-text-field v-model="password" label="Password" outlined type="password" dense/>
                  <v-text-field v-model="confirmPassword" label="Re-enter password" outlined type="password" dense/>
                  <v-text-field v-model="email" label="Email address" outlined @keydown.enter="register" dense/>
                </v-container>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="primary" text @click="register">Register Now</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </div>
</template>

<script>
import { registerUser } from '../utils/http'

export default {
  data: () => ({
    tabs: 0,
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  }),
  methods: {
    login () {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      }).then(() => {
        this.$router.push({ name: 'home' })
      }).catch(err => console.log(err))
    },
    register () {
      registerUser({
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#login-bg {
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/images/login-bg.jpg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.vertical-center {
  margin: 0;
  position: absolute;
  top:50vh;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
