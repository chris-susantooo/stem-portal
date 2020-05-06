<template>
  <div v-if="isCourseValid" class="content-display">
    <div v-if="page.type === 'info'" class="mt-5 container text-center">
      <h1>{{ course.name }}</h1>
      <div class="row justify-center align-center mt-1">
        <router-link :to="{ name: 'profile', params: { username: course.author.username } }" class="mt-1">
          <v-avatar size="36" :color="course.author.avatar ? 'transparent' : 'primary'">
            <v-img v-if="course.author.avatar" :src="course.author.avatar" />
            <span v-else class="white--text">{{ course.author.firstName[0] + course.author.lastName[0] }}</span>
          </v-avatar>
          <span class="ml-2">{{ course.author.username }}</span>
        </router-link>
        <v-rating dense half-increments hover
          :key="`rating-${refreshRating}`"
          :readonly="!ratable"
          :value="ratingForDisplay"
          @input="askRateCourse"
          color="amber"
          size="25"
          class="ml-3"
        />
        <div class="grey--text ml-2">{{ ratingDescription }}</div>
      </div>
      <div class="d-flex flex-column justify-center align-center flex-grow-1 container">
        <div class="mt-12"></div>
        <span class="headline my-3">About this course</span>
        <div class="container"><p>{{ course.description }}</p></div>
        <div class="d-flex justify-center mt-10">
          <v-chip-group active-class="primary--text">
            <v-chip v-for="tag in course.tags" :key="tag" :to="{ name: 'tag-view', params: { name: tag } }">
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </div>
      </div>
    </div>

    <div v-if="isSectionSelected">
      <div class="video-background">
        <div class="video-wrapper d-flex ml-auto mr-auto">
          <youtube fitParent resize ref="youtube"
            :video-id="videoId"
            :player-vars="{ autoplay: 1 }"
            @ended="$emit('complete')"
          />
        </div>
      </div>
      <div class="container pa-5">
        <h1 class="text-center mb-5">{{ `Chapter ${page.chapterIndex + 1}: ${chapter.title}` }}</h1>
        <h2 class="title">{{ `Section ${page.sectionIndex + 1}: ${section.title}` }}</h2>
        <div v-html="section.content.text" class="mt-5 mb-3" />
        <attachment-list :files="section.content.attachments" />
      </div>
    </div>

    <div v-if="isCheckpointSelected" class="container pa-5">
      <h1 class="text-center mb-5">{{ `Chapter ${page.chapterIndex + 1}: ${chapter.title}` }}</h1>
      <h2 class="title">{{ `Checkpoint: ${section.title}` }}</h2>
      <div v-html="section.content.text" class="my-5" />

      <div class="checkpoint">
        <h2 class="title mb-5">{{ section.content.questions.length }} Questions Attemptable</h2>
        <p><b>One or more</b> options can be selected. Click <b>Check Answers</b> when you have attempted all checkpoint questions. Good luck!</p>
        <div class="questions mt-5">
          <div class="question" v-for="(question, qi) in section.content.questions" :key="'q' + qi">
            <div class="row px-3 my-2 py-4">
              <span class="mr-2">{{ qi + 1 }}. {{ question.title }}</span>
              <v-icon v-if="checkpointFeedback.length" :color="checkpointFeedback[qi].correct ? 'teal' : 'error'">
                {{ checkpointFeedback[qi].correct ? 'mdi-check': 'mdi-close' }}
              </v-icon>
            </div>
            <v-row align="center" class="option pl-8 my-n5" v-for="(option, oi) in question.options" :key="'o' + oi">
              <v-checkbox v-model="checkpointUserAnswers" :value="`${qi}-${optionToAlphabet(oi)}`" color="primary"/>
              <span :class="checkpointFeedback[qi] ? checkpointFeedback[qi].options[oi] : {}">
                {{ `${optionToAlphabet(oi)}. ${option.title}` }}
              </span>
            </v-row>
          </div>
        </div>
        <div class="my-5 d-flex justify-center">
          <v-btn large rounded depressed text
            color="primary"
            @click="checkAnswers"
          >
            Check Answers
          </v-btn>
        </div>
      </div>
    </div>

    <v-dialog v-model="rateCourseDialog.show" max-width="500">
      <v-card v-if="rateCourseDialog.show" class="pt-5 px-5">
        <v-card-title class="title d-flex justify-center">
          <span class="text-center">How would you rate this course?</span>
          <span class="text--secondary text-center">{{ course.name }}</span>
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

    <v-dialog v-model="checkpointFeedbackDialog.show" max-width="500">
      <v-card v-if="checkpointFeedbackDialog.show" class="pt-5 px-5">
        <v-card-title class="title d-flex justify-center">
          <span class="text-center">{{ checkpointFeedbackDialog.title }}</span>
        </v-card-title>
        <v-card-text>
          <span class="mt-2 text--secondary">{{ checkpointFeedbackDialog.message }}</span>
        </v-card-text>
        <v-card-actions class="mt-n2 mx-n5">
          <v-spacer />
          <v-btn text color="primary" @click="checkpointFeedbackDialog.show = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import AttachmentList from '@/components/attachment-list.vue'

export default {
  components: { AttachmentList },
  props: {
    course: {
      type: Object,
      required: true
    },
    page: {
      type: Object,
      required: true
    },
    progress: {
      type: Object,
      required: true
    }
  },
  watch: {
    page () {
      this.checkpointUserAnswers = []
      this.checkpointFeedback = []
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    isPreview () {
      return this.$route.name === 'course-preview'
    },
    isCourseValid () {
      return !!this.course._id
    },
    ratable () {
      if (!this.isLoggedIn) return false
      const course = this.user.courses.inProgress
        .find(({ _courseId }) => this.course._id === _courseId)
      return course && !this.isPreview && !this.isAuthor
    },
    ratingByUser () {
      if (!this.isLoggedIn) return 0
      return this.user.courses.ratings
        .find(rating => rating._courseId === this.course._id)
    },
    ratingForDisplay () {
      const userRating = this.ratingByUser
      return userRating ? userRating.score : this.course.rating
    },
    ratingDescription () {
      const userRating = this.ratingByUser
      if (userRating) return `You rated ${userRating.score.toFixed(1)} stars`
      return this.course.nRatings
        ? this.course.rating.toFixed(1) + ' stars (' + this.course.nRatings + ')'
        : 'No ratings yet'
    },
    isAuthor () {
      return this.user._id === this.course.author._id && this.user.type === 'teacher'
    },
    isSectionSelected () {
      return this.page.type === 'content' &&
        this.section.type === 'Section'
    },
    isCheckpointSelected () {
      return this.page.type === 'content' &&
        this.section.type === 'Checkpoint'
    },
    chapter () {
      if (this.page.type === 'info') return {}
      return this.course.chapters[this.page.chapterIndex]
    },
    section () {
      if (this.page.type === 'info') return {}
      return this.chapter.sections[this.page.sectionIndex]
    },
    videoId () {
      if (!this.isSectionSelected) return ''
      const video = this.section.content.video
      if (video.includes('http')) return video.split('=')[1]
      return video
    }
  },
  data: () => ({
    refreshRating: false,
    checkpointUserAnswers: [],
    checkpointFeedback: [],
    rateCourseDialog: {
      show: false,
      rating: 0,
      comment: '',
      commentRules: [ v => !!v || 'This field cannot be empty' ]
    },
    checkpointFeedbackDialog: {
      show: false,
      title: '',
      message: ''
    }
  }),
  methods: {
    askRateCourse (rating) {
      this.refreshRating = !this.refreshRating
      this.rateCourseDialog = {
        ...this.rateCourseDialog,
        show: true,
        comment: this.ratingByUser ? this.ratingByUser.comment : '',
        rating
      }
    },
    rateCourse () {
      const { rating: score, comment } = this.rateCourseDialog;
      (
        this.ratingByUser
          ? this.$http.put(`courses/${this.course._id}/ratings`, { score, comment })
          : this.$http.post(`courses/${this.course._id}/ratings`, { score, comment })
      )
        .then(async ({ status }) => {
          if (status !== 204) throw new Error('Server responded with failure')
          await this.$store.dispatch('fetchUser')
        })
        .catch(err => console.log(err))
        .finally(() => (this.rateCourseDialog.show = false))
    },
    optionToAlphabet (index) {
      return String.fromCharCode('A'.charCodeAt(0) + index)
    },
    checkAnswers () {
      const userAnswers = this.checkpointUserAnswers
        .reduce((acc, answerStr) => {
          let [questionIndex, answer] = answerStr.split('-')
          questionIndex = parseInt(questionIndex)
          acc[questionIndex]
            ? acc[questionIndex].push(answer)
            : acc[questionIndex] = [answer]
          return acc
        }, {})

      if (Object.keys(userAnswers).length !== this.section.content.questions.length) {
        this.checkpointFeedbackDialog = {
          show: true,
          title: 'Please attempt all questions...',
          message: 'Feel free to go back and rewatch some videos if you struggle to find an answer.'
        }
        return
      }

      this.checkpointFeedback = this.section.content.questions.map((question, qi) => ({
        correct: !_.xor(question.answers, userAnswers[qi]).length,
        options: question.options.map((_, oi) => {
          const alphabet = this.optionToAlphabet(oi)
          const inUser = userAnswers[qi].includes(alphabet)
          const inAnswer = question.answers.includes(alphabet)

          return {
            'error--text': inUser && !inAnswer,
            'teal--text': inAnswer
          }
        })
      }))

      const correctCount = this.checkpointFeedback.reduce((acc, { correct }) => correct ? acc + 1 : acc, 0)
      const score = Math.round(correctCount / this.checkpointFeedback.length * 100)

      this.checkpointFeedbackDialog = {
        show: true,
        title: score === 100 ? 'Congratulations!' : 'Well done!',
        message: score === 100
          ? 'You got full marks! Keep it up in the next chapters!'
          : `You scored ${score} marks! Feel free to revisit the answers.`
      }

      if (score === 100) {
        this.$emit('complete')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-display {
    flex-grow: 1;
    overflow-y: auto;
    height: calc(100vh - 4rem);
  }

  .video-background {
    width: 100%;
    background: #1f1f1f;
  }

  .video-wrapper {
    max-width: 1024px;
  }

  @media (max-width: 600px) {
    .content-display {
      overflow-y: unset;
    }
  }
</style>
