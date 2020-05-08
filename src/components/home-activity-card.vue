<template>
  <div class="card-wrapper d-flex justify-center">
    <v-hover>
      <template v-slot="{ hover }">
        <v-card class="overflow-hidden ma-2 course-card" :elevation="hover ? 5 : 0" outlined>
          <router-link :to="actionLink">
            <div class="pa-3 d-flex text-truncate align-center">
              <span class="title d-inline-block text-truncate">{{ activity.name }}</span>
              <span class="subtitle-2 grey--text ml-2">{{ actionType }}</span>
            </div>
          </router-link>
          <v-card-text class="mt-n2">
            <div v-html="activity.content" class="text-truncate"></div>
          </v-card-text>
          <v-card-text class="mt-n2">
            <router-link :to="{ name: 'profile', params: { username: follower.username } }">
              {{ follower.username }}
            </router-link>
            {{ getTimeStamp }}
            <v-chip-group show-arrows>
              <v-chip v-for="tag in activity.tags" color="#f5f5f5" :key="tag" :to="{ name: 'tag-view', params: { name: tag } }">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
import utils from '@/utils/forum'

export default {
  props: {
    activity: {
      type: Object,
      required: true
    },
    follower: {
      type: Object,
      required: true
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
    getTimeStamp () {
      return utils.getPostTimestamp(this.activity.timestamp)
    },
    actionType () {
      return this.activity.type
    },
    actionLink () {
      console.log(this.activity._id)
      if (this.actionType === 'Course') {
        return {
          name: 'course-view',
          params: { id: this.activity._id }
        }
      } else {
        return {
          name: 'forum-post',
          params: { id: this.activity._id }
        }
      }
    }
  },
  methods: {
    emitRating (rating) {
      this.refreshRating = !this.refreshRating
      this.$emit('rate', rating, this.course, this.ratingByUser)
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-card {
    width: 300px;
  }
</style>
