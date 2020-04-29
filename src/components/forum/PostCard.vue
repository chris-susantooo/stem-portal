<template>
  <v-card v-if="hasContent" flat tile>
    <!-- headers -->
    <v-card-subtitle>
      <span :class="{ 'floor-master': content.floor === 1 }">#{{ content.floor }}</span>
      &nbsp;·&nbsp;
      <router-link
        :to="`/${content.author.type}s/${content.author.username}`"
        :style="`color: ${contentColor} !important;`"
      >
        {{ content.author.username }}
      </router-link>
      &nbsp;·&nbsp;
      {{ timestamp }}
    </v-card-subtitle>
    <!-- if content is quoting a reply -->
    <blockquote v-if="content.parent" class="px-4">
      <v-card color="#F5F5F5" outlined>
        <v-card-text v-html="content.parent.content" class="py-3 editor-content" />
      </v-card>
    </blockquote>
    <!-- main content -->
    <v-card-text class="black--text editor-content" v-html="content.content" />
    <!-- action buttons here -->
    <v-card-actions>
      <v-card color="#F5F5F5" class="caption" outlined>
        <v-btn icon small depressed
          @click="emitReaction('liked', content._id, !reactions.liked)"
          :color="reactions.liked ? contentColor : ''"
        >
          <v-icon size="15">mdi-thumb-up</v-icon>
        </v-btn>
        <span class="pl-n2">{{ content.nLikes }}</span>
        <v-btn icon small depressed
          @click="emitReaction('disliked', content._id, !reactions.disliked)"
          :color="reactions.disliked ? contentColor : ''"
        >
          <v-icon size="15">mdi-thumb-down</v-icon>
        </v-btn>
        <span class="pl-n2 pr-2">{{ content.nDislikes }}</span>
      </v-card>
      <v-card color="#F5F5F5" class="caption" outlined>
        <v-dialog :scrollable="false" v-model="show" max-width="800px" :retain-focus="false">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" slot = "activator" icon small depressed v-on:click="loadComments(content._id, post)">
              <v-icon size="15">mdi-chat</v-icon>
            </v-btn>
            <span v-if="numberOfComments" class="pl-n2 pr-2">{{ numberOfComments }}</span>
            <span v-else class="pl-n2 pr-2"> {{ content.nComments}} </span>
          </template>
          <v-card>
            <v-card-title primary-title class="justify-center">
              Replies
            </v-card-title>
            <v-divider></v-divider>
            <reply-post
              :commentsinDialog="commentsinDialog"
              :post="post"
              :content="content"
              class="mt-2 mb-2"
            />
            <v-container>
              <v-row>
                <v-col cols="12" md="11">
                  <text-editor v-model="comment"/>
                </v-col>
                <v-col cols="12" md="1" align-self="end">
                  <v-btn class="ml-2 mt-5" fab dark small :color="contentColor" v-on:click="replyPost('comment', content._id, comment)">
                    <v-icon dark>mdi-send</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-card>
    </v-card-actions>
  </v-card>
</template>

<script>
import utils from '@/utils/forum'
import ReplyPost from './ReplyPost.vue'
import http from '@/utils/http'
import TextEditor from '@/components/text-editor/TextEditor.vue'

export default {
  components: {
    ReplyPost, TextEditor
  },
  props: {
    numberOfComments: {
      type: Number,
      required: false
    },
    post: {
      type: Boolean,
      required: false,
      default: false
    },
    content: {
      type: Object,
      required: true
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
    postinfo: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    commentsinDialog: {
      comments: [],
      parent: {
        nComments: 0,
        author: {
          _id: '',
          username: '',
          type: '',
          src: ''
        },
        content: '',
        updatedAt: '',
        createdAt: '',
        nLikes: '',
        nDislikes: '',
        liked: false,
        disliked: false,
        floor: 1
      },
      page: 1,
      pages: 1
    },
    reactions: {
      liked: false,
      disliked: false
    },
    show: false,
    comment: ''
  }),
  computed: {
    hasContent () {
      return !!Object.keys(this.content).length
    },
    contentColor () {
      return utils.getPostColor(this.content.author)
    },
    timestamp () {
      return utils.getPostTimestamp(this.content.createdAt)
    }
  },
  methods: {
    async loadComments (cid, isPost) {
      this.show = true
      if (isPost === false) {
        return new Promise((resolve, reject) => {
          http.getComments({ id: this.postinfo._id, page: 1, size: 10, reply: cid })
            .then(({ data }) => {
              this.commentsinDialog = {
                comments: data.comments,
                page: data.page,
                pages: data.pages,
                parent: data.parent
              }
              console.log(this.commentsinDialog.parent)
              resolve()
            })
            .catch(() => reject(new Error('error fetching post')))
        })
      }
    },
    emitReaction (reaction, target, value) {
      console.log(this.numberOfComments)
      this.reactable
        ? this.$emit('react', reaction, { _id: target, type: this.post ? 'post' : 'comment' }, value)
        : this.$emit('denied')
    },
    replyPost (reaction, target, comment) {
      this.show = false
      this.reactable
        ? this.$emit('react', reaction, { _id: target, type: this.post ? 'post' : 'comment' }, comment)
        : this.$emit('denied')
    }
  },
  watch: {
    content: {
      immediate: true,
      deep: true,
      handler () {
        this.reactions = {
          liked: this.content.liked,
          disliked: this.content.disliked
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .floor-master
    color: #ea9085
</style>
