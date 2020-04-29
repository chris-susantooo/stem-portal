<template>
  <v-card height="100vh" outlined :class="emptyPostClasses">
    <template v-if="hasPost">
      <v-row class="justify-space-between align-center mx-3" ref="post-display-header">
        <v-avatar v-if="post.content.author.avatar" size="40">
          <v-img :src="post.content.author.avatar" :alt="post.content.author.username" />
        </v-avatar>
        <v-avatar v-else :color="postColor" size="40">
          <span class="white--text headline">
            {{ post.content.author.username.split(' ').map(s => s[0].toUpperCase()).join() }}
          </span>
        </v-avatar>
        <v-card-title class="d-block truncate pr-0">
          {{ post.content.title || 'Loading...' }}
        </v-card-title>
        <comment-paginator
          :value="post.page"
          :length="post.pages"
          :color="postColor"
          @input="toPage"
          class="mr-1"
        />
      </v-row>
      <v-divider />
      <div
        id="post-display-container"
        :style="`height: ${postHeight}px; background-color: #FAFAFA;`"
        class="overflow-y-auto"
        ref="post-display-container"
      >
        <div id="p-1-top" v-intersect.quiet="atListTop" />
        <post-card
          v-if="showOP"
          :content="post.content"
          :postinfo="post.content"
          :reactable="permissions.react"
          :editable="permissions.edit"
          :numberOfComments="numberOfComments"
          @react="handleReaction"
          @denied="emitDenialMessage"
          post
        />
        <template v-for="(comment, i) in post.content.comments">
          <div
            v-if="i + 1 === post.content.comments.length"
            v-intersect.quiet="atListEnd"
            :key="`trigger-${i}`"
          />
          <div
            v-if="(i + 1) % 10 === 0 && i !== 0"
            :id="`p-${getPageNum(i)}-top`"
            v-intersect.quiet="atPageIntersect"
            :key="`ptop-${getPageNum(i)}`"
          />
          <post-card
            :postinfo="post.content"
            :content="comment"
            :reactable="permissions.react"
            :editable="permissions.edit"
            @react="handleReaction"
            @denied="emitDenialMessage"
            :key="'post-comment-' + i"
            class="mt-2"
          />
          <div
            v-if="(i + 1) % 10 === 9"
            :id="`p-${getPageNum(i)}-bot`"
            v-intersect.quiet="atPageIntersect"
            :key="`pbot-${getPageNum(i)}`"
          />
        </template>
      </div>
    </template>
    <no-post v-else />
  </v-card>
</template>

<script>
import NoPost from './NoPost.vue'
import CommentPaginator from './Paginator.vue'
import PostCard from './PostCard.vue'
import utils from '@/utils/forum'

export default {
  components: { NoPost, CommentPaginator, PostCard },
  mounted () {
    this.updatePostHeight()
    window.addEventListener('resize', this.updatePostHeight)
  },
  updated () {
    this.updatePostHeight()
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    numberOfComments: {
      type: Number,
      required: false
    }
  },
  data: () => ({
    postHeight: 0,
    scrollHistory: {},
    showOP: true
  }),
  computed: {
    hasPost () {
      return !!Object.keys(this.post.content).length
    },
    permissions () {
      return {
        view: true, // todo
        react: this.isLoggedIn,
        edit: this.hasPost && this.isLoggedIn && this.post.content.author._id === this.user.id
      }
    },
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    user () {
      return this.$store.getters.user
    },
    postColor () {
      return utils.getPostColor(this.post.content.author)
    },
    emptyPostClasses () {
      return !this.hasPost
        ? { 'd-flex': true, 'justify-center': true, 'align-center': true }
        : {}
    }
  },
  watch: {
    post (newPost, oldPost) {
      if (!oldPost) return
      if (newPost.page === 1) this.showOP = true
    },
    scrollHistory (newHistory, oldHistory) {
      if (newHistory.page === oldHistory.page) return
      if (newHistory.position === oldHistory.position) return
      this.$emit('page-change', newHistory.page)
    }
  },
  methods: {
    atListTop (entries, observer, isIntersecting) {
      const newPage = this.post.page - 1
      if (isIntersecting && !this.post.loadedPages[newPage]) {
        const container = this.$refs['post-display-container']
        this.loadPage(newPage, container)
      }
    },
    atListEnd (entries, observer, isIntersecting) {
      const newPage = this.post.page + 1
      if (isIntersecting && !this.post.loadedPages[newPage]) {
        this.loadPage(newPage)
      }
    },
    atPageIntersect (entries, observer, isIntersecting) {
      entries
        .map(e => {
          const [, page, position] = e.target.id.split('-')
          return { page: parseInt(page), position, time: e.time }
        })
        .sort((a, b) => a.time - b.time)
        .forEach(e => (this.scrollHistory = e))
    },
    loadPage (page, container) {
      if (page < 1 || page > this.post.pages || page === this.post.page) return
      this.$emit('load-page', page, container)
    },
    toPage (page) {
      if (page < 1 || page > this.post.pages || page === this.post.page) return

      const loadedBefore = !!this.post.loadedPages[page]
      if (loadedBefore) {
        return this.$emit('scroll-page', `#p-${page}-top`, '#post-display-container')
      }

      // const isSkip = Math.abs(page - this.post.page) > 1
    },
    emitDenialMessage () {
      this.$emit('denied', 'This action is members-only. Please log-in or register to continue.')
    },
    updatePostHeight () {
      if (this.hasPost) {
        this.postHeight = window.innerHeight - this.$refs['post-display-header'].clientHeight
      }
    },
    getComment (cid, isPost) {
      console.log(cid)
      this.$emit('getcomment', cid)
    },
    handleReaction (reaction, target, value) {
      switch (reaction) {
        case 'liked':
        case 'disliked':
          this.$emit('react', target, reaction, value)
          break
        case 'follow':
          this.$emit('follow', this.post.content._id)
          break
        case 'comment':
          this.$emit('comment', target, value)
      }
    },
    getPageNum: i => Math.floor((i + 1) / 10) + 1
  }
}
</script>

<style lang="sass" scoped>
  .truncate
    flex: 1
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
</style>
