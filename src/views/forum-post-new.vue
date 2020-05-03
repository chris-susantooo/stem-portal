<template>
  <div class="post-edit container">
    <v-container>
      <div class="mb-5 text-center">
        <h1 class="px-2 my-3 pb-3">{{ `${isPostNew ? 'Create' : 'Edit'} Your Post` }}</h1>
      </div>
      <v-card
      >
        <v-form ref="form" v-model="form.valid" class="mt-2" lazy-validation >
          <v-row>
            <v-col cols="1">
              <v-subheader>Title: </v-subheader>
            </v-col>
            <v-col cols="11">
              <v-text-field outlined required autofocus
                v-model="form.title"
                :counter="50"
                :rules="rules.title"
                label=" Post Title"
                chips
                clearable
                class="mr-4"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-subheader>Tags:</v-subheader>
            </v-col>
            <v-col cols="11">
              <v-combobox multiple outlined chips clearable
                v-model="form.tags"
                :items="tagList.map(tag => tag.name)"
                label="Your post tags"
                :rules="rules.tag"
                validate-on-blur
                class="mr-r"
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="removeTag(item)"
                  >
                  <v-avatar class="accent white--text" left>
                    {{ item.slice(0, 1).toUpperCase() }}
                  </v-avatar>
                    {{ item }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <div class="mb-5 text-center">
            <h4 >Post Content</h4>
          </div>
          <v-card class="mx-4 mb-4" v-if="!isPostNew">
            <v-card-text class="black--text editor-content" v-html="post.content" />
          </v-card>
          <template>
            <text-editor class="ml-5 mr-5 mb-5" v-model="form.content" />
          </template>
          <div class="mt-4" >
            <v-btn class="ml-2" text color="primary" :disabled="!form.valid" @click="createPost">Save and exit</v-btn>
            <v-btn text @click="$router.go(-1)">Back</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import TextEditor from '@/components/text-editor.vue'
import http from '@/utils/http'

export default {
  watch: {
    $route (to, from) {
      this.initFromQuery(to.query)
      this.fetchPost()
    }
  },

  async created () {
    await Promise.all([
      this.fetchTags()
    ])
    if (this.isPostNew) {
      this.post.author = this.user._id
      return
    }
    this.$emit('childBusy')
    await this.fetchPost()
    this.$emit('childReady')
  },
  components: { TextEditor },

  computed: {
    isPostNew () {
      return !this.$route.params.id
    },
    user () {
      return this.$store.getters.user
    }
  },

  data: () => ({
    tagList: [],
    post: {
    },
    form: {
      valid: true,
      title: '',
      tags: [],
      content: ''
    },
    rules: {
      tag: [ v => !!v.length || 'At least a tag is required' ],
      title: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 50) || 'Title must be less than 60 characters'
      ]
    }
  }),
  methods: {
    createPost () {
      if (this.$refs.form.validate() && this.form.content.length > 0 && this.isPostNew) {
        http.createPost(this.form.title, this.form.content, this.form.tags)
          .then(({ status, data }) => {
            if (status === 201) {
              this.updateSuccess = true
              this.snackbar = true
              this.$refs.form.reset()
              this.$router.push({ name: 'forum' })
            }
          }).catch(err => {
            console.log(err)
            this.errorDialog = true
          })
      } else if (this.$refs.form.validate() && !this.isPostNew) {
        if (!this.form.content) this.form.content = this.post.content
        console.log(this.form.content, this.post._id, this.form.title, this.form.content, this.form.tags)
        http.updatePost({ id: this.post._id, title: this.form.title, content: this.form.content, tags: this.form.tags })
          .then(({ status, data }) => {
            if (status === 204) {
              this.updateSuccess = true
              this.snackbar = true
              this.$refs.form.reset()
              this.$router.push({ name: 'forum' })
            }
          }).catch(err => {
            console.log(err)
            this.errorDialog = true
          })
      }
    },
    fetchPost () {
      return new Promise((resolve, reject) => {
        if (this.isPostNew) resolve()
        http.getPost({ id: this.$route.params.id })
          .then(({ data: { post } }) => {
            this.form.title = post.title
            this.form.tags = post.tags
            this.post.content = post.content
            this.post = post
            console.log(this.post._id)
          })
          .catch(err => console.log(err))
          .finally(() => resolve())
      })
    },
    fetchTags () {
      return new Promise((resolve, reject) => {
        this.$http.get('tags/posts')
          .then(({ data: { tags } }) => {
            console.log(tags)
            this.tagList = tags
          })
          .catch(err => console.log(err))
          .finally(() => resolve())
      })
    },
    removeTag (item) {
      const itemIndex = this.form.tags.indexOf(item)
      this.form.tags.splice(itemIndex, 1)
    }
  }
}
</script>
