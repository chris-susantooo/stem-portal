<template>
  <div class="reset-password-page">
    <div class="container">
      <div class="mb-5 text-center">
        <v-card v-if="username" flat>
          <v-card-title class="mb-3">{{ header }}</v-card-title>
          <v-card-text>Enter your new password to complete the procedure.</v-card-text>
          <v-form v-model="resetForm">
            <v-container>
              <v-text-field v-model="password" :counter="20" :rules="rules.password" label="Password" outlined type="password" dense/>
              <v-text-field v-model="confirmPassword" :counter="20" :rules="rules.confirm" label="Re-enter password" outlined type="password" dense/>
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
            You password has been reset. Try log back into STEM Portal!
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
    const { username } = this.$route.params
    const { token, cancel } = this.$route.query
    http.acquirePassword(username, token, cancel)
      .then(({ data: { status, user } }) => {
        if (status === 'cancelled') this.header = 'Token invalidated! Thank you for helping us out.'
        if (status === 'user existed') {
          this.header = 'Continue to reset your password'
          this.username = username
          this.resetForm = true
        }
      })
      .catch(err => { console.log(err) })
      .finally(() => { this.$emit('childReady') })
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
          v => (v.length >= 8 && v.length <= 20) || 'Must be between 8 to 20 characters'
          // more validation rules TODO (require numbers and characters? Upper and lower cases?)
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
        http.changePassword(this.username, this.password)
          .then(({ status, data }) => {
            if (status === 200) {
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
