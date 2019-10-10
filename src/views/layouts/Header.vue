<template>
  <v-app-bar elevate-on-scroll>
    <div class="container">
      <div class="row">
        <v-toolbar-title class="logo">STEM Portal</v-toolbar-title>
        <div v-if="user.type === 'visitor'" class="ml-2 mt-1">
          <router-link to="/login">Teachers</router-link>
          <router-link to="/login">Students</router-link>
          <router-link to="/login">Parents</router-link>
          <router-link to="/login">Discussion</router-link>
        </div>
        <v-spacer />
        <div class="mt-1">
          <router-link v-if="user.type === 'visitor'" to="/login">Login / Register</router-link>
          <v-menu
            v-else
            v-model="menu"
            :close-on-content-click="false"
            nudge-bottom="30"
          >
            <template v-slot:activator="{ on }">
              <a v-on="on">{{ user.name }}</a>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                    <v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn
                      :class="fav ? 'red--text' : ''"
                      icon
                      @click="fav = !fav"
                    >
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="message" color="purple"></v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Enable messages</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="hints" color="purple"></v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Enable hints</v-list-item-title>
                </v-list-item>
              </v-list>

              <v-card-actions>
                <div class="flex-grow-1"></div>

                <v-btn text @click="menu = false">Cancel</v-btn>
                <v-btn color="primary" text @click="menu = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  padding-left: 6px;
  padding-right: 6px;
}
</style>
