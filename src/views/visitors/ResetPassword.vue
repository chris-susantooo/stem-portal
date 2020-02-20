<template>
  <div class="reset-password-page">
    <div class="container">
      <div class="mb-5 text-center">
        <v-card v-if="username" flat>
          <v-card-title class="mb-3">{{ header }}</v-card-title>
          <v-card-text>Enter your new password to complete the procedure.</v-card-text>
          <v-form v-model="resetForm">
            <v-container>
              <v-text-field v-model="password" :counter="26" :rules="rules.password" label="Password" outlined type="password" dense/>
              <v-text-field v-model="confirmPassword" :counter="26" :rules="rules.confirm" label="Re-enter password" outlined type="password" dense/>
            </v-container>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" text @click="changePassword">Change</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </div>
      <!-- reset password success dialog -->
      <v-dialog v-model="resetSuccess" max-width="500">
        <v-card class="pt-3">
          <v-card-title class="headline mb-3">{{ resetPasswordDialogTitle }}</v-card-title>
          <v-card-text>
            Your password has been reset. Try log back into STEM Portal!
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" :to="{ name: 'login' }">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'

export default {
  beforeCreate () {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push({ name: 'home' })
    }
    this.$emit('childBusy')
  },
  created () {
    this.username = this.$route.params.username
    const { token, cancel } = this.$route.query
    if (cancel) {
      // send request to backend to revoke token
      http.cancelToken(this.username, token)
        .then(({ status, data }) => {
          if (status === 200) {
            this.header = 'Thank you for helping us!'
          }
        })
    } else {
      this.$emit('childReady')
      this.resetForm = true
    }
  },
  data () {
    return {
      username: '',
      header: 'Failed to verify user token',
      password: '',
      confirmPassword: '',
      resetForm: false,
      resetSuccess: false,
      rules: {
        password: [
          v => !!v || 'This field is required',
          v => (v.length >= 8 && v.length <= 26) || 'Must be between 8 to 26 characters',
          v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,26}$/.test(v) || 'Must contain a number and an uppercase letter.'
        ],
        confirm: [
          v => v === this.password || 'Must match the above password',
          v => !!v || 'This field is required'
        ]
      }
    }
  },
  computed: {
    resetPasswordDialogTitle () {
      return this.resetSuccess ? 'Your password has been changed.' : 'Failed to reset your password.'
    }
  },
  methods: {
    changePassword () {
      if (this.resetForm) {
        http.resetPassword(this.username, this.password, this.$route.query.token)
          .then(({ status, data }) => {
            if (status === 204) {
              this.resetSuccess = true
            }
          })
          .catch(err => console.log(err))
      }
    }
  }
}
</script>

<style>

</style>
