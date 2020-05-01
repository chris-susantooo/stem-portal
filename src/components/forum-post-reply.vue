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
        <v-card color="#F5F5F5" outlined>
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
    {{commentsinDialog.page}}
    <div
      id="comment-display-container"
      class="overflow-y-auto"
      ref="comment-display-container"
      style="height:400px;"
    >
      <template v-for="(comment, i) in commentsinDialog.comments">
        <div
          v-if="(i  % 10 )=== 0"
          v-intersect.quiet="atPageIntersect"
          :id="`p-${commentsinDialog.page}-top`"
          :key="`ptop-${(i)}`"
        />
        <comment-card
          :content="comment"
          :key="'comment-comment-' + i"
          :id="`${cid}`"
          class="mt-2"
        />
        <div
          v-if="(i ) % 10 === 9"
          :id="`p-${(commentsinDialog.page)}-bot`"
          v-intersect.quiet="atListEnd"
          :key="`pbot-${(i)}`"
        />
      </template>
    </div>
  </div>
</template>
<script>
import utils from '@/utils/forum'
import CommentCard from './forum-comment-card.vue'

export default {
  components: {
    CommentCard
  },
  data: () => ({
    comment: '',
    show: false
  }),
  props: {
    cid: {
      type: String,
      required: true
    },
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
    atListTop (entries, observer, isIntersecting) {
      console.log('atListTop', isIntersecting)
      const newPage = this.commentsinDialog.page - 1
      const isLoadedBefore = this.commentsinDialog.loadedPages[newPage]
      if (isIntersecting && !isLoadedBefore && newPage !== 0) {
        const container = this.$refs['comment-display-container']
        this.loadPage(newPage, container)
      }
    },
    atListEnd (entries, observer, isIntersecting) {
      console.log('atListEnd', isIntersecting)
      console.log(this.commentsinDialog.page)
      let s = ''
      entries
        .map(e => {
          s = e.target.id.split('-')
          const [, page, position] = e.target.id.split('-')
          return { page: parseInt(page), position, time: e.time }
        })
        .sort((a, b) => a.time - b.time)
        .forEach(e => (this.scrollHistory = e))
      const newPage = this.commentsinDialog.page + 1
      if (isIntersecting && !this.commentsinDialog.loadedPages[newPage] && parseInt(s[1]) === this.commentsinDialog.page) {
        const container = this.$refs['comment-display-container']
        this.loadPage(newPage, container)
      }
    },
    atPageIntersect (entries, observer, isIntersecting) {
      console.log('atpageintersect', isIntersecting)
      console.log(entries)
      console.log(observer)
      entries
        .map(e => {
          const [, page, position] = e.target.id.split('-')
          return { page: parseInt(page), position, time: e.time }
        })
        .sort((a, b) => a.time - b.time)
        .forEach(e => (this.scrollHistory = e))
    },
    loadPage (page, container) {
      if (page < 1 || page > this.commentsinDialog.pages || page === this.commentsinDialog.page) return
      this.$emit('load-page', page, container)
    }
  },
  watch: {
    scrollHistory (newHistory, oldHistory) {
      console.log(newHistory, oldHistory)
      if (newHistory.page === oldHistory.page) return
      if (newHistory.position === oldHistory.position) return
      if (newHistory.page) this.$emit('page-change', newHistory.page)
      else this.$emit('page-change', oldHistory.page)
    }
  }
}
</script>
