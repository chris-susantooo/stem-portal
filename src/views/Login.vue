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
                  <v-btn text @click="reset.dialog = true">Reset Password</v-btn>
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
              <v-form v-model="registerForm">
                <v-container>
                  <v-text-field outlined autofocus dense
                    v-model="username"
                    :counter="20"
                    :rules="rules.name"
                    :error-messages="usernameProps.errMsgs"
                    :hint="usernameProps.hint"
                    label="Username"
                  />
                  <v-text-field v-model="password" :counter="20" :rules="rules.password" label="Password" outlined type="password" dense/>
                  <v-text-field v-model="confirmPassword" :counter="20" :rules="rules.confirm" label="Re-enter password" outlined type="password" dense/>
                  <v-text-field outlined dense
                    v-model="email"
                    :rules="rules.email"
                    :error-messages="emailProps.errMsgs"
                    :hint="emailProps.hint"
                    label="Email address"
                    @keydown.enter="register"
                  />
                </v-container>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn v-if="canResendLink" text @click="register(true)">Resend link</v-btn>
                  <v-btn color="primary" text @click="register(false)">Register Now</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
    <!-- register success dialog -->
    <v-dialog v-model="resultDialog" max-width="400">
      <v-card class="pt-3">
        <v-card-title class="headline mb-3">{{ resultDialogTitle }}</v-card-title>
        <v-card-text v-if="registerSuccess">
          Please check your email inbox for a verification email.<br>
          Follow the available instructions to complete the account registration.
        </v-card-text>
        <v-card-text v-else>
          Please double check your username or other entries.<br>
          Make sure they fit the requirements and try again later.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="resultDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- reset password dialog -->
    <v-dialog v-model="reset.dialog" max-width="400">
      <v-card class="pa-3">
        <v-card-title class="headline mb-3">Reset Password</v-card-title>
        <v-card-text>
          Please provide us your username and email.<br>
          If they match our records, we will send you a password reset link.
        </v-card-text>
        <v-container>
          <v-form v-model="reset.form">
            <v-text-field v-model="reset.username" :counter="20" :rules="rules.name" label="Username" outlined @keydown.enter="requestReset" autofocus dense/>
            <v-text-field v-model="reset.email" :rules="rules.email" label="Email address" outlined @keydown.enter="requestReset" dense/>
          </v-form>
        </v-container>
        <v-card-text class="red--text" v-if="reset.errorResponse">
          Request failed. Please make sure your information is correct or try again later.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="requestReset">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- reset password success dialog -->
    <v-dialog v-model="resetSuccess" max-width="400">
      <v-card class="pt-3">
        <v-card-title class="headline mb-3">An email has been sent to you.</v-card-title>
        <v-card-text>
          Please check your email inbox for a verification email.<br>
          Follow the available instructions to reset your password.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="resetSuccess = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- login fail dialog -->
    <v-dialog v-model="loginFailDialog" max-width="400">
      <v-card class="pt-3">
        <v-card-title class="headline mb-3">Opps.</v-card-title>
        <v-card-text>
          You failed to log in.<br>
          Please provide a valid username and password.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="loginFailDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import http from '../utils/http'

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
      canResendLink: false,
      resultDialog: false,
      registerSuccess: false,
      loginFailDialog: false,
      usernameProps: {
        hint: undefined,
        errMsgs: ''
      },
      emailProps: {
        hint: undefined,
        errMsgs: ''
      },
      reset: {
        errorResponse: false,
        form: true,
        dialog: false,
        username: '',
        email: ''
      },
      resetSuccess: false,
      rules: {
        name: [
          v => !!v || 'This field is required',
          v => (v.length >= 6 && v.length <= 20) || 'Must be between 6 to 20 characters',
          v => v.toLowerCase() === v || 'Must be all lowercase letters'
        ],
        password: [
          v => !!v || 'This field is required',
          v => (v.length >= 8 && v.length <= 20) || 'Must be between 8 to 20 characters'
          // more validation rules TODO (require numbers and characters? Upper and lower cases?)
        ],
        confirm: [
          v => v === this.password || 'Must match the above password',
          v => !!v || 'This field is required'
        ],
        email: [
          v => !!v || 'Email is required',
          v => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Must be valid email'
        ]
      }
    }
  },
  computed: {
    resultDialogTitle () {
      return this.registerSuccess ? 'An email has been sent to you.' : 'Failed to register at the moment.'
    }
  },
  watch: {
    username (val) {
      if (this.tabs) {
        setTimeout(() => {
          const isValid = this.rules.name.every(r => typeof r(val) !== 'string')
          if (val === this.username && isValid) {
            http.checkUsername(val)
              .then(() => {
                this.usernameProps.hint = undefined
                this.usernameProps.errMsgs = 'Username not available'
              })
              .catch(() => {
                this.usernameProps.hint = 'Username available'
                this.usernameProps.errMsgs = ''
              })
          }
        }, 1000)
      }
    },
    email (val) {
      if (this.tabs) {
        setTimeout(() => {
          const isValid = this.rules.email.every(r => typeof r(val) !== 'string')
          if (val === this.email && isValid) {
            http.checkEmail(val)
              .then(() => {
                this.emailProps.hint = undefined
                this.emailProps.errMsgs = 'Email already registered'
              })
              .catch(() => {
                this.emailProps.hint = 'Email available'
                this.emailProps.errMsgs = ''
              })
          }
        }, 1000)
      }
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
        }).catch(err => {
          this.loginFailDialog = true
          console.log(err)
        })
      }
    },
    register (resend) {
      if (this.registerForm) {
        http.registerUser(this.username, this.password, this.email, resend)
          .then(({ status, data }) => {
            if (status === 201) {
              this.registerSuccess = true
              this.resultDialog = true
            }
          })
          .catch(err => console.log(err))
        this.canResendLink = true
      }
    },
    requestReset () {
      if (this.reset.form) {
        this.reset.errorResponse = false
        http.resetPassword(this.reset.username, this.reset.email)
          .then(({ status, data }) => {
            if (status === 200) {
              this.reset.dialog = false
              this.resetSuccess = true
            }
          })
          .catch((err) => {
            this.reset.errorResponse = true
            console.log(err)
          })
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
