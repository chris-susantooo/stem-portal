<template>
  <v-container
    fluid
  >
    <h1 align="center">Profile</h1>
    <div class="row">
      <div class="col-3">
        <div class="row justify-center">
          <v-avatar color="indigo" size="100">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
          </v-avatar>
          <v-card-text class="text-center">
            <h6 class="overline mb-3">
              Role:   {{ user.type.toUpperCase() }}
            </h6>
          </v-card-text>
        </div>
      </div>
      <div class="col-9">
        <div class="container">
          <v-card>
            <v-tabs
              grow
              background-color="primary"
              dark
              v-model="tabs"
            >
              <v-tab>
                Edit Account Details
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs">
              <v-tab-item>
                <v-card flat>
                  <v-card-title>
                    <span class="headline">Account Details</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="*Email"
                            required
                            v-model="email"
                            :rules="rules.email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="*First Name"
                            required
                            v-model="firstName"
                            :rules="rules.name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            label="*Last Name"
                            required
                            v-model="lastName"
                            :rules="rules.name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="*School Name"
                            required
                            v-model="school"
                            :rules="rules.school"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-card
                          color="blue-grey lighten-5"
                          class="mx-auto"
                          >
                            <v-row>
                              <v-col cols="12" md="8">
                                <v-col cols="12">
                                  <v-card-text class="font-weight-bold">Change Password</v-card-text>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    label="New Password"
                                    required
                                    v-model="newPassword"
                                    outlined type="password"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    label="Confrim Password"
                                    required
                                    v-model="confirmPassword"
                                    :rules="rules.confirm"
                                    outlined type="password"
                                  ></v-text-field>
                                </v-col>
                              </v-col>
                              <v-col
                                class="text-center"
                                cols="12"
                              >
                                <h3>To make your password stronger:</h3>
                                <p>
                                  1. Make it at least 6 characters<br>
                                  2. Include lowercase letters<br>
                                  3. Include uppercase letters<br>
                                  4. Include numbers
                                </p>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-title>
                      <span class="headline">Area of Interests</span>
                    </v-card-title>
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12">
                          <v-combobox
                            v-model="selectedInterests"
                            :items="interests"
                            label="*Interested Topic"
                            multiple
                            chips
                          >
                            <template v-slot:selection="data">
                              <v-chip
                                :key="JSON.stringify(data.item)"
                                v-bind="data.attrs"
                                :input-value="data.selected"
                                :disabled="data.disabled"
                                @click:close="data.parent.selectItem(data.item)"
                              >
                                <v-avatar
                                  class="accent white--text"
                                  left
                                  v-text="data.item.slice(0, 1).toUpperCase()"
                                ></v-avatar>
                                {{ data.item }}
                              </v-chip>
                            </template>
                          </v-combobox>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="primary"
                      min-width="300px"
                      @click="updateUserInfo"
                    >
                    Save Changes</v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </div>
        <v-row justify="end">
        </v-row>
        <!-- update user info success dialog -->
        <v-dialog v-model="updateSuccess" max-width="500">
          <v-card class="pt-3">
            <v-card-title class="headline mb-3">Hurray!</v-card-title>
            <v-card-text>
              You have successfully updated your account information!
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text color="primary" @click="updateSuccess = false" :to="{ name: 'profile' }">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- update user info error dialog -->
        <v-dialog v-model="errorDialog" max-width="500">
          <v-card class="pt-3">
            <v-card-title class="headline mb-3">Something went wrong...</v-card-title>
            <v-card-text>
              There is an error at the moment. Please check your input and try again later!
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text color="primary" @click="errorDialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-container>
</template>

<script>
import http from '@/utils/http'

export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  async created () {
    await Promise.all([
      this.fetchUser()
    ])
  },
  data () {
    return {
      email: '',
      newPassword: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      school: '',
      dialog: false,
      tabs: null,
      selectedInterests: [],
      interests: ['Science', 'Technology', 'Engineering', 'Mathematics'],
      rules: {
        confirm: [
          v => v === this.newPassword || 'Must match the above password'
        ],
        select: [
          v => !!v || 'This field is required'
        ],
        school: [
          v => !!v || 'This field is required',
          v => (v.length >= 6 && v.length <= 50) || 'Must be between 6 to 50 characters'
        ],
        email: [
          v => !!v || 'This field is required',
          v => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Must be a valid email'
        ],
        name: [
          v => !!v || 'This field is required'
        ]
      },
      updateSuccess: false,
      errorDialog: false
    }
  },
  methods: {
    updateUserInfo () {
      if (this.newPassword) {
        http.updateUserWithPassword(this.user.username, this.newPassword, this.email, this.firstName, this.lastName, this.school, this.selectedInterests)
          .then(({ status }) => {
            if (status === 204) this.updateSuccess = true
            this.newPassword = ''
            this.confirmPassword = ''
            this.$store.dispatch('fetchUser')
          })
          .catch(err => {
            console.log(err)
            this.errorDialog = true
          })
      } else {
        http.updateUser(this.user.username, this.email, this.firstName, this.lastName, this.school, this.selectedInterests)
          .then(({ status }) => {
            if (status === 204) this.updateSuccess = true
            this.$store.dispatch('fetchUser')
          })
          .catch(err => {
            console.log(err)
            this.errorDialog = true
          })
      }
    },
    fetchUser () {
      this.email = this.user.email
      this.firstName = this.user.firstName
      this.lastName = this.user.lastName
      this.school = this.user.school
      this.selectedInterests = this.user.interests
    }
  }
}
</script>

<style>
.overline{
  padding-top: 50px
}
.Course-enrolled{
  text-align: left;
  font-weight:900
}

</style>
