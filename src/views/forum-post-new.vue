<template>
  <div class="make-comment">
    <v-container>
      <div class="mb-5 text-center">
        <h1>Create Post</h1>
      </div>
      <v-card
      >
        <v-form
          ref="form"
          v-model="valid"
          class="ma-6"
          lazy-validation
        >
          <v-row>
            <v-col cols="1">
              <v-subheader>Title: </v-subheader>
            </v-col>
            <v-col cols="11">
              <v-text-field
                v-model="post.title"
                :counter="50"
                :rules="titleRules"
                label=" Post Title"
                chips
                clearable
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-subheader>Tags:</v-subheader>
            </v-col>
            <v-col cols="11">
              <v-combobox
                v-model="post.tags"
                :items="tags.map(tag => tag.name)"
                chips
                clearable
                label="Your post tags"
                multiple
                outlined
                :rules="tagRules"
                v-if="tags"
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
          <v-row>
            <v-col cols="2">
              <v-subheader>Content: </v-subheader>
            </v-col>
            <v-col cols="10">
              <template>
                <text-editor v-model="post.content" />
              </template>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <div class="text-center mb-3" >
            <v-btn color="primary" class="ml-2" :disabled="!valid" @click="createPost">Save and exit</v-btn>
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
  beforeCreate () {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push({ name: 'login' })
    }
  },
  created () {
    this.$http.get('tags').then(({ data: { tags } }) => { this.tags = tags })
  },
  components: { TextEditor },
  data: () => ({
    valid: true,
    extraTags: [],
    tags: [],
    post: {
      title: '',
      tags: [],
      content: ''
    },
    tagRules: [ v => !!v.length || 'At least a tag is required' ],
    titleRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 50) || 'Title must be less than 60 characters'
    ]
  }),
  methods: {
    createPost () {
      if (this.$refs.form.validate() && this.post.content.length > 0) {
        console.log(this.post.content)
        http.createPost(this.post.title, this.post.content, this.post.tags)
          .then(({ status, data }) => {
            if (status === 201) {
              this.updateSuccess = true
              this.snackbar = true
              this.$refs.form.reset()
              this.$store.dispatch('fetchUser')
              this.$router.push({ name: 'forum' })
            }
          }).catch(err => {
            console.log(err)
            this.errorDialog = true
          })
      }
    },
    removeTag (item) {
      this.post.tags.splice(this.post.tags.indexOf(item), 1)
      this.post.tags = [ ...this.post.tags ]
    }
  }
}
</script>
