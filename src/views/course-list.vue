<template>
  <div class="d-flex flex-grow-1">
    <v-form lazy-validation @submit.prevent ref="search-form">
      <div class="course-search container">
        <div>
          <span class="display-1 text-center mb-12">I want to learn...</span>
          <v-text-field clearable solo
            v-model="query.content"
            :rules="query.rules"
            @keyup.enter="searchCourses"
            @click:prepend-inner="searchCourses"
            @blur="$refs['search-form'].resetValidation()"
            height="60"
            label="Search courses"
            prepend-inner-icon="mdi-magnify"
          />
        </div>
      </div>
    </v-form>
    <div class="course-list container">
      <div v-if="this.user.type === 'teacher'" class="px-2 py-3">
        <h2 class="headline ml-2 mb-5">Here are the courses that you manage</h2>
        <div class="teaching-courses">
          <!-- create-new-course-btn -->
          <v-hover>
            <template v-slot="{ hover }">
              <div>
                <v-card class="new-course-btn ma-2" :to="{ name: 'course-new' }" :elevation="hover ? 5 : 0" outlined>
                  <div class="flex-grow-1">
                    <router-link :to="{ name: 'course-new' }" class="d-flex flex-column align-center text-center">
                      <v-icon size="128" color="primary">mdi-plus-circle</v-icon>
                      <span class="title">Add New Course</span>
                    </router-link>
                  </div>
                </v-card>
              </div>
            </template>
          </v-hover>
          <!-- other-created-courses -->
          <course-card
            v-for="course in coursesCreated"
            :key="`course-${course._id}`"
            :course="course"
            :ratable="false"
            :editable="true"
            @delete="askDelete"
          />
        </div>
      </div>
      <div v-if="isLoggedIn && hasUnfinishedCourses" class="px-2 py-3">
        <h2 class="headline ml-2 mb-5">{{ user.firstName }}, pick up where you left off</h2>
        <div class="in-progress-courses">
          <course-card
            v-for="course in coursesInProgress"
            :key="`course-${course._id}`"
            :course="course"
            :ratable="isCourseRatable(course._id)"
            @rate="showRateCourseDialog"
          />
        </div>
      </div>
      <div id="all-courses" class="px-2 py-3 pt-6">
        <div class="d-flex justify-space-between flex-wrap align-center px-2">
          <h2 class="headline mr-5 mb-5">{{ coursesHeadline }}</h2>
          <v-menu
            v-model="coursesMenu.show"
            :close-on-content-click="false"
            min-width="300"
            transition="slide-y-transition"
            nudge-bottom="10"
            offset-y
            left
          >
            <template v-slot:activator="{ on }">
              <v-btn class="no-text-transform mb-5" v-on="on" rounded depressed large>
                <v-icon size="16">{{ coursesMenu.show ? 'mdi-filter-remove' : 'mdi-filter-menu' }}</v-icon>
                <span class="ml-2">Filters / Sortings</span>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="pb-0">
                <h5 class="text-center ml-auto mr-auto">Filter by Tags</h5>
              </v-card-title>
              <div class="filters">
                <v-list flat>
                  <v-list-item-group
                    v-model="coursesMenu.selectedFilters"
                    @change="fetchCourses"
                    multiple
                  >
                    <v-list-item
                      v-for="tag in coursesMenu.filters"
                      :key="`filter-${tag.name}`"
                      :value="tag.name"
                      class="px-5"
                    >
                      <template v-slot:default="{ active, toggle }">
                        <v-list-item-action class="mr-4">
                          <v-checkbox
                            :input-value="active"
                            :true-value="tag.name"
                            @click="toggle"
                          ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title>
                            <span class="subtitle-2">{{ tag.name }}</span>
                            <span class="float-right subtitle-2 text--secondary">{{ tag.courseReferences }}</span>
                          </v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </div>
              <v-card-title class="py-0">
                <h5 class="text-center ml-auto mr-auto">Sort by...</h5>
              </v-card-title>
              <div class="sortings">
                <v-list flat>
                  <v-list-item-group
                    v-model="coursesMenu.selectedSorting"
                    @change="fetchCourses"
                    color="primary"
                  >
                    <v-list-item
                      v-for="(item, sorting) in coursesMenu.sortings"
                      :key="`sorting-${sorting}`"
                      :value="sorting"
                      class="px-5"
                    >
                      <v-list-item-icon class="mr-4">
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="subtitle-2" v-text="item.description" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </div>
            </v-card>
          </v-menu>
        </div>
        <v-chip-group show-arrows>
          <v-chip
            v-for="tag in selectedOptions"
            :key="`tag-${tag.text}`"
            :value="tag.value"
            :to="tag.type === 'tag' ? { name: 'tag-view', params: { name: tag.value } } : undefined"
            @click:close="removeSelection(tag.type, tag.value)"
            color="#f5f5f5"
            close-icon="mdi-close"
            close
          >
            {{ tag.text }}
          </v-chip>
        </v-chip-group>
        <div class="all-courses">
          <template v-if="courses.length">
            <course-card
              v-for="course in courses"
              :key="`course-${course._id}`"
              :course="course"
              :ratable="isCourseRatable(course._id)"
              @rate="showRateCourseDialog"
            />
          </template>
          <template v-else>
            <div class="no-course py-10 text-center">
              <span class="title">There are no courses matching your search.</span>
            </div>
          </template>
        </div>
        <div class="mt-5 d-flex justify-center">
          <course-paginator
            :value="page"
            :length="pages"
            @input="toPage"
            color="#1976d2"
          />
        </div>
      </div>
    </div>

    <v-dialog v-model="rateCourseDialog.show" max-width="500">
      <v-card v-if="rateCourseDialog.show" class="pt-5 px-5">
        <v-card-title class="title d-flex justify-center">
          <span class="text-center">How would you rate this course?</span>
          <span class="text--secondary text-center">{{ rateCourseDialog.course.name }}</span>
        </v-card-title>
        <div class="text-center mb-5">
          <v-rating v-model="rateCourseDialog.rating" color="amber" half-increments hover />
        </div>
        <v-textarea solo validate-on-blur
          v-model="rateCourseDialog.comment"
          :rules="rateCourseDialog.rules"
          placeholder="Your comments about this course..."
        />
        <v-card-actions class="mx-n5">
          <v-spacer />
          <v-btn text @click="rateCourseDialog.show = false">Cancel</v-btn>
          <v-btn text @click="rateCourse" color="primary">Rate</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog.show" max-width="500">
      <v-card v-if="deleteDialog.show" class="pt-5 px-5">
        <v-card-title class="title d-flex justify-center">
          <span class="text-center">Are you sure to delete this Course?</span>
          <span class="text--secondary subtitle-1">{{ deleteDialog.target.name }}</span>
        </v-card-title>
        <v-card-actions class="mx-n5">
          <v-spacer />
          <v-btn text @click="deleteDialog.show = false">Cancel</v-btn>
          <v-btn text @click="deleteCourse(deleteDialog.target._id)" color="error">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CourseCard from '@/components/course-card.vue'
import CoursePaginator from '@/components/paginator.vue'

export default {
  components: { CourseCard, CoursePaginator },
  watch: {
    $route (to, from) {
      this.initFromQuery(to.query)
      this.fetchCourses()
    }
  },
  async created () {
    this.$emit('childBusy')

    this.initFromQuery(this.$route.query)

    await Promise.all([
      this.fetchCourses(),
      this.fetchInProgressCourses(),
      this.fetchTeachingCourses(),
      this.fetchTags()
    ])

    this.coursesHeadline = this.query.content
      ? `All courses related to "${this.query.content}"`
      : 'All courses'

    this.$emit('childReady')
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    user () {
      return this.$store.getters.user
    },
    hasUnfinishedCourses () {
      return this.user.courses.inProgress && this.user.courses.inProgress.length
    },
    selectedOptions () {
      const options = this.coursesMenu.selectedFilters.map(tag => ({ text: tag, type: 'tag', value: tag }))
      if (this.coursesMenu.selectedSorting) {
        options.unshift({
          text: this.coursesMenu.sortings[this.coursesMenu.selectedSorting].description,
          value: this.coursesMenu.selectedSorting,
          type: 'sort'
        })
      }
      if (this.query.content) {
        options.unshift({
          text: `Related to ${this.query.content}`,
          value: this.query.content,
          type: 'search'
        })
      }
      return options
    }
  },
  data: () => ({
    query: {
      content: '',
      rules: [
        v => !!v || 'Enter keywords to perform a search',
        v => (v && v.length >= 3) || 'Enter keywords that are at least 3 characters'
      ]
    },
    rateCourseDialog: {
      show: false,
      course: undefined,
      rating: 0,
      comment: '',
      commentRules: [ v => !!v || 'This field cannot be empty' ]
    },
    coursesMenu: {
      show: false,
      filters: [],
      selectedFilters: [],
      sortings: {
        latest: { description: 'Most recent', icon: 'mdi-history' },
        rating: { description: 'Highest rating', icon: 'mdi-star' },
        popular: { description: 'Most popular', icon: 'mdi-animation-play' }
      },
      selectedSorting: undefined
    },
    coursesHeadline: 'All courses',
    courses: [],
    page: 1,
    pages: 1,
    coursesInProgress: [],
    coursesCreated: [],
    deleteDialog: {
      show: false,
      target: {}
    }
  }),
  methods: {
    initFromQuery ({ search = '', tags = '', sort = '', page = 1 }) {
      this.query.content = search
      this.coursesMenu.selectedFilters = tags ? tags.split(',') : []
      this.coursesMenu.selectedSorting = sort || undefined
      this.page = parseInt(page)
    },
    generateQueryString (nextPage) {
      const queryParams = new URLSearchParams()
      if (this.query.content) queryParams.append('search', this.query.content)
      if (this.coursesMenu.selectedFilters.length) queryParams.append('tags', this.coursesMenu.selectedFilters.join(','))
      if (this.coursesMenu.selectedSorting) queryParams.append('sort', this.coursesMenu.selectedSorting)
      queryParams.append('page', nextPage ? this.page + 1 : 1)
      return queryParams.toString()
    },
    fetchCourses ({ nextPage, queryString } = {}) {
      queryString = queryString || this.generateQueryString(nextPage)
      return new Promise((resolve, reject) => {
        this.$http.get(`courses?${queryString}`)
          .then(({ data: { courses, page, pages } }) => {
            if (page > pages) return
            this.courses = courses
            this.page = parseInt(page)
            this.pages = pages
            const url = location.href.split('?')[0]
            history.pushState('', '', queryString ? `${url}?${queryString}` : url)
          })
          .catch(err => console.log(err))
          .finally(() => resolve())
      })
    },
    fetchInProgressCourses () {
      return new Promise((resolve, reject) => {
        if (!this.isLoggedIn) return resolve()
        this.$http.get('courses/in-progress?size=5')
          .then(({ data: { courses } }) => {
            this.coursesInProgress = courses
          })
          .catch(err => console.log(err))
          .finally(() => resolve())
      })
    },
    fetchTeachingCourses () {
      return new Promise((resolve, reject) => {
        if (!this.isLoggedIn || this.user.type !== 'teacher') return resolve()
        this.$http.get('courses/teaching?size=5')
          .then(({ data: { courses } }) => {
            this.coursesCreated = courses
          })
          .catch(err => console.log(err))
          .finally(() => resolve())
      })
    },
    fetchTags () {
      return new Promise((resolve, reject) => {
        this.$http.get('tags/courses')
          .then(({ data: { tags } }) => {
            this.coursesMenu.filters = tags
          })
          .catch(err => console.log(err))
          .finally(() => resolve())
      })
    },
    async searchCourses () {
      if (!this.$refs['search-form'].validate()) return
      this.resetFilters()

      const queryString = this.generateQueryString()
      await this.fetchCourses({ queryString })

      this.$nextTick(() => this.$vuetify.goTo('#all-courses', {
        duration: 1000,
        easing: 'easeInOutCubic',
        offset: 64
      }))
      this.coursesHeadline = `All courses related to "${this.query.content}"`
    },
    isCourseRatable (id) {
      if (!this.isLoggedIn) return false
      if (this.user.courses.inProgress.includes(id)) return true
      if (this.user.courses.finished.includes(id)) return true
      return false
    },
    async filterCourses () {
      const queryString = this.generateQueryString()
      await this.fetchCourses({ queryString })
    },
    resetFilters () {
      this.coursesMenu = {
        ...this.coursesMenu,
        selectedFilters: [],
        selectedSorting: undefined
      }
    },
    userHasRatedBefore (_courseId) {
      return !!this.user.courses.ratings.find(rating => rating._courseId === _courseId)
    },
    showRateCourseDialog (rating, course, prevRating) {
      this.rateCourseDialog = {
        ...this.rateCourseDialog,
        show: true,
        comment: prevRating ? prevRating.comment : '',
        course,
        rating
      }
    },
    rateCourse () {
      const { course: { _id }, rating: score, comment } = this.rateCourseDialog;
      (
        this.userHasRatedBefore(_id)
          ? this.$http.put(`courses/${_id}/ratings`, { score, comment })
          : this.$http.post(`courses/${_id}/ratings`, { score, comment })
      )
        .then(async ({ status }) => {
          if (status !== 204) throw new Error('Server responded with failure')
          await this.$store.dispatch('fetchUser')
        })
        .catch(err => console.log(err))
        .finally(() => (this.rateCourseDialog.show = false))
    },
    removeSelection (type, value) {
      switch (type) {
        case 'tag':
          this.coursesMenu.selectedFilters = this.coursesMenu.selectedFilters.filter(tag => tag !== value)
          break
        case 'sort':
          this.coursesMenu.selectedSorting = undefined
          break
        case 'search':
          this.query.content = ''
          break
      }
      this.fetchCourses()
    },
    toPage (newPage) {
      if (newPage < 1 || newPage > this.pages || newPage === this.page) return
      this.page = newPage
      this.fetchCourses()
    },
    askDelete (_courseId) {
      this.deleteDialog = {
        show: true,
        target: this.coursesCreated.find(course => course._id === _courseId)
      }
    },
    deleteCourse (_courseId) {
      this.$http.delete(`courses/${_courseId}`)
        .then(() => this.fetchTeachingCourses())
        .catch(err => console.log(err))
        .finally(() => (this.deleteDialog.show = false))
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-search {
    height: calc(40vh - 4rem);
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 500px;
    }
  }

  .course-list {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
  }

  .in-progress-courses,
  .teaching-courses
  {
    overflow-x: auto;
    display: flex;
    & div:first-child {
      margin-left: auto;
    }
    & div:last-child {
      margin-right: auto;
    }
  }

  .all-courses {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .filters {
    width: 100%;
    max-height: 260px;
    overflow-y: auto;
  }

  .new-course-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 100%;
    min-height: 380px;
    max-height: 414px;
  }
</style>
