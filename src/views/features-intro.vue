<template>
  <div>
    <div class="ask-role d-flex align-center justify-center">
      <div class="container d-flex flex-column align-center">
        <span class="display-3 text-center mb-12">I am a...</span>
        <v-select class="select-role" height="60" solo
          :items="roles"
          label="Select Your Role"
          @change="scrollToSection"
        />
      </div>
      <div @click="scrollToSection('teacher')"><span class="scroll-prompt"></span></div>
    </div>
    <div id="teacher">
      <v-parallax
        src="http://kaskertaxation.com.au/wp-content/uploads/2015/05/Fotolia_83992779_Subscription_Monthly_M.jpg"
      >
        <div class="parallax-filter d-flex align-center">
          <div class="container d-flex justify-center">
            <h1 class="display-2 text-center">As a Teacher, What can I do in STEM Portal?</h1>
          </div>
        </div>
      </v-parallax>
      <div class="cards container">
        <feature-card
          icon="mdi-github"
          color="blue darken-2"
          title="Teachers Circle"
          description="You can share your own teaching materials to other counterparts, and download from other friendly teachers. Your contribution will be significant to the community!"
        />
        <feature-card
          icon="mdi-book-open-page-variant"
          color="purple darken-2"
          title="Online Courses"
          description="You can create courses for students. You are free to design your own courses by adding sections, checkpoints or even decorate them with styles!"
        />
        <feature-card
          icon="mdi-forum"
          color="brown darken-2"
          title="Discussion Forum"
          description="You can share your experience with other teachers and parents here. You can also gain inspiration when they leave comments to give you feedbacks!"
        />
      </div>
    </div>
    <div id="student">
      <v-parallax
        src="https://pbs.twimg.com/media/EV-MRogXgAAJRC2.jpg"
      >
        <div class="parallax-filter d-flex align-center">
          <div class="container d-flex justify-center">
            <h1 class="display-2 text-center">As a Student, How can I Learn Better With STEM Portal?</h1>
          </div>
        </div>
      </v-parallax>
      <div class="cards container">
        <feature-card
          icon="mdi-gamepad-variant"
          color="blue darken-2"
          title="STEM Games"
          description="You can learn about STEM topics through playing games! There must be a game that you love to play so much! Time to aim high score and train your brain!"
        />
        <feature-card
          icon="mdi-book-open-page-variant"
          color="purple darken-2"
          title="Online Courses"
          description="You can study online courses that are created by teachers. They are specially designed for you to learn about STEM topics!"
        />
        <feature-card
          icon="mdi-search-web"
          color="brown darken-2"
          title="Explore"
          description="You can explore the world by reading trending technologies around the world and recent news! Try to read more to looking for interesting facts!"
        />
      </div>
    </div>
    <div id="parent">
      <v-parallax
        src="http://www.ldafinance.fr/wp-content/uploads/2016/10/img-page-thumbnail-3.jpg"
      >
        <div class="parallax-filter d-flex align-center">
          <div class="container d-flex justify-center">
            <h1 class="display-2 text-center">As a Parent, How can I Help in STEM Education?</h1>
          </div>
        </div>
      </v-parallax>
      <div class="cards container">
        <feature-card
          icon="mdi-cloud-search"
          color="blue darken-2"
          title="Discover"
          description="You can find out what events will be held in advanced, and plan for your children! You can also read interesting articles that may benefit you and your children!"
        />
        <feature-card
          icon="mdi-home-heart"
          color="purple darken-2"
          title="STEM Parenting"
          description="You can learn with your children, by looking for some science hands-on projects at home! Parents take an important role in STEM education for children!"
        />
        <feature-card
          icon="mdi-forum"
          color="brown darken-2"
          title="Discussion Forum"
          description="You can share your experience on guiding your children with other parents. You may also get some answers from teachers on how to teach your children at home!"
        />
      </div>
    </div>
    <div class="register-cta d-flex flex-column align-center">
      <h1 class="display-2 text-center my-12">And more to come...</h1>
      <div class="mb-12">
        <v-btn @click="$router.push({ name: 'login', query: { action: 'register' } })" color="primary" x-large depressed rounded>
          Register For Free
        </v-btn>
        <span class="title ml-2"> to join STEM Portal now!</span>
      </div>
    </div>
  </div>
</template>

<script>
import featureCard from '@/components/feature-card.vue'

export default {
  components: { featureCard },
  data: () => ({
    roles: ['Teacher', 'Student', 'Parent']
  }),
  methods: {
    scrollToSection (role) {
      this.$vuetify.goTo(`#${role.toLowerCase()}`, {
        duration: 1000,
        easing: 'easeInOutCubic',
        offset: 64
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .ask-role {
    width: 100%;
    min-height: calc(100vh - 4rem);
    position: relative;
  }

  .select-role {
    width: 100%;
    max-width: 500px;
  }

  .cards {
    display: flex;
    justify-content: center;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .parallax-filter {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }

  @media (max-width: 960px) {
    .cards {
      flex-wrap: wrap;
    }
  }

</style>
