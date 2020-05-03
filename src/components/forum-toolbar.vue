<template>
  <div class="d-flex justify-center">
    <v-row>
      <v-menu
        v-model="postsMenu.show"
        :close-on-content-click="false"
        min-width="300"
        transition="slide-y-transition"
        nudge-bottom="10"
        offset-y
        left
      >
        <template v-slot:activator="{ on }">
          <v-btn class="no-text-transform mb-5" v-on="on" rounded depressed large>
            <v-icon size="16">{{ postsMenu.show ? 'mdi-filter-remove' : 'mdi-filter-menu' }}</v-icon>
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
                v-model="postsMenu.selectedFilters"
                @change="updatePostList"
                multiple
              >
                <v-list-item
                  v-for="tag in postsMenu.filters"
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
                        <span class="float-right subtitle-2 text--secondary">{{ tag.postReferences }}</span>
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
                v-model="postsMenu.selectedSorting"
                @change="updatePostList"
                color="primary"
              >
                <v-list-item
                  v-for="(item, sorting) in postsMenu.sortings"
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
      <v-btn large icon @click="$emit('home')" class="mx-2">
        <v-icon color="#ea9085">mdi-home</v-icon>
      </v-btn>
      <v-btn large icon @click="createPost()" class="mx-2">
        <v-icon color="#5C6BC0">mdi-chat</v-icon>
      </v-btn>
    </v-row>
    <v-row>
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
    </v-row>
  </div>
</template>

<script>
export default {
  watch: {
    $route (to, from) {
      this.initFromQuery(to.query)
    }
  },
  async created () {
    this.$emit('childBusy')

    this.initFromQuery(this.$route.query)

    await Promise.all([
      this.fetchTags()
    ])

    this.$emit('childReady')
  },
  computed: {
    selectedOptions () {
      const options = this.postsMenu.selectedFilters.map(tag => ({ text: tag, type: 'tag', value: tag }))
      if (this.postsMenu.selectedSorting) {
        options.unshift({
          text: this.postsMenu.sortings[this.postsMenu.selectedSorting].description,
          value: this.postsMenu.selectedSorting,
          type: 'sort'
        })
      }
      return options
    }
  },
  data: () => ({
    postsMenu: {
      show: false,
      filters: [],
      selectedFilters: [],
      sortings: {
        latest: { description: 'Most recent', icon: 'mdi-history' },
        rating: { description: 'Highest rating', icon: 'mdi-star' },
        popular: { description: 'Most popular', icon: 'mdi-animation-play' }
      },
      selectedSorting: undefined
    }
  }),
  methods: {
    initFromQuery ({ tags = '', sort = '' }) {
      this.postsMenu.selectedFilters = tags ? tags.split(',') : []
      this.postsMenu.selectedSorting = sort || undefined
    },
    generateQueryString () {
      const queryParams = {}
      if (this.postsMenu.selectedFilters.length) queryParams[0] = (this.postsMenu.selectedFilters)
      if (this.postsMenu.selectedSorting) queryParams[1] = this.postsMenu.selectedSorting
      return queryParams
    },
    updatePostList () {
      this.$emit('update-post-list', this.generateQueryString())
    },
    resetFilters () {
      this.postsMenu = {
        ...this.postsMenu,
        selectedFilters: [],
        selectedSorting: undefined
      }
    },
    fetchTags () {
      return new Promise((resolve, reject) => {
        this.$http.get('tags/posts')
          .then(({ data: { tags } }) => {
            this.postsMenu.filters = tags
          })
          .catch(err => console.log(err))
          .finally(() => resolve())
      })
    },
    removeSelection (type, value) {
      switch (type) {
        case 'tag':
          this.postsMenu.selectedFilters = this.postsMenu.selectedFilters.filter(tag => tag !== value)
          break
        case 'sort':
          this.postsMenu.selectedSorting = undefined
          break
      }
      this.updatePostList()
    },
    createPost () {
      if (this.$store.getters.user) this.$router.push({ name: 'login' })
      else this.$router.push({ name: 'forum-new-post' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .filters {
    width: 100%;
    max-height: 260px;
    overflow-y: auto;
  }
</style>
