<template>
  <div class="container">
    <div class="row">
      <h3>Create New Course</h3>
    </div>
    <br>
    <form>
      <v-text-field
        v-model="title"
        label="Course title"
        required
      ></v-text-field>
      <v-textarea
        v-model="description"
        label="Short description"
        required
      ></v-textarea>
    </form>
    <div v-for="(section, index) in sections" :key="'s' + index">
      <div class="row">
        <h3>Section {{ index + 1 }}</h3>
      </div>
      <form>
        <v-select
          :items="types"
          v-model="sections[index].type"
          label="type"
          required
          :change="addProp(index)"
        ></v-select>
        <template v-if="sections[index].type==='section'">
          <v-text-field
            v-model="sections[index].detail.heading"
            label="Heading"
            required
          ></v-text-field>
          <v-textarea
            v-model="sections[index].detail.introduction"
            label="Indroduction"
            required
          ></v-textarea>
          <v-textarea
            v-model="sections[index].detail.content"
            label="Content"
            required
          ></v-textarea>
        </template>
        <template v-if="sections[index].type==='quiz'">
          <!-- <div v-for="(question, j) in sections[index].detail.questions" :key="'s' + index + 'q' + j">
            <p>Question {{ j + 1 }}</p>
            <v-text-field
              v-model="sections[index].detail.questions[j].question"
              label="Question"
              required
            ></v-text-field> -->
            <!-- <v-radio-group v-model="sections[index].detail.questions[j].answer">
              <div v-for="(n, i) in ['A', 'B', 'C', 'D']" :key="'s' + index + 'q' + j + 'o' + n">
                <div class="row">
                  <v-radio :value="n"></v-radio>
                  <v-text-field
                    v-model="sections[index].detail.questions[j].options[i]"
                    :label="`Option ${n}`"
                    required
                  ></v-text-field>
                </div>
              </div>
            </v-radio-group>
          </div> -->
          <v-btn @click="addQuestion" text color="indigo">
            Add new question
          </v-btn>
        </template>
      </form>
    </div>
    <v-btn @click="addSection" text color="indigo">
      Add new section
    </v-btn>
  </div>
</template>

<script>

export default {
  data: () => ({
    title: '',
    description: '',
    sections: [{
      type: ''
    }],
    types: ['section', 'quiz']
  }),
  methods: {
    addSection () {
      this.sections.push({
        type: '',
        detail: {}
      })
    },
    addProp (index) {
      if (this.sections[index].type === 'section') {
        this.sections[index].detail = {
          heading: '',
          introduction: '',
          content: ''
        }
      } else if (this.sections[index].type === 'quiz') {
        this.sections[index].detail = {
          questions: [{
            question: '',
            options: ['', '', '', ''],
            answer: ''
          }]
        }
      }
    },
    addQuestion () {
      const index = this.sections.length - 1
      this.sections[index].detail.questions.push({
        question: '',
        options: ['', '', '', ''],
        answer: ''
      })
    }
  }
}
</script>
