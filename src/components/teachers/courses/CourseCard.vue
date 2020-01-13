<template>
  <div class="ma-0 pa-0">
    <!-- course card -->
    <v-card class="course-card mx-auto my-12" max-width="300">
      <v-img height="200" :src="'https://cdn.vuetifyjs.com/images/cards/cooking.png' || course.thumbnail" @click="toCourse"/>
      <v-card-title @click="toCourse">
        <span class="d-inline-block text-truncate">{{ course.title }}</span>
      </v-card-title>
      <v-card-text class="mt-n2">
        <router-link to="/">{{ course.author }}</router-link>
        <v-row align="center" class="mx-0">
          <v-rating dense half-increments
            :readonly="!ratable"
            :value="course.rating"
            color="amber"
            size="14"
          />
          <div class="grey--text ml-4">{{ `${course.rating} (${course.votes})` }}</div>
        </v-row>
        <v-chip-group show-arrows active-class="deep-purple white--text">
          <v-chip v-for="tag in course.tags" :key="tag" to="/">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="indigo" class="mr-n1 px-n1" @click="toCourse">
          Edit
        </v-btn>
        <v-btn text color="indigo" class="mr-n1 px-n1" @click="toPreview">
          Preview
        </v-btn>
        <v-spacer />
        <v-btn text icon color="red" class="px-n1" @click.prevent="removeDialog = true">
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- delete confirmation dialog -->
    <v-dialog v-model="removeDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>
        <v-card-text>Once you deleted this course, it cannot be recovered. Students will not be able to access your course.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="removeDialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="deleteCourse">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import http from '@/utils/http'

export default {
  props: {
    ratable: {
      type: Boolean,
      default: false
    },
    course: {
      type: Object,
      required: true
    },
    role: {
      type: String,
      required: true
    }
  },
  data: () => ({
    removeDialog: false
  }),
  methods: {
    toCourse () {
      if (this.role === 'teacher') this.$router.push({ name: 'edit-course', params: { courseId: this.course.id } })
      else if (this.role === 'student') this.$router.push({ name: 'take-course', params: { courseId: this.course.id } })
    },
    toPreview () {
      this.$router.push({ name: 'preview-course', params: { courseId: this.course.id } })
    },
    deleteCourse () {
      this.removeDialog = false
      http.deleteCourse(this.course.id).then(({ status }) => {
        if (status === 204) { this.$emit('courseDeleted') }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.course-card
  cursor: pointer
</style>
