<template>
  <div class="make-comment">
    <v-container>
      <div class="mb-5 text-center">
        <h1>Create a New Post</h1>
      </div>
      <v-card
      >
        <v-form
          ref="form"
          v-model="isPostInfoValid"
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
                :counter="60"
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
                :items="tags"
                chips
                clearable
                label="Your post tags"
                multiple
                outlined
                :rules="tagRules"
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
            <v-col cols="1">
              <v-subheader>Content: </v-subheader>
            </v-col>
            <v-col cols="11">
              <template>
                <text-editor v-model="post.content" />
              </template>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <div class="text-center mb-3" >
            <v-btn color="primary" class="ml-2" @click="postCreatepost">Save and exit</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import TextEditor from '@/components/text-editor/TextEditor.vue'
import http from '@/utils/http'

export default {
  created () {
    this.$http.get('tags').then(({ data: tags }) => { this.tags = tags })
  },
  computed: {
    user () { return this.$store.getters.user }
  },
  components: { TextEditor },
  data: () => ({
    isPostInfoValid: true,
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
      v => (v && v.length <= 60) || 'Title must be less than 60 characters'
    ]
  }),
  methods: {
    postCreatepost () {
      if (this.isPostInfoValid && this.post.content.length > 0) {
        // this.$refs.form.reset()
        http.createPost(this.user.username, this.post.title, this.post.tags, this.post.content)
          .then(({ status, data }) => {
            if (status === 201) {
              this.updateSuccess = true
              console.log('yes')
            }
          }).catch(err => {
            console.log(err)
            this.errorDialog = true
          })
      }
    },
    removeTag (item) {
      this.course.tags.splice(this.course.tags.indexOf(item), 1)
      this.course.tags = [ ...this.course.tags ]
    }
  }
}
</script>
