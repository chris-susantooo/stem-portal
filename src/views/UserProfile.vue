<template>
  <v-container
    fluid
  >
    <h1 align="center">Profile</h1>
    <v-row justify="center">
       <v-col
        cols="12"
        md="3"
      >
        <material-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block elevation-6"
            size="130"
          >
            <img
              src="https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png"
            >
            <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" 
                dark v-on="on"
                min-width="300px"
                >
                Change Profile Picture</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">User Profile</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Legal first name*" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Legal last name*"
                          hint="example of persistent helper text"
                          persistent-hint
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="Email*" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="Password*" type="password" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          :items="['0-17', '18-29', '30-54', '54+']"
                          label="Age*"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                          label="Interests"
                          multiple
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          </v-avatar>
          <div class="text-center">
            <v-rating v-model="rating">
              <template v-slot:item="props">
                <v-icon
                  :color="props.isFilled ? genColor(props.index) : 'grey lighten-1'"
                  large
                  @click="props.click"
                >
                  {{ props.isFilled ? 'mdi-star-circle' : 'mdi-circle-outline' }}
                </v-icon>
              </template>
            </v-rating>
          </div>    
          <v-card-text class="text-center">
            <h6 class="overline mb-3">
              Role:   Student
            </h6>
            <h4 class="font-weight-light"> 
              Name:   Wong Lok Hei
            </h4>
            <p class="font-weight-light text-left">
              I am a Computer Science student. STEM Portal is good!!!
            </p>
          </v-card-text>
        </material-card>
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <div class="container">
          <material-card >
            <v-form >
              <v-container class="py-0">
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      label="School Name"
                      value="The University of Hong Kong"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      label="User Name"
                      value="TestingStem"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      label="Email Address"
                      value="stemportal123@gamil.com"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      label="First Name"
                      value="Brian"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      label="Last Name"
                      value="Wong"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Adress"
                      value="The University of Hong Kong, Pokfulam"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-card>
              <v-tabs
                grow=true
                background-color="primary"
                dark
                v-model="tabs"
              >
                <v-tab>
                  Edit Account Details
                </v-tab>
                <v-tab>
                  Edit Organisation Details
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
                          <v-col cols="12" >
                            <v-text-field
                              solo="solo"
                              label="Username*"
                              hint="Spaces are allowed; punctuation is not allowed except for periods, hyphens, apostrophes, and underscores."
                              persistent-hint
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              solo="solo"                      
                              label="Current Password"
                              hint="Enter your current password to change the Email address or Password."
                              persistent-hint
                              required
                            ></v-text-field>                         
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              solo="solo"               
                              label="Email*"
                              hint="A valid email address. All emails from the system will be sent to this address."
                              persistent-hint
                              required
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
                                  <v-card-text>Password</v-card-text>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    outlined="outlined"
                                    label="New Password"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-card-text>Confirm Password</v-card-text>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    outlined="outlined"
                                    label="Confrim Password"
                                    required
                                  ></v-text-field>
                                </v-col>
                              </v-col>
                               <v-col cols="12" md="4"
                              align-self="center"
                              >
                                <h3>To make your password stronger:</h3>
                                <p>1. Make it at least 6 characters
                                  <br>2. Add lowercase letters
                                  <br>3. Add uppercase letters
                                  <br>4. Add numbers
                                  <br>5. Add punctuation
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
                              v-model="select"
                              :items="items"
                              label="Interested Topic"
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
                        dark v-on="on"
                        min-width="300px"
                      >
                      Save Cheange</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-title class="headline">Organisation Details</v-card-title>
                    <v-card-text>
                      <span class="headline">Employer type*</span>
                    </v-card-text>
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12">
                          <v-combobox
                            v-model="select"
                            :items="item2"
                            label="Choose your employer Type"
                          ></v-combobox>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-col cols="12">
                      <v-text-field
                        solo="solo"                      
                        label="Job Title (Role)"
                        hint="Please also specify your role"
                        persistent-hint
                        required
                        ></v-text-field>                         
                      </v-col>
                      <v-card-title class="headline">Address</v-card-title>
                      <v-divider
                      horizontal>
                      </v-divider>
                      <v-container fluid>
                        <v-row>
                          <v-card-text>
                            <span class="headline">Address1*</span>
                          </v-card-text>
                          <v-col cols="12">
                            <v-text-field
                            solo="solo"                      
                            label="Address1"
                            required
                            ></v-text-field>   
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-card-text>
                            <span class="headline">Address2</span>
                          </v-card-text>
                          <v-col cols="12">
                            <v-text-field
                            solo="solo"                      
                            label="Address2"
                            required
                            ></v-text-field>   
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-card-text>
                              <span class="headline">District*</span>
                            </v-card-text>
                              <v-text-field
                              solo="solo"                      
                              label="District"
                              required
                              ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-card-text>
                              <span class="headline">Country*</span>
                            </v-card-text>
                              <v-text-field
                              solo="solo"                      
                              label="Country"
                              required
                              ></v-text-field>
                          </v-col>
                        </v-row>
                        <small>*indicates required field</small>
                      </v-container>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="primary"
                        dark v-on="on"
                        min-width="300px"
                      >
                      Save Cheange</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </material-card>
        </div>
      </v-col>
      <v-row justify="end">
      </v-row>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      tabs: null,
      select: [],
        items: [
          'Computer Science',
          'Civil Engineering',
          'Mechanical Engineering',
          'Electrical Engineering',
          'Industrial Engineering',
          'Mathematics',
          'Chemistry',
          'Biology',
          'Physics',
          'Latest Technology'
        ],
        item2: [
          'Subsidized School',
          'Private School',
          'College',
          'Parents',
          'Other',
          'Unemployment'
        ]
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