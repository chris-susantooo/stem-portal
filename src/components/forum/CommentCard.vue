<template>
  <v-list-item class="ml-12 grow">
    <v-list-item-avatar v-if="content.author.avatar" size="30">
      <v-img :src="content.author.avatar" :alt="content.author.username" />
    </v-list-item-avatar>
    <v-list-item-avatar class="ml-3" v-else :color="contentColor" size="30">
        <span v-if="content.author.username" class="white--text headline ml-2">
          {{ content.author.username.split(' ').map(s => s[0].toUpperCase()).join() }}
        </span>
    </v-list-item-avatar>
    <blockquote>
      <v-card color="#F5F5F5" outlined raised>
        <v-row>
          <router-link
            :to="`/${ content.author.type}s/${ content.author.username}`"
            :style="`color: ${contentColor} !important;`"
          >
            <span class="pl-4"> {{ content.author.username }} </span>
          </router-link>
          <v-spacer></v-spacer>
          <span class="mr-4"> {{ timestamp }} </span>
          <v-card-text class="black--text editor-content" v-html="content.content" />
        </v-row>
      </v-card>
    </blockquote>
  </v-list-item>
</template>
<script>
import utils from '@/utils/forum'

export default {
  computed: {
    timestamp () {
      return utils.getPostTimestamp(this.content.createdAt)
    },
    contentColor () {
      return utils.getPostColor(this.content.author)
    }
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>
