<template>
  <div id="login-bg" class="wrapper">
    <!-- page elements -->
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
              <v-form v-model="loginForm">
                <v-container>
                  <v-text-field v-model="username" :counter="20" :rules="rules.name" label="Username" outlined @keydown.enter="login" autofocus dense/>
                  <v-text-field v-model="password" :counter="20" :rules="rules.password" label="Password" outlined @keydown.enter="login" type="password" dense/>
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
              <v-form v-model="registerForm" ref="register-form">
                <v-container>
                  <v-text-field v-model="username" :counter="20" :rules="rules.name" label="Username" outlined autofocus dense/>
                  <v-text-field v-model="password" :counter="20" :rules="rules.password" label="Password" outlined type="password" dense/>
                  <v-text-field v-model="confirmPassword" :counter="20" :rules="rules.confirm" label="Re-enter password" outlined type="password" dense/>
                  <v-text-field v-model="email" :rules="rules.email" label="Email address" outlined @keydown.enter="register" dense/>
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
    <!-- register success dialog -->
    <v-dialog v-model="registerSuccess" max-width="300">
      <v-card>
        <v-card-title class="headline">Operation Successful!</v-card-title>
        <div class="pt-3" />
        <v-card-text>
          Please check your email inbox for a verification email.
        </v-card-text>
        <v-card-text>
          Follow the available instructions to complete the account registration.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="registerSuccess = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { registerUser } from '../utils/http'

export default {
  data () {
    return {
      tabs: 0,
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      loginForm: true,
      registerForm: true,
      rules: {
        name: [
          v => !!v || 'This field is required',
          v => (v.length >= 6 && v.length <= 20) || 'Must be between 6 to 20 characters',
          v => v.toLowerCase() === v || 'Must be all lowercase letters'
        ],
        password: [
          v => !!v || 'This field is required',
          v => (v.length >= 8 && v.length <= 20) || 'Must be between 8 to 20 characters'
          // more validation rules TODO
        ],
        confirm: [
          v => v === this.password || 'Must match the above password',
          v => !!v || 'This field is required'
        ],
        email: [
          v => !!v || 'Email is required',
          v => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Must be valid email'
        ]
      },
      registerSuccess: false
    }
  },
  methods: {
    login () {
      if (this.loginForm) {
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$router.push({ name: 'home' })
        }).catch(err => console.log(err))
      }
    },
    register () {
      if (this.registerForm) {
        registerUser(this.username, this.password, this.email)
          .then(({ status, data }) => {
            if (status === 201) {
              this.username = ''
              this.password = ''
              this.confirmPassword = ''
              this.email = ''
              this.$refs['register-form'].resetValidation()
              this.registerSuccess = true
            }
          })
          .catch(err => console.log(err))
      }
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
