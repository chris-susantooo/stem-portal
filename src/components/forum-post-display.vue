<template>
  <v-card outlined :class="{ ...emptyPostClasses, 'post-display': true }">
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
        :style="`height: 100%; background-color: #FAFAFA;`"
        class="overflow-y-auto"
        ref="post-display-container"
      >
        <div id="top" v-intersect.quiet="atListTop" />
        <post-card
          v-if="showOP"
          :content="post.content"
          :postinfo="post.content"
          :reactable="permissions.react"
          :editable="permissions.edit"
          :numberOfComments="numberOfComments"
          @react="handleReaction"
          @denied="emitDenialMessage"
          @action="handleAction"
          post
        />
        <template v-for="(comment, i) in post.content.comments">
          <div
            v-if="(i  % 10 )=== 0"
            v-intersect.quiet="atPageIntersect"
            :id="`p-${getPageNum(i)}-top`"
            :key="`ptop-${getPageNum(i)}`"
            class="mt-6"
          />
          <post-card
            :postinfo="post.content"
            :content="comment"
            :reactable="permissions.react"
            :editable="permissions.edit"
            @react="handleReaction"
            @denied="emitDenialMessage"
            :id="'post-comment-' + i"
            :key="'post-comment-' + i"
            class="mt-2"
          />
          <div
            v-if="(i ) % 10 === 9"
            :id="`p-${getPageNum(i)}-bot`"
            v-intersect.quiet="atListEnd"
            :key="`pbot-${getPageNum(i)}`"
            class="mb-6"
          />
        </template>
      </div>
    </template>
    <no-post v-else />
  </v-card>
</template>

<script>
import NoPost from './forum-nopost.vue'
import CommentPaginator from './paginator.vue'
import PostCard from './forum-post-card.vue'
import utils from '@/utils/forum'

export default {
  components: { NoPost, CommentPaginator, PostCard },
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
    listEnd: false,
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
        edit: this.hasPost && this.isLoggedIn && this.post.content.author._id === this.user._id
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
      console.log(newHistory, oldHistory)
      if (newHistory.page === oldHistory.page) return
      if (newHistory.position === oldHistory.position) return
      if (newHistory.page) this.$emit('page-change', newHistory.page)
      else this.$emit('page-change', oldHistory.page)
    }
  },
  methods: {
    atListTop (entries, observer, isIntersecting) {
      console.log('atListTop', isIntersecting)
      const newPage = this.post.page - 1
      const isLoadedBefore = this.post.loadedPages[newPage]
      if (isIntersecting && !isLoadedBefore && newPage !== 0) {
        const container = this.$refs['post-display-container']
        this.loadPage(newPage, container, 'scroll')
      }
    },
    atListEnd (entries, observer, isIntersecting) {
      console.log('atListEnd', isIntersecting)
      let s = ''
      entries
        .map(e => {
          s = e.target.id.split('-')
          const [, page, position] = e.target.id.split('-')
          return { page: parseInt(page), position, time: e.time }
        })
        .sort((a, b) => a.time - b.time)
        .forEach(e => (this.scrollHistory = e))
      const newPage = this.post.page + 1
      if (isIntersecting && !this.post.loadedPages[newPage] && parseInt(s[1]) === this.post.page) {
        const container = this.$refs['post-display-container']
        this.loadPage(newPage, container, 'scroll')
      }
    },
    atPageIntersect (entries, observer, isIntersecting) {
      console.log('atpageintersect', isIntersecting)
      entries
        .map(e => {
          const [, page, position] = e.target.id.split('-')
          return { page: parseInt(page), position, time: e.time }
        })
        .sort((a, b) => a.time - b.time)
        .forEach(e => (this.scrollHistory = e))
    },
    loadPage (page, container, operation) {
      if (page < 1 || page > this.post.pages || page === this.post.page) return
      console.log(this.post.loadedPages)
      this.$emit('load-page', page, container, operation)
    },
    toPage (page) {
      if (page < 1 || page > this.post.pages || page === this.post.page) return
      console.log(page)
      console.log('LoadedPages:', this.post.loadedPages)
      this.scrollHistory = {}
      // const loadedBefore = this.post.loadedPages[page]
      return this.$emit('load-page', page, '#post-display-container', 'pressbtn')
      // const isSkip = Math.abs(page - this.post.page) > 1
    },
    emitDenialMessage () {
      this.$emit('denied', 'This action is members-only. Please log-in or register to continue.')
    },
    getComment (cid, isPost) {
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
    handleAction (action, target) {
      console.log('handleAction', action, target)
      switch (action) {
        case 'delete':
          this.$emit('delete', target)
          break
        case 'edit':
          this.$emit('edit', target)
          break
      }
    },
    getPageNum (i) {
      return Math.floor((this.post.content.comments[i].floor - 2) / 10) + 1
    }
  }
}
</script>

<style lang="scss" scoped>
  .truncate {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .post-display {
    height: calc(100vh - 4rem);
    overflow: hidden;
  }
</style>
