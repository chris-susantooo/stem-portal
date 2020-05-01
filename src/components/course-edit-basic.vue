<template>
  <div class="course-basic-info-editor">
    <v-form v-model="form.valid" lazy-validation class="mt-2">
      <v-text-field outlined required autofocus
        :error-messages="nameProps.errMsgs"
        :count="60"
        :rules="rules.name"
        label="Course name"
        v-model="form.name"
        :hint="nameProps.hint"
      />
      <v-textarea outlined required
        v-model="form.description"
        :rules="rules.description"
        label="Short description"
      />
      <v-combobox multiple outlined chips clearable
        v-model="form.tags"
        :items="tagList.map(tag => tag.name)"
        label="Your course tags"
        :rules="rules.tags"
        validate-on-blur
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
    </v-form>
    <div class="mt-4">
      <v-btn text color="primary" @click="emitNextIfValid">Save and Continue</v-btn>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  async created () {
    await this.fetchTags()
  },
  data: () => ({
    tagList: [],
    form: {
      valid: true,
      name: '',
      tags: [],
      description: ''
    },
    rules: {
      name: [
        v => !!v || 'Name is required',
        v => (v.length >= 10 && v.length <= 60) || 'Must be 10 to 60 characters long'
      ],
      tags: [ v => !!v.length || 'At least a tag is required' ],
      description: [ v => !!v || 'Description is required' ]
    },
    nameProps: {
      hint: '',
      errMsgs: ''
    }
  }),
  computed: {
    courseName () {
      return this.form.name
    },
    courseBasicInfo () {
      return {
        name: this.course.name,
        tags: this.course.tags,
        description: this.course.description
      }
    },
    isCourseNew () {
      return !this.$route.params.id
    }
  },
  watch: {
    form: {
      deep: true,
      handler () {
        const { valid, name, tags, description } = this.form
        if (valid) {
          this.$emit('change', { name, tags, description })
        }
      }
    },
    courseBasicInfo (val) {
      this.form.name = val.name
      this.form.tags = val.tags
      this.form.description = val.description
    },
    courseName (val) {
      if (!this.isCourseNew) return
      setTimeout(() => {
        const isValid = this.rules.name.every(r => typeof r(val) !== 'string')
        if (!isValid) return
        this.$http.head(`courses/${val}`)
          .then(({ status }) => {
            if (status !== 204) throw new Error('Name does not exist')
            this.nameProps = {
              hint: undefined,
              errMsgs: 'Name already used'
            }
          })
          .catch(() => {
            this.nameProps = {
              hint: 'Name available',
              errMsgs: ''
            }
          })
      }, 1000)
    }
  },
  methods: {
    fetchTags () {
      return new Promise((resolve, reject) => {
        this.$http.get('tags/courses')
          .then(({ data: { tags } }) => {
            this.tagList = tags
          })
          .catch(err => console.log(err))
          .finally(() => resolve())
      })
    },
    removeTag (item) {
      const itemIndex = this.form.tags.indexOf(item)
      this.form.tags.splice(itemIndex, 1)
    },
    emitNextIfValid () {
      if (!this.form.valid) return
      this.$emit('next', 2)
    }
  }
}
</script>
