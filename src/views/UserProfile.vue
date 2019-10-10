<template>
  <v-container
    fill-height
    fluid
  >
    <v-row justify="space-around">
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
            <v-btn>
              Upload photo
            </v-btn>
            
          </v-avatar>
          <v-card-text class="text-center">
            <h6 class="overline mb-3">
              Student
            </h6>

            <h4 class="font-weight-light">
              Wong Lok Hei
            </h4>

            <p class="font-weight-light">
              STEM Portal is good!!!
            </p>
          </v-card-text>
          <div>
            <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
              <b-dropdown-item>First Action</b-dropdown-item>
              <b-dropdown-item>Second Action</b-dropdown-item>
              <b-dropdown-item>Third Action</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item active>Active action</b-dropdown-item>
              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
          </div>
        </material-card>
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <material-card
          color="green"
          title="Edit Profile"
          text="Complete your profile"
        >
          <v-form>
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
                    class="purple-input"
                    label="User Name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Adress"
                    class="purple-input"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
  //
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