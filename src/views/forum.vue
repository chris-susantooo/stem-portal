<template>
  <v-container>
    <h1 class="headers text-center">Discussion Forum</h1>
    <div class="my-2" />
    <forum-tool-bar
      @home="resetPage"
      @update-post-list="filterPosts"
    />
    <div class="my-5" />
    <!-- forum -->
    <v-row id="forum-comp">
      <v-col cols="12" md="4" class="pa-0">
        <post-list
          :posts="posts.content"
          @select="fetchPost"
          @more="fetchPosts({ page: posts.page + 1 })"
          @refresh="fetchPosts"
        />
      </v-col>
      <v-col cols="12" md="8" class="pa-0">
        <post-display
          :post="post"
          :numberOfComments="numberOfComments"
          :numberOfReplies="numberOfReplies"
          :comments="result"
          @load-page="loadPostPage"
          @scroll-page="scroll"
          @page-change="changePostPage"
          @react="handleReactPost"
          @comment="handleReplyPost"
          @delete="handleDeletePost"
          @following="handleFollowUser"
        />
      </v-col>
    </v-row>
    <div class="mt-5" />
  </v-container>
</template>

<script>
import ForumToolBar from '../components/forum-toolbar.vue'
import PostList from '../components/forum-post-list.vue'
import PostDisplay from '../components/forum-post-display.vue'

import http from '../utils/http'

export default {
  components: { ForumToolBar, PostList, PostDisplay },

  async created () {
    this.$emit('childBusy')
    let id = ''
    if (this.$route.params.id) this.initFromParam(this.$route.params.id)

    await this.fetchPosts()
    if (this.posts.content.length) {
      if (this.id !== undefined) id = this.id
      else id = this.posts.content[0]._id

      if (this.posts.content.length) await this.fetchPost({ id: id })
    }
    this.$emit('childReady')
  },
  computed: {
  },
  data: () => ({
    numberOfReplies: 0,
    numberOfComments: 0,
    result: undefined,
    posts: {
      content: [],
      page: 1
    },
    post: {
      content: {},
      loadedPages: {},
      pages: 1,
      page: 1
    },
    filters: ''
  }),
  methods: {
    initFromParam (param) {
      this.id = param
    },
    fetchPosts (options = {}, clearPosts = false) {
      const { search, tags, sort = 'latest', page = 1, size = 10 } = options
      return new Promise((resolve, reject) => {
        http.getPosts({ search, tags, sort, page, size })
          .then(({ data }) => {
            if (data.posts) {
              if (clearPosts) {
                this.posts.content = data.posts
              } else {
                this.posts.content.push(...data.posts)
              }
              this.posts.page = data.page
            }
            resolve()
          })
          .catch(() => reject(new Error('error fetching posts')))
      })
    },

    fetchPost (options = {}) {
      const { id, size = 10 } = options
      let param = id
      if (this.post.content._id === id) return
      return new Promise((resolve, reject) => {
        http.getPost({ id, size })
          .then(({ data }) => {
            this.post = {
              content: data.post,
              loadedPages: { 1: data.post.comments },
              pages: data.pages,
              page: 1
            }
            const url = location.href.split('/')[0] + '//' + location.href.split('/')[2] + '/forum/post/'
            history.replaceState('', '', `${url}${param}`)
            resolve()
          })
          .catch(() => reject(new Error('error fetching post')))
      })
    },

    fetchComments (options = {}) {
      const { id = this.post.content._id, page, size = 10, reply } = options
      return new Promise((resolve, reject) => {
        http.getComments({ id, page, size, reply })
          .then(({ data }) => resolve(data))
          .catch(() => reject(new Error('error fetching comments')))
      })
    },
    filterPosts (query) {
      if (query[0] && !query[1]) this.fetchPosts({ tags: query[0] }, true)
      else if (query[1] && !query[0]) this.fetchPosts({ sort: query[1] }, true)
      else if (query[1] && query[0]) this.fetchPosts({ tags: query[0], sort: query[1] }, true)
      else if (!query[1] && !query[1]) this.fetchPosts({}, true)
    },
    replyPost (comment) {
      return new Promise((resolve, reject) => {
        http.createComment(this.post.content._id, comment)
          .then(({ data, status }) => {
            if (status === 201) {
              const newcomments = this.updateComment(data.comment)
              Object.assign(this.post.content, newcomments)
              this.$store.dispatch('fetchUser')
              resolve()
            } else {
              reject(new Error('error replying'))
            }
          })
          .catch(() => reject(new Error('error replying post')))
      })
    },
    replyComment (_commentId, comment) {
      return new Promise((resolve, reject) => {
        http.createComment(this.post.content._id, comment, _commentId)
          .then(({ data, status }) => {
            if (status === 201) {
              const comment = this.post.content.comments.find(c => c._id === _commentId)
              comment.nComments += 1
              this.numberOfReplies = comment.nComments
              const newcomments = this.updateComment(data.comment)
              Object.assign(this.post.content, newcomments)
              this.$store.dispatch('fetchUser')
              resolve()
            } else {
              reject(new Error('error replying'))
            }
          })
          .catch(() => reject(new Error('error replying comment')))
      })
    },
    reactPost (payload) {
      return new Promise((resolve, reject) => {
        http.reactPost(this.post.content._id, payload)
          .then(({ data, status }) => {
            if (status === 204) {
              const newRatings = this.updateRatings(payload)
              Object.assign(this.post.content, payload, newRatings)
              resolve()
            } else {
              reject(new Error('error reacting post'))
            }
          })
          .catch(() => reject(new Error('error reacting post')))
      })
    },
    reactComment (_commentId, payload) {
      return new Promise((resolve, reject) => {
        http.reactComment(this.post.content._id, _commentId, payload)
          .then(({ status }) => {
            if (status === 204) {
              for (let i = 0; i < this.post.content.comments.length; i++) {
                const comment = this.post.content.comments[i]
                if (comment._id === _commentId) {
                  const newRatings = this.updateRatings(payload, i)
                  Object.assign(comment, payload, newRatings)
                }
              }
              resolve()
            } else {
              reject(new Error('error reacting comment'))
            }
          })
          .catch(() => reject(new Error('error reacting comment')))
      })
    },

    async resetPage () {
      this.scroll('#forum-comp')
      await this.fetchPosts({}, true)
      if (this.posts.content.length) {
        this.scroll(0, '#post-list-container')
        await this.fetchPost({ id: this.posts.content[0]._id })
      }
    },

    scroll (target, container) {
      const scrollOptions = {
        duration: 1000,
        offset: 64,
        easing: 'easeInOutCubic'
      }
      if (container) scrollOptions.container = container
      this.$vuetify.goTo(target, scrollOptions)
    },

    async loadPostPage (page, container, operation) {
      const { comments, page: newPage, pages } = await this.fetchComments({ page })
      if (operation === 'pressbtn') {
        this.post.content.comments = comments
        this.post.loadedPages = {}
        this.post.loadedPages[newPage] = comments
        this.post = Object.assign({ page: this.post.page, pages }, this.post)
        this.scroll(`#post-comment-0`, '#post-display-container')
      } else if (operation === 'scroll') {
        if (this.post.loadedPages[page]) return
        if (newPage > this.post.page) this.post.content.comments.push(...comments)
        if (newPage < this.post.page) this.post.content.comments = [ ...comments, ...this.post.content.comments ]
        this.post = Object.assign({ page: this.post.page, pages }, this.post)

        if (newPage < this.post.page && container) {
          const initHeight = container.scrollHeight
          await this.$nextTick()
          container.scrollTop = container.scrollHeight - initHeight
        }
        this.post.loadedPages[newPage] = comments
      }
      this.post.page = newPage
    },

    async changePostPage (newPage) {
      this.post.page = newPage
    },
    handleReplyPost (target, comment) {
      target.type === 'post'
        ? this.replyPost(comment)
        : this.replyComment(target._id, comment)
    },
    handleReactPost (target, reaction, value) {
      const payload = { liked: false, disliked: false }
      payload[reaction] = value

      target.type === 'post'
        ? this.reactPost(payload)
        : this.reactComment(target._id, payload)
    },
    async handleDeletePost (target) {
      return new Promise((resolve, reject) => {
        http.deletePost(target)
          .then(({ data, status }) => {
            if (status === 204) {
              this.resetPage()
              resolve()
            } else {
              reject(new Error('error deleting post'))
            }
          })
          .catch(() => reject(new Error('error deleting post')))
      })
    },
    updateComment (comment, commentIndex) {
      const target = commentIndex !== undefined
        ? this.post.content.comments[commentIndex]
        : this.post.content
      let { comments } = target
      comments.push(comment)

      if (commentIndex === undefined) {
        const post = this.posts.content.find(p => p._id === this.post.content._id)
        post.nComments += 1
        this.numberOfComments = post.nComments
      }
      return { comments }
    },
    updateRatings (payload, commentIndex) {
      const target = commentIndex !== undefined
        ? this.post.content.comments[commentIndex]
        : this.post.content

      let { liked, disliked, nLikes, nDislikes } = target
      if (!liked && payload.liked) nLikes += 1
      if (liked && !payload.liked) nLikes -= 1
      if (!disliked && payload.disliked) nDislikes += 1
      if (disliked && !payload.disliked) nDislikes -= 1

      if (commentIndex === undefined) {
        const post = this.posts.content.find(p => p._id === this.post.content._id)
        post.rating = nLikes - nDislikes
      }

      return { nLikes, nDislikes }
    },
    handleFollowUser (reaction, target) {
      if (reaction === 'unfollow') {
        http.unfollowUser(target)
          .then(({ data, status }) => {
            this.$store.dispatch('fetchUser')
          })
      } else {
        http.followUser(target)
          .then(({ data, status }) => {
            this.$store.dispatch('fetchUser')
          })
      }
    }
  }
}
</script>
