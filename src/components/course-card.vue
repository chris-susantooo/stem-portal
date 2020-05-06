<template>
  <div class="card-wrapper d-flex justify-center">
    <v-hover>
      <template v-slot="{ hover }">
        <v-card class="overflow-hidden ma-2 course-card" :elevation="hover ? 5 : 0" outlined>
          <router-link :to="courseLink">
            <v-img height="200"
              :src="course.thumbnail || 'https://cdn.vuetifyjs.com/images/cards/cooking.png'"
            />
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-card-title>
                  <span v-on="on" class="title d-inline-block text-truncate">{{ course.name }}</span>
                </v-card-title>
              </template>
              <span>{{ course.name }}</span>
            </v-tooltip>
          </router-link>
          <v-card-text class="mt-n2">
            <router-link :to="{ name: 'profile', params: { username: course.author.username } }">
              {{ course.author.username }}
            </router-link>
            <v-btn v-if="course.author._id !== user._id" icon x-small @click="toggleFollow">
              <v-icon :color="followable ? '#BDBDBD' : '#ea9085'">mdi-heart</v-icon>
            </v-btn>
            <v-row align="center" class="mx-0">
              <v-rating dense half-increments hover
                :key="`${course._id}-rating-${refreshRating}`"
                :readonly="!ratable"
                :value="ratingForDisplay"
                @input="emitRating"
                color="amber"
                size="14"
              />
              <div class="grey--text ml-2">{{ ratingDescription }}</div>
            </v-row>
            <v-chip-group show-arrows>
              <v-chip v-for="tag in course.tags" color="#f5f5f5" :key="tag" :to="{ name: 'tag-view', params: { name: tag } }">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
          <v-card-actions class="mt-n5" v-if="isAuthor && editable">
            <v-btn text color="indigo" class="mr-n1 px-n1" :to="{ name: 'course-edit', params: { id: course._id } }">
              Edit
            </v-btn>
            <v-btn text color="indigo" class="mr-n1 px-n1">
              View Stats
            </v-btn>
            <v-spacer />
            <v-btn text icon color="red" class="px-n1" @click="$emit('delete', course._id)">
              <v-icon>mdi-delete-circle</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true
    },
    ratable: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    followable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    refreshRating: false
  }),
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    user () {
      return this.$store.getters.user
    },
    ratingByUser () {
      if (!this.isLoggedIn) return 0
      return this.user.courses.ratings.find(rating => rating._courseId === this.course._id)
    },
    ratingForDisplay () {
      const userRating = this.ratingByUser
      return userRating ? userRating.score : this.course.rating
    },
    ratingDescription () {
      const userRating = this.ratingByUser
      if (userRating) return `You rated ${userRating.score.toFixed(1)} stars`
      return this.course.nRatings
        ? this.course.rating.toFixed(1) + ' stars (' + this.course.nRatings + ')'
        : 'No ratings yet'
    },
    isAuthor () {
      return this.user._id === this.course.author._id && this.user.type === 'teacher'
    },
    courseLink () {
      return {
        name: this.isAuthor ? 'course-edit' : 'course-view',
        params: { id: this.course._id }
      }
    }
  },
  methods: {
    emitRating (rating) {
      this.refreshRating = !this.refreshRating
      this.$emit('rate', rating, this.course, this.ratingByUser)
    },
    toggleFollow () {
      const url = `users/${this.course.author._id}/followers`;
      (this.followable ? this.$http.post(url) : this.$http.put(url))
        .then(() => this.$store.dispatch('fetchUser'))
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-card {
    width: 300px;
  }
</style>
