<template>
  <div>
    <v-container>
      <v-card min-height="820px" elevation="false">
        <div class="text-center" style ="font-size: 2em">
          Discussion Forum
        </div>
        <v-row>
          <v-col cols="12" md="12">
            <v-container width="100%">
              <v-row no-gutters>
                <!-- Navigation Bar -->
                <v-bottom-navigation grow color="primary" height="70px">
                  <v-col cols="12" md="1">
                    <v-btn>
                      <span>All</span>
                      <v-icon>mdi-home</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-btn v-on:click="Followedpost()">
                      <span>Followed</span>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="1">
                    <div class="text-center">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                          <v-btn v-on="on">
                            <span>Sort By</span>
                            <v-icon>mdi-sort</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item-group mandatory color="indigo">
                            <v-list-item v-for="(item, i) in items" :key="i">
                              <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-menu>
                    </div>
                  </v-col>
                </v-bottom-navigation>
                <!--Floating Buttons-->
                <v-speed-dial
                  class="mr-6 mb-12"
                  v-model="fab"
                  absolute
                  bottom
                  right
                  direction="left"
                  fixed
                  transition="slide-y-reverse-transition"
                >
                  <v-btn
                    border
                    slot="activator"
                    v-model="fab"
                    color="blue darken-2"
                    dark
                    fab
                  >
                    <v-icon v-if="fab">mdi-close</v-icon>
                    <v-icon v-else>mdi-help</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    small
                    color="green"
                    v-on:click="toCreatePost()"
                  >
                    <v-icon>mdi-plus-thick</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    small
                    color="violet"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    small
                    color="red"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-speed-dial>
                <!-- Choose Post Bar -->
                <v-col cols="12" md="4">
                  <v-card min-height="820px" height="100%" width="100%">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="title text-center">Posts</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list dense nav>
                      <v-list-item
                        v-for="(p, i) in posts"
                        :key="i"
                        link
                        v-on:click="CurrentPosts(i)"
                      >
                        <v-list-item-avatar :color="color">
                          <span
                            class="white--text headline pl-3"
                            v-text="p.author.username.slice(0, 1).toUpperCase()"
                          ></span>
                        </v-list-item-avatar>
                        <v-divider vertical></v-divider>
                        <v-list-item-content>
                          <v-list-item-title class="pl-3 caption">
                            <v-row>
                              <span class="pl-3">{{p.author.username}}</span>
                              <span class="pl-2">{{postTime(p.updatedAt)}}</span>
                              <v-spacer></v-spacer>
                              <span>{{Math.abs(p.rating)}}
                                <v-icon v-if="p.rating>=0">mdi-thumb-up-outline</v-icon>
                                <v-icon v-if="p.rating<0">mdi-thumb-down-outline</v-icon>
                              </span>
                              <span class="pl-2 mr-3">{{nComments}}<v-icon>mdi-chat-outline</v-icon></span>
                            </v-row>
                          </v-list-item-title>
                          <v-list-item-subtitle class="pl-3 body-1 bold d-inline-block text-truncate">
                            {{p.title}}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle class="pl-3 caption text-truncate">
                            Tags: {{p.tags.join(', ')}}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
                <!-- Post Details -->
                <v-col cols="12" md="8">
                  <v-container
                    id="scroll-target"
                    style="max-height: 1000px"
                    class="overflow-y-auto"
                  >
                    <v-row
                      v-scroll:#scroll-target="onScroll"
                      align="center"
                      justify="center"
                      no-gutters
                    >
                      <!--Current Post Content-->
                      <v-card width="100%" v-if="posts.length>0">
                        <div>
                          <v-list-item>
                            <v-list-item-avatar color="grey">
                              <span
                                class="white--text headline pl-3"
                                v-text="CurrentPost.author.username.slice(0, 1).toUpperCase()"
                              ></span>
                            </v-list-item-avatar>
                            <v-list-item-content class="ma-3">
                              <v-row>
                                <v-list-item class="headline">{{CurrentPost.title}}</v-list-item>
                                <v-list-item class="overline pl-4"> {{postTime(CurrentPost.createdAt)}}
                                  <!-- <v-btn
                                    text
                                    :color="CurrentPost.notyetfollowed ? 'grey' : 'pink'"
                                    icon
                                    v-on:click="followed(true)"
                                    class="pl-4"
                                  >
                                    <v-icon>mdi-heart</v-icon>
                                  </v-btn> -->
                                  <v-btn v-if="(!CurrentPost.disliked && !CurrentPost.liked) || CurrentPost.disliked" class="pl-2" v-on:click="likePost(true)" icon>
                                    <v-icon>mdi-thumb-up-outline</v-icon>
                                  </v-btn>
                                  <v-btn v-if="(!CurrentPost.disliked && !CurrentPost.liked) || CurrentPost.liked" class="pl-2" v-on:click="dislikepost(true)" icon>
                                    <v-icon>mdi-thumb-down-outline</v-icon>
                                  </v-btn>
                                  <span class="pl-2 mr-3">{{nComments}}<v-icon>mdi-chat-outline</v-icon></span>
                                  <v-spacer></v-spacer>
                                  <v-btn class="mr-3" color="primary" dark @click="dialog=true">Reply Post</v-btn>
                                </v-list-item>
                                <!-- Reply Post Dialog -->
                                <v-dialog v-model="dialog" width="850px" :retain-focus="false">
                                  <v-card width="100%">
                                    <div class="row">
                                      <v-card-title class="indigo--text subtitle-1 ma-6">
                                        #1
                                        <!-- <span class="black--text subtitle-1 pl-6">{{CurrentPost.author.username}}</span> -->
                                      </v-card-title>
                                      <v-card-title class="grey--text caption"> {{postTime(CurrentPost.createdAt)}} </v-card-title>
                                    </div>
                                    <div v-if="CurrentPost.src" class="row">
                                      <v-img
                                        max-width="800"
                                        max-height="350"
                                        min-width="800"
                                        min-height="350"
                                        contain
                                        :src="CurrentPost.src"
                                        eager
                                      ></v-img>
                                    </div>
                                    <v-card-text v-html="CurrentPost.content"></v-card-text>
                                    <v-container>
                                      <template>
                                        <text-editor v-model="comments.content" />
                                      </template>
                                    </v-container>
                                    <v-container class="justify-center d-flex">
                                      <v-card-actions>
                                        <v-btn
                                          color="primary"
                                          dark
                                          @click="addnewcomments(true)"
                                        >Reply</v-btn>
                                        <v-btn color="primary" dark @click="dialog=false">Exit</v-btn>
                                      </v-card-actions>
                                    </v-container>
                                  </v-card>
                                </v-dialog>
                              </v-row>
                            </v-list-item-content>
                          </v-list-item>
                        </div>
                        <v-divider inset></v-divider>
                        <div class="row">
                          <v-card-text class="subtitle-1 ml-3 indigo--text">
                            #1
                            <!-- <span class="pl-4 black--text ">{{CurrentPost.author.username}}</span> -->
                          </v-card-text>
                        </div>
                        <div v-if="CurrentPost.src" class="row">
                          <v-img
                            max-width="800"
                            max-height="500"
                            contain
                            :src="CurrentPost.src"
                            eager
                          ></v-img>
                        </div>
                        <v-row>
                          <span class="pl-8" v-html="CurrentPost.content"></span>
                        </v-row>
                        <v-row>
                          <v-spacer></v-spacer>
                          <span class="caption mr-5" v-if="CurrentPost.createdAt!=CurrentPost.updatedAt"> **Edited At: {{postTime(CurrentPost.updatedAt)}}</span>
                        </v-row>
                      </v-card>
                      <!-- Current Post All Comments -->
                      <v-container pa-0 ma-0>
                        <v-row v-for="(item, i) in allcurrentComments" :key="i" no-gutters>
                          <v-card v-if="i%10 == 0" class="mt-8 mb-8" min-height ="50" width="100%">
                            Choose Pages Bar
                          </v-card>
                          <v-card width="100%">
                            <v-list-item three-line>
                              <v-list-item-content>
                                <v-list-item-title class="subtitle-1 indigo--text">
                                  #{{item.floor}}
                                  <span class="pl-4 black--text">{{item.author.username}}</span>
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                  {{postTime(item.createdAt)}}
                                  <v-btn v-if="!item.disliked" v-on:click="likePost(false, i)" icon fab color="grey">
                                    <v-icon>mdi-thumb-up-outline</v-icon>
                                  </v-btn>
                                  <v-btn v-if="!item.liked" v-on:click="dislikepost(false, i)" icon fab color="grey">
                                    <v-icon>mdi-thumb-down-outline</v-icon>
                                  </v-btn>
                                  <v-btn icon fab color="grey" @click="replycommentdialog=true" v-on:click="replyComments(i, item.content)">
                                    <v-icon>mdi-reply</v-icon>
                                  </v-btn>
                                  <!-- Reply Comment Dialog -->
                                  <v-dialog v-if="parent" v-model="replycommentdialog" :retain-focus="false">
                                    <v-card height="20%">
                                      <v-card outlined>
                                        <v-card-title class="subtitle-1 indigo--text">
                                          # {{parent.floor}}
                                          <!-- <span class="pl-6 black--text">{{parent.author.username}}</span> -->
                                        </v-card-title>
                                        <v-card-subtitle>{{postTime(parent.createdAt)}}</v-card-subtitle>
                                        <div class="black-text pl-4" v-html="parent.content"></div>
                                        <v-row>
                                          <v-spacer></v-spacer>
                                          <span class="caption mr-5" v-if="parent.createdAt!=parent.updatedAt"> **Edited At: {{postTime(parent.updatedAt)}}</span>
                                        </v-row>
                                      </v-card>
                                      <v-container
                                        id="target1"
                                        style="height: 350px"
                                        class="overflow-y-auto"
                                      >
                                        <v-row
                                          v-scroll:#target1="onScroll1"
                                        >
                                          <v-col cols="12" md="12">
                                            <v-row v-for="(replyComment, a) in allreplyComments" :key="a">
                                              <v-card width="100%">
                                                <v-list-item three-line>
                                                  <v-list-item-content>
                                                    <v-list-item-title class="subtitle-1 pl-4">
                                                      <span class="indigo--text"># {{replyComment.floor}} </span>
                                                      <!-- <span class="pl-4">{{replyComment.author.username}}</span> -->
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle class="pl-4 overline">
                                                      {{postTime(replyComment.createdAt)}}
                                                    </v-list-item-subtitle>
                                                    <div class="mt-5 pl-4" v-html="replyComment.content"/>
                                                  </v-list-item-content>
                                                </v-list-item>
                                              </v-card>
                                            </v-row>
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                      <v-container>
                                        <template>
                                          <text-editor v-model="replycomment" />
                                        </template>
                                        <v-container class="justify-center d-flex">
                                          <v-card-actions>
                                            <v-btn
                                              color="primary"
                                              dark
                                              @click="addnewcomments(false)"
                                            >Reply</v-btn>
                                            <v-btn
                                              color="primary"
                                              dark
                                              @click="replycommentdialog=false"
                                            >Exit</v-btn>
                                          </v-card-actions>
                                        </v-container>
                                      </v-container>
                                    </v-card>
                                  </v-dialog>
                                </v-list-item-subtitle>
                                <div v-html="item.content" />
                              </v-list-item-content>
                            </v-list-item>
                            <v-row>
                              <v-spacer></v-spacer>
                              <span class="caption mr-5" v-if="item.createdAt!=item.updatedAt"> **Edited At: {{postTime(item.updatedAt)}}</span>
                            </v-row>
                          </v-card>
                        </v-row>
                      </v-container>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import TextEditor from '@/components/text-editor/TextEditor.vue'
import http from '@/utils/http'

export default {
  created () {
    http.getPosts({ page: 1, size: 10 }).then(({ data }) => {
      this.posts = data.posts
      console.log('a', this.posts)
      if (this.posts) {
        http.getPost(this.posts[0]._id).then(({ data }) => {
          console.log(data)
          this.CurrentPost = data.post
          this.allcurrentComments = data.post.comments
          this.page = 1
          this.nComments = data.post.nComments
          this.maxPages = Math.ceil(data.post.nComments / 10)
        })
      }
    })
  },
  computed: {
  },
  components: { TextEditor },
  data: () => ({
    content: '',
    page: 0,
    maxPages: 1,
    color: 'red',
    fab: false,
    dialog: false,
    replycommentdialog: false,
    isPost: true,
    replycomment: '',
    whichcomment: '',
    icon: 'mdi-arrow-down-bold',
    items: [
      {
        icon: 'mdi-fire',
        text: 'HOT'
      },
      {
        text: 'NEW',
        icon: 'mdi-star'
      }
    ],
    posts: [
    ],
    comments: { content: '' },
    CurrentPost: undefined,
    allcurrentComments: [],
    allreplyComments: [],
    parent: undefined,
    nComments: 0,
    dialogPage: 0,
    rating: 0,
    whichPost: 0
  }),
  methods: {
    CurrentPosts (i) {
      this.whichPost = i
      http.getPost(this.posts[i]._id).then(({ data }) => {
        console.log(data)
        this.CurrentPost = data.post
        this.allcurrentComments = data.post.comments
        this.page = 1
        this.allreplyComments = []
        this.nComments = data.post.nComments
        this.maxPages = data.pages
        this.rating = Math.abs(data.post.nLikes - data.post.nDislikes)
      })
    },
    LoadMoreReplyComments () {
      if ((this.allreplyComments).length >= this.currentreplyCommentRange[1]) {
        this.currentreplyCommentRange = [this.currentreplyCommentRange[0], this.currentreplyCommentRange[1] + 5]
      } else {
        this.currentCommentRange = this.currentCommentRange
      }
    },
    onScroll1 (e1) {
      if (Math.ceil(e1.target.clientHeight + e1.target.scrollTop) >= e1.target.scrollHeight && this.dialogPage < this.dialogPages) {
        console.log('a')
        this.dialogPage += 1
        http.getComments(this.CurrentPost._id, this.dialogPage, this.allcurrentComments[this.whichcomment]._id).then(({ data }) => {
          console.log(data)
          let a = (this.allreplyComments).concat(data.comments)
          this.allreplyComments = a
        })
      }
    },
    onScroll (e) {
      if (Math.ceil(e.target.clientHeight + e.target.scrollTop) >= e.target.scrollHeight && this.page < this.maxPages) {
        this.page += 1
        http.getComments(this.CurrentPost._id, this.page).then(({ data }) => {
          console.log(data)
          let a = (this.allcurrentComments).concat(data.comments)
          this.allcurrentComments = a
        })
      }
    },
    addnewcomments (isPost) {
      var id = this.CurrentPost._id
      if (isPost === false) {
        var reply = this.allcurrentComments[this.whichcomment]._id
        var content = this.replycomment
        http.createComment(id, content, reply).then(({ data }) => {
          if (data.status === 201) {
            this.replycommentdialog = false
            this.allcurrentComments.push(data.comment)
            http.getPost(this.CurrentPost._id).then(({ data }) => {
              this.nComments = data.post.nComments
            }).catch(err => {
              console.log(err)
              this.errDialog = true
            })
          }
        }).catch(err => {
          console.log(err)
          this.errorDialog = true
        })
      } else {
        http.createComment(id, this.comments.content).then(({ data }) => {
          if (data.status === 201) {
            this.allcurrentComments.push(data.comment)
            this.dialog = false
            http.getPost(this.CurrentPost._id).then(({ data }) => {
              this.nComments = data.post.nComments
            }).catch(err => {
              console.log(err)
              this.errDialog = true
            })
          }
        }).catch(err => {
          console.log(err)
          this.errorDialog = true
        })
      }
    },
    replyComments (i, comment) {
      this.content = comment
      this.whichcomment = i
      const reply = this.allcurrentComments[this.whichcomment]._id
      http.getComments(this.CurrentPost._id, null, reply).then(({ data }) => {
        if (data.status === 200) {
          console.log(data)
          this.parent = data.parent
          this.allreplyComments = data.comments
          this.dialogPage = data.page
          this.dialogPages = data.pages
        }
      }).catch(err => {
        console.log(err)
        this.errorDialog = true
      })
    },
    toCreatePost () {
      this.$router.push({ name: 'createpost' })
    },
    likePost (isPost, i = null) {
      if (isPost === true) {
        this.CurrentPost.liked = true
        this.CurrentPost.disliked = false
        http.reactPost(this.CurrentPost._id, this.CurrentPost.liked, this.CurrentPost.disliked).then(({ data }) => {
          this.posts[this.whichPost].rating += 1
          console.log(this.posts[this.whichPost].rating)
          console.log('liked post')
        })
      } else {
        if (this.allcurrentComments[i].liked === true) {
          this.allcurrentComments[i].liked = false
        } else {
          this.allcurrentComments[i].liked = true
        }
      }
    },
    dislikepost (isPost, i = null) {
      if (isPost === true) {
        this.CurrentPost.disliked = true
        this.CurrentPost.liked = false
        http.reactPost(this.CurrentPost._id, this.CurrentPost.liked, this.CurrentPost.disliked).then(({ data }) => {
          this.posts[this.whichPost].rating -= 1
          console.log('disliked post')
        })
      } else {
        if (this.allcurrentComments[i].disliked === true) {
          this.allcurrentComments[i].disliked = false
        } else {
          this.allcurrentComments[i].disliked = true
        }
      }
    },
    postTime (createdAt) {
      var currentTime = Date.now()
      var postTime = new Date(createdAt)
      var diffDay = (currentTime - postTime.getTime()) / (1000 * 3600 * 24)
      var diffHour = (currentTime - postTime.getTime()) / (1000 * 3600)
      var day = 0
      var month = 0
      var year = 0
      if (diffHour < 1) {
        var diffmin = diffHour * 60
        if (diffmin < 1.5) {
          postTime = String(Math.round(diffmin)) + ' Min Ago'
        } else {
          postTime = String(Math.round(diffmin)) + ' Mins Ago'
        }
      } else if (diffHour >= 1 && diffHour <= 23) {
        postTime = String(Math.round(diffHour)) + ' Hours Ago'
      } else if (diffDay >= 1 && diffDay < 30) {
        if (diffDay < 1.5) {
          postTime = String(Math.round(diffDay)) + ' Day Ago'
        } else {
          postTime = String(Math.round(diffDay)) + ' Days Ago'
        }
      } else if (diffDay >= 30 && diffDay <= 365) {
        month = postTime.getUTCMonth() + 1
        day = postTime.getUTCDate()
        postTime = String(month) + '/' + String(day)
      } else if (diffDay >= 366) {
        year = postTime.getUTCFullYear()
        month = postTime.getUTCMonth() + 1
        day = postTime.getUTCDate()
        postTime = String(year) + '/' + String(month) + '/' + String(day)
      }
      return postTime
    }
  }
}
</script>
