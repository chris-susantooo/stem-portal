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
          v-model="validcreation"
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
                label="Title"
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
                :items="allTags"
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
            <v-btn color="primary" class="ml-2" @click="validate()">Save and exit</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import TextEditor from '@/components/text-editor/TextEditor.vue'
export default {
  computed: {
    allTags () {
      return [ ...this.baseTags, ...this.extraTags ]
    }
  },
  components: { TextEditor },
  data: () => ({
    validcreation: true,
    baseTags: ['Science', 'Technology', 'Engineering', 'Mathematics'],
    extraTags: [],
    post: {
      title: '',
      tags: [],
      content: []
    },
    tagRules: [ v => !!v.length || 'At least a tag is required' ],
    titleRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 60) || 'Title must be less than 60 characters'
    ]
  }),
  methods: {
    removeTag (item) {
      this.course.tags.splice(this.course.tags.indexOf(item), 1)
      this.course.tags = [ ...this.course.tags ]
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.$refs.form.reset()
      }
    }
  }
}
// export default {
//   created () {
//     this.$http.get('courses/tags')
//       .then(({ data: extraTags }) => {
//         this.extraTags = extraTags
//       })
//   },
//   computed: {
//     allTags () {
//       return [ ...this.baseTags, ...this.extraTags ]
//     }
//   },
//   data: () => ({
//     isCourseInfoValid: true,
//     isCourseValid: true,
//     baseTags: ['Science', 'Technology', 'Engineering', 'Mathematics'],
//     extraTags: [],
//     currentStep: 1,
//     save: true,
//     course: {
//       title: '',
//       tags: [],
//       description: '',
//       chapters: []
//     },
//     tagRules: [ v => !!v.length || 'At least a tag is required' ],
//     courseNameRules: [
//       v => !!v || 'Name is required',
//       v => (v && v.length <= 60) || 'Name must be less than 60 characters'
//     ],
//     shortDescRules: [ v => !!v || 'Description is required' ]
//   }),
//   methods: {
//     saveCourse (chapters) {
//       this.course.chapters = chapters
//     },
//     next (to) {
//       if (to === 3 && this.isCourseValid) this.save = !this.save
//       if (this.isCourseInfoValid && this.isCourseValid) this.currentStep = to
//     },
//     setCourseValid (isCourseValid) {
//       this.isCourseValid = isCourseValid
//     },
//     removeTag (item) {
//       this.course.tags.splice(this.course.tags.indexOf(item), 1)
//       this.course.tags = [ ...this.course.tags ]
//     }
//   }
// }
</script>
