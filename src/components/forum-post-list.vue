<template>
  <v-card class="post-list" outlined>
    <div ref="post-list-header">
      <v-row class="justify-center">
        <v-card-title>Posts</v-card-title>
      </v-row>
      <v-divider />
    </div>
    <template v-if="posts.length">
      <v-list id="post-list-container" three-line class="overflow-y-auto py-0 post-list-container">
        <template v-for="(post, i) in posts">
          <v-list-item @click="$emit('select', { id: post._id })" :key="post._id + '-item-' + i">
            <v-list-item-avatar :color="post.author.avatar ? undefined : getPostColor(post.author)" class="d-flex justify-center my-6">
              <v-img v-if="post.author.avatar" :src="post.author.avatar" />
              <span v-else class="white--text headline">
                {{ post.author.username.split(' ').map(s => s[0].toUpperCase()).join() }}
              </span>
            </v-list-item-avatar>
            <v-list-item-content class="pt-1 pb-0">
              <v-list-item-subtitle class="caption">
                <v-row class="mx-0">
                  <span :style="`color: ${getPostColor(post.author)}`">{{ post.author.username }}</span>
                  &nbsp;·
                  {{ getPostTimestamp(post.updatedAt) }}
                  <v-spacer />
                  <span>
                    <v-icon size="13">{{ post.rating >= 0 ? 'mdi-thumb-up' : 'mdi-thumb-down' }}</v-icon>
                    {{ Math.abs(post.rating) }}
                    <v-icon size="15">mdi-chat</v-icon>
                    {{ post.nComments }}
                  </span>
                </v-row>
              </v-list-item-subtitle>
              <v-list-item-title class="subtitle-1">{{ post.title }}</v-list-item-title>
              <v-list-item-subtitle class="d-inline-block text-truncate caption">
                {{ post.tags.join('  ·  ') }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <div v-if="i + 1 === posts.length" v-intersect.quiet="triggerLoad" />
          </v-list-item>
          <v-divider :key="post._id + '-div-' + i" />
        </template>
      </v-list>
    </template>
    <template v-else>
      <div class="post-list-container d-flex justify-center align-center">
        <no-posts @refresh="$emit('refresh')" />
      </div>
    </template>
  </v-card>
</template>

<script>
import NoPosts from './forum-noposts.vue'
import utils from '@/utils/forum'

export default {
  components: { NoPosts },
  props: {
    posts: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    getPostColor: author => utils.getPostColor(author),
    getPostTimestamp: timestamp => utils.getPostTimestamp(timestamp),
    triggerLoad (entries, observer, isIntersecting) {
      if (isIntersecting) this.$emit('more')
    }
  }
}
</script>

<style lang="scss" scoped>
  .post-list {
    height: calc(100vh - 4rem);
    overflow: hidden;
  }

  .post-list-container {
    height: calc(100vh - 8rem);
  }
</style>
