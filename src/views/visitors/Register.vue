<template>
  <div class="register-page">
    <div class="container">
      <div class="mb-5 text-center">
        <v-card v-if="username" flat>
          <v-card-title class="mb-3">{{ header }}</v-card-title>
          <v-card-text>Please provide us some information for further registration.</v-card-text>
          <v-form v-model="activateForm">
            <v-container>
              <v-row>
                <v-select v-model="role" :items="roles" :rules="rules.select" label="Your role" outlined dense/>
              </v-row>
              <v-row>
                <v-text-field v-model="firstName" :counter="20" :rules="rules.name" label="First Name" outlined dense/>
                <v-text-field v-model="lastName" :counter="20" :rules="rules.name" label="Last Name" outlined dense/>
                <v-select v-model="gender" :items="genders" :rules="rules.select" label="Gender" outlined dense/>
              </v-row>
              <v-row>
                <v-text-field v-model="school" :counter="50" :rules="rules.school" label="School Name" outlined dense/>
              </v-row>
              <v-row>
                <v-select v-model="interest" :items="interests" :rules="rules.select" deletable-chips clearable multiple label="Area of Interests" outlined dense/>
              </v-row>
            </v-container>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" text @click="activateUser">Continue</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </div>
      <!-- update user info error dialog -->
      <v-dialog v-model="errorDialog" max-width="500">
        <v-card class="pt-3">
          <v-card-title class="headline mb-3">Something went wrong...</v-card-title>
          <v-card-text>
            There is an error at the moment. Please try your input and try again later!
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="errorDialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- update user info success dialog -->
      <v-dialog v-model="updateSuccess" max-width="500">
        <v-card class="pt-3">
          <v-card-title class="headline mb-3">You have completed your registration!</v-card-title>
          <v-card-text>
            Try to log into STEM Portal and start your journey in STEM Education!
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
    http.verifyUser(username, token, cancel)
      .then(({ data: { status, message } }) => {
        if (message === 'cancelled') this.header = 'Token invalidated! Thank you for helping us out'
        if (message === 'verified token') {
          this.header = 'Continue your registration here to use your account'
          this.username = username
          this.activateForm = true
        }
      })
      .catch(err => { console.log(err) })
      .finally(() => { this.$emit('childReady') })
  },
  data () {
    return {
      username: '',
      header: 'Failed to verify user token',
      activateForm: false,
      role: '',
      firstName: '',
      lastName: '',
      gender: '',
      school: '',
      interest: [],
      roles: ['Teacher', 'Student', 'Parent'],
      genders: ['Male', 'Female', 'Others'],
      interests: ['Science', 'Technology', 'Engineering', 'Mathematics'],
      rules: {
        name: [
          v => !!v || 'This field is required',
          v => (v.length >= 1 && v.length <= 20) || 'Must be between 6 to 20 characters',
          v => /^([^0-9]*)$/.test(v) || 'Must not contain numbers'
        ],
        select: [
          v => !!v || 'This field is required'
        ],
        school: [
          v => !!v || 'This field is required',
          v => (v.length >= 6 && v.length <= 50) || 'Must be between 6 to 50 characters'
        ]
      },
      updateSuccess: false,
      errorDialog: false
    }
  },
  methods: {
    activateUser () {
      if (this.activateForm) {
        this.role = this.role.toLowerCase()
        this.gender = this.gender.toLowerCase()
        http.activateUser(this.username, this.role, this.firstName, this.lastName, this.gender, this.school, this.interest)
          .then(({ status }) => {
            if (status === 204) this.updateSuccess = true
          })
          .catch(err => {
            console.log(err)
            this.errorDialog = true
          })
      }
    }
  }
}
</script>

<style>

</style>
