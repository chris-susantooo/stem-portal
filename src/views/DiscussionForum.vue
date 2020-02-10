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
                        v-for="(post, i) in posts"
                        :key="i"
                        link
                        v-on:click="CurrentPosts(i)"
                      >
                        <v-list-item-avatar :color="color">
                          <span
                            class="white--text headline pl-3"
                            v-text="post.author.username.slice(0, 1).toUpperCase()"
                          ></span>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="title d-inline-block text-truncate">
                            {{post.title}}
                          </v-list-item-title>
                          <v-list-item-title class="body-1">
                            {{post.author.username}}
                            <span class="body-2 subtitle-3 pl-4 ">{{postTime(post.createdAt)}}</span>
                          </v-list-item-title>
                          <v-list-item-subtitle class="body-1 pt-2 text-truncate">
                            {{post.tags.join(', ')}}
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
                                <v-list-item class="headline">Title: {{CurrentPost.title}}</v-list-item>
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
                                  <v-btn class="pl-2" v-on:click="likepost(true)" icon>
                                    <v-icon>mdi-thumb-up-outline</v-icon>
                                  </v-btn>
                                  <v-btn class="pl-2" v-on:click="dislikepost(true)" icon>
                                    <v-icon>mdi-thumb-down-outline</v-icon>
                                  </v-btn>
                                  <v-spacer></v-spacer>
                                  <v-btn class="mr-3" color="primary" dark @click="dialog=true">Reply Post</v-btn>
                                </v-list-item>
                                <!-- Reply Post Dialog -->
                                <v-dialog v-model="dialog" width="850px" :retain-focus="false">
                                  <v-card width="100%">
                                    <div class="row">
                                      <v-card-title class="indigo--text subtitle-1 ma-6">
                                        #1
                                        <span class="black--text subtitle-1 pl-6">{{CurrentPost.author.username}}</span>
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
                            <span class="pl-4 black--text ">{{CurrentPost.author.username}}</span>
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
                                <v-list-item-title class="subtitle-1">
                                  <span>#{{i+2}} </span>
                                  <span class="pl-4">{{item.author.username}}</span>
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                  <span>{{postTime(item.createdAt)}}</span>
                                  <v-btn v-if="!item.disliked" v-on:click="likepost(false, i)" icon fab color="grey">
                                    <v-icon>mdi-thumb-up-outline</v-icon>
                                  </v-btn>
                                  <v-btn v-if="!item.liked" v-on:click="dislikepost(false, i)" icon fab color="grey">
                                    <v-icon>mdi-thumb-down-outline</v-icon>
                                  </v-btn>
                                  <v-btn icon fab color="grey" @click="replycommentdialog=true" v-on:click="showwhichcomment(i)">
                                    <v-icon>mdi-reply</v-icon>
                                  </v-btn>
                                  <!-- Reply Comment Dialog -->
                                  <v-dialog v-model="replycommentdialog" :retain-focus="false">
                                    <v-card width="100%" height="100%">
                                      <v-row>
                                        <v-card-title class="subtitle-1 ma-6">
                                          Post #{{whichcomment+1}}
                                          <span class="subtitle-1 pl-6">Author Name</span>
                                        </v-card-title>
                                        <v-card-title class="subtitle-1">{{item.date}}</v-card-title>
                                      </v-row>
                                      <v-row>
                                        <v-spacer></v-spacer>
                                        <v-col cols="12" md="10">
                                          <v-card-text v-html="item.comment"></v-card-text>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                      </v-row>
                                      <v-row v-for="(allreplycomment, a) in allreplyComments" :key="a">
                                        <v-card width = "100%" >
                                          <v-row no-gutters>
                                            <v-col cols="8">
                                              <v-card-subtitle class="subtitle-1 ma-6">
                                                Post #{{allreplycomment.cid}} Author Name
                                                <span class="subtitle-1 pl-2">{{allreplycomment.date}}</span>
                                              </v-card-subtitle>
                                            </v-col>
                                            <v-spacer></v-spacer>
                                          </v-row>
                                          <v-row>
                                            <v-spacer></v-spacer>
                                            <v-col cols="12" md="10">
                                              <v-card-text v-html="allreplycomment.comment"> </v-card-text>
                                            </v-col>
                                            <v-spacer></v-spacer>
                                          </v-row>
                                        </v-card>
                                      </v-row>
                                      <v-container>
                                        <template>
                                          <text-editor v-model="replycomment" />
                                        </template>
                                      </v-container>
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
      if (this.posts) {
        http.getPost(this.posts[0]._id).then(({ data }) => {
          console.log(data)
          this.CurrentPost = data.post
          this.allcurrentComments = data.post.comments
          this.page = 1
          this.maxPages = Math.ceil(data.post.nComments / 10)
        })
      }
    })
  },
  computed: {
    allreplyComments () {
      let replycomments = []
      if (this.CurrentPost && this.CurrentPost.Allcomments) {
        if (this.CurrentPost.Allcomments[this.whichcomment]) {
          for (let j = 0; j < (this.CurrentPost.Allcomments).length; j++) {
            if (this.CurrentPost.Allcomments[j].replyto === (this.CurrentPost.Allcomments[this.whichcomment].cid - 1)) {
              const replyid = replycomments.length
              let replycomment = {
                date: this.CurrentPost.Allcomments[j].date,
                cid: this.CurrentPost.Allcomments[j].cid,
                comment: this.CurrentPost.Allcomments[j].comment,
                replyid: replyid
              }
              replycomments.push(replycomment)
            }
          }
        }
      }
      if (replycomments) {
        return replycomments.filter(({ replyid }) => {
          return replyid >= this.currentreplyCommentRange[0] && replyid <= this.currentreplyCommentRange[1]
        })
      } else {
        return []
      }
    }
  },
  components: { TextEditor },
  data: () => ({
    page: 0,
    maxPages: 1,
    color: 'red',
    fab: false,
    dialog: false,
    replycommentdialog: false,
    isPost: true,
    replycomment: '',
    whichcomment: '',
    currentreplyCommentRange: [0, 4],
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
      {
        title: '',
        author: '',
        content: '',
        tags: [],
        createdAt: '',
        cid: 0,
        likes: 0,
        dislikes: 0,
        Allcomments: [],
        liked: false,
        disliked: false,
        notyetfollowed: true
      }
    ],
    comments: { content: '' },
    CurrentPost: [],
    allcurrentComments: []
  }),
  methods: {
    CurrentPosts (i) {
      http.getPost(this.posts[i]._id).then(({ data }) => {
        this.CurrentPost = data.post
      })
    },
    LoadMoreReplyComments () {
      if ((this.allreplyComments).length >= this.currentreplyCommentRange[1]) {
        this.currentreplyCommentRange = [this.currentreplyCommentRange[0], this.currentreplyCommentRange[1] + 5]
      } else {
        this.currentCommentRange = this.currentCommentRange
      }
    },
    onScroll (e) {
      if (e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight && this.page < this.maxPages) {
        this.page += 1
        http.getComments(this.CurrentPost._id, this.page).then(({ data }) => {
          let a = (this.allcurrentComments).concat(data.comments)
          this.allcurrentComments = a
        })
      }
    },
    addnewcomments (isPost) {
      if (isPost === false) {
        const cid = (this.CurrentPost.Allcomments).length + 1
        const newreplycomment = this.replycomment
        const replytowhichcomment = this.whichcomment
        let a1 =
        {
          cid: cid,
          comment: newreplycomment,
          replyto: replytowhichcomment,
          liked: false,
          disliked: false,
          notyetfollowed: true
        }
        this.CurrentPost.Allcomments.push(a1)
        this.replycommentdialog = false
      } else {
        console.log(this.comments.content)
        http.createComment(this.CurrentPost._id, this.comments.content).then(({ status, comment }) => {
          if (status === 201) {
            this.dialog = false
            this.comments.content = ''
          }
        }).catch(err => {
          console.log(err)
          this.errorDialog = true
        })
      }
    },
    showwhichcomment (i) {
      this.whichcomment = i
    },
    toCreatePost () {
      this.$router.push({ name: 'createpost' })
    },
    likepost (isPost, i = null) {
      if (isPost === true) {
        if (this.CurrentPost.liked === true) {
          this.CurrentPost.liked = false
          this.CurrentPost.likes = this.CurrentPost.likes - 1
        } else {
          this.CurrentPost.likes = this.CurrentPost.likes + 1
          this.CurrentPost.liked = true
        }
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
        if (this.CurrentPost.disliked === true) {
          this.CurrentPost.dislikes = this.CurrentPost.dislikes - 1
          this.CurrentPost.disliked = false
        } else {
          this.CurrentPost.dislikes = this.CurrentPost.dislikes + 1
          this.CurrentPost.disliked = true
        }
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
        postTime = String(Math.round(diffmin)) + ' Mins Ago'
      } else if (diffHour >= 1 && diffHour <= 23) {
        postTime = String(Math.round(diffHour)) + ' Hours Ago'
      } else if (diffDay >= 1 && diffDay < 30) {
        if (diffDay === 1) {
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
    },
    clearInput (comment) {
      comment = ''
    }
  }
}
</script>
