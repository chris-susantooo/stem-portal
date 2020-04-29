<template >
  <div>
    <v-list-item v-if="!post" class="grow">
      <v-list-item-avatar v-if="commentsinDialog.parent.author.avatar" size="30">
        <v-img :src="commentsinDialog.parent.author.avatar" :alt="commentsinDialog.parent.author.username" />
      </v-list-item-avatar>
      <v-list-item-avatar class="ml-3" v-else :color="parentcontentColor" size="30">
          <span v-if="commentsinDialog.parent.author.username" class="white--text headline ml-2">
            {{ commentsinDialog.parent.author.username.split(' ').map(s => s[0].toUpperCase()).join() }}
          </span>
      </v-list-item-avatar>
      <blockquote>
        <v-card color="#F5F5F5" outlined raised>
          <v-row>
            <router-link
              :to="`/${ commentsinDialog.parent.author.type}s/${ commentsinDialog.parent.author.username}`"
              :style="`color: ${parentcontentColor} !important;`"
            >
              <span class="pl-4"> {{  commentsinDialog.parent.author.username }} </span>
            </router-link>
            <v-spacer></v-spacer>
            <span class="mr-4"> {{ parenttimestamp }} </span>
            <v-card-text class="black--text editor-content" v-html="commentsinDialog.parent.content" />
          </v-row>
        </v-card>
      </blockquote>
    </v-list-item>
    <v-list-item v-else class="grow">
      <v-list-item-avatar v-if="content.author.avatar" size="30">
        <v-img :src="content.author.avatar" :alt="content.author.username" />
      </v-list-item-avatar>
      <v-list-item-avatar class="ml-3" v-else :color="contentColor" size="30">
        <span class="white--text headline ml-2">
          {{ content.author.username.split(' ').map(s => s[0].toUpperCase()).join() }}
        </span>
      </v-list-item-avatar>
      <blockquote>
        <v-card color="#F5F5F5" outlined>
          <v-row>
            <router-link
              :to="`/${content.author.type}s/${content.author.username}`"
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
    <template v-for="(comment, i) in commentsinDialog.comments">
      <comment-card
        :content="comment"
        :key="'comment-comment-' + i"
        class="mt-2"
      />
    </template>
  </div>
</template>
<script>
import utils from '@/utils/forum'
import CommentCard from './CommentCard.vue'

export default {
  components: {
    CommentCard
  },
  data: () => ({
    comment: '',
    show: false
  }),
  props: {
    content: {
      type: Object,
      required: true
    },
    post: {
      type: Boolean,
      required: false,
      default: false
    },
    numberOfComments: {
      type: Number,
      required: false
    },
    reactable: {
      type: Boolean,
      required: false,
      default: false
    },
    editable: {
      type: Boolean,
      required: false,
      default: false
    },
    commentsinDialog: {
      type: Object,
      required: true
    }
  },
  computed: {
    timestamp () {
      return utils.getPostTimestamp(this.content.createdAt)
    },
    contentColor () {
      return utils.getPostColor(this.content.author)
    },
    parenttimestamp () {
      return utils.getPostTimestamp(this.commentsinDialog.parent.createdAt)
    },
    parentcontentColor () {
      return utils.getPostColor(this.commentsinDialog.parent.author)
    }
  },
  methods: {
    replyPost (reaction, target, comment) {
      this.show = false
      this.$emit('reply', reaction, { _id: target, type: this.post ? 'post' : 'comment' }, this.comment)
    },
    getPageNum: i => Math.floor((i + 1) / 10) + 1
  }
}
</script>
