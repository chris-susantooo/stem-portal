<template>
  <div>
    <v-container>
      <!-- <v-card elevation="false">
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3">
            <v-card-title style="font-size: 2em">Top Posts</v-card-title>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col v-for="(item, i) in Trending_Today_card_items" :key="i" cols="12" md="3">
            <v-card class="mx-auto">
              <v-list-item >
                <v-list-item-avatar :color ="item.color">
                  <span class="white--text headline text-center" v-text ="item.text"></span>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline" v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.author"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-img :src="item.src" height="194"></v-img>
              <v-card-text>
                <span v-text="item.para"></span>
              </v-card-text >
              <v-card-actions>
              <v-btn text color="primary accent-4">
                Read
              </v-btn>
              <v-btn text color="primary accent-4">
                Bookmark
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card>-->
      <v-card min-height="820px" elevation="false">
        <div class="text-center" style ="font-size: 2em">
          Discussion Forum
        </div>
        <v-row>
          <v-col cols="12" md="12">
            <v-container width="100%" class="pa-0 ma-0">
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
                <!-- Choose Post Bar -->
                <v-col cols="12" md="3">
                  <v-card min-height="820px" height="100%" width="100%">
                    <v-list-item>
                      <v-btn
                        color="pink"
                        dark
                        small
                        absolute
                        left
                        fab
                        v-on:click="toCreatePost"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                      <v-list-item-content>
                        <v-list-item-title class="title text-center">Posts</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list dense nav>
                      <v-list-item
                        v-for="(item, i) in posts"
                        :key="i"
                        link
                        v-on:click="CurrentPosts(i)"
                      >
                        <v-list-item-avatar :color="color">
                          <span
                            class="white--text headline pl-3"
                            v-text="item.author.slice(0, 1).toUpperCase()"
                          ></span>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-subtitle>
                            {{item.author}}
                            <span class="pl-6">{{(String(item.createdAt)).substring(0,10)}}</span>
                            <span class="pl-2"> {{(String(item.createdAt)).substring(11,19)}}</span>
                          </v-list-item-subtitle>
                          <v-row>
                            <v-col cols="12" md="6" class="d-inline-block text-truncate">Title: {{item.title}}</v-col>
                            <v-col cols="12" md="6" class="d-inline-block text-truncate">Tags: {{item.tags[0]}}</v-col>
                          </v-row>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
                <!-- Post Details -->
                <v-col cols="12" md="9">
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
                      <v-card width="100%" v-if="posts.length>0">
                        <div>
                          <v-list-item>
                            <v-list-item-avatar color="grey"></v-list-item-avatar>
                            <v-list-item-content class="pa-3">
                              <v-row>
                                <v-list-item-title class="headline">Title: {{CurrentPost.title}}</v-list-item-title>
                                <v-btn
                                  text
                                  :color="CurrentPost.notyetfollowed ? 'grey' : 'pink'"
                                  icon
                                  v-on:click="followed(true)"
                                >
                                  <v-icon>mdi-heart</v-icon>
                                </v-btn>
                                <v-btn v-if="!CurrentPost.disliked" v-on:click="likepost(true)" icon>
                                  <v-icon>mdi-thumb-up-outline</v-icon>
                                </v-btn>
                                <v-btn v-if="!CurrentPost.liked" v-on:click="dislikepost(true)" icon>
                                  <v-icon>mdi-thumb-down-outline</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" dark @click="dialog=true">Make Comment</v-btn>
                                <!-- Reply Post Dialog -->
                                <v-dialog v-model="dialog" width="850px" :retain-focus="false">
                                  <v-row>
                                    <v-card width="100%">
                                      <div class="row">
                                        <v-card-title class="subtitle-1 ma-6">
                                          Post #{{CurrentPost.cid}}
                                          <span class="subtitle-1 pl-6">{{CurrentPost.author}}</span>
                                          <span class="subtitle-1 pl-2"></span>
                                        </v-card-title>
                                        <v-card-title class="subtitle-1">{{(String(CurrentPost.createdAt)).substring(0,10)}} <span class="pl-2"> {{(String(CurrentPost.createdAt)).substring(11,19)}}</span> </v-card-title>
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
                                      <v-row>
                                        <v-spacer></v-spacer>
                                        <v-col cols="12" md="10" v-html="CurrentPost.content"></v-col>
                                        <v-spacer></v-spacer>
                                      </v-row>
                                      <v-container>
                                        <template>
                                          <text-editor v-model="comment" />
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
                                  </v-row>
                                </v-dialog>
                              </v-row>
                              <p>
                                by {{CurrentPost.author}}
                              </p>
                            </v-list-item-content>
                          </v-list-item>
                        </div>
                      </v-card>
                      <!-- Current Post -->
                      <v-card width="100%" v-if="posts.length>0">
                        <div class="row">
                          <v-card-title class="subtitle-1">
                            Post #{{CurrentPost.cid}}
                            <span class="subtitle-1 pl-6">{{CurrentPost.author}}</span>
                          </v-card-title>
                          <v-card-title class="subtitle-1">{{(String(CurrentPost.createdAt)).substring(0,10)}} <span class="pl-2">{{(String(CurrentPost.createdAt)).substring(11,19)}}</span> </v-card-title>
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
                          <v-spacer></v-spacer>
                          <v-col cols="12" md="10" v-html="CurrentPost.content"></v-col>
                          <v-spacer></v-spacer>
                        </v-row>
                      </v-card>
                      <!-- Current Post All Comments -->
                      <v-container pa-0 ma-0>
                        <v-row v-for="(item, i) in allcurrentComments" :key="i" no-gutters>
                          <v-card width="100%">
                            <v-list-item three-line>
                              <v-list-item-content>
                                <div class="overline mb-4">
                                  POST #{{item.cid}}
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
                                      <v-btn v-if="allreplyComments.length>=5" v-on:click="LoadMoreReplyComments()" block color="primary">Load More</v-btn>
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
                                  <v-btn v-if="!item.disliked" v-on:click="likepost(false, i)" icon fab color="grey">
                                    <v-icon>mdi-thumb-up-outline</v-icon>
                                  </v-btn>
                                  <v-btn v-if="!item.liked" v-on:click="dislikepost(false, i)" icon fab color="grey">
                                    <v-icon>mdi-thumb-down-outline</v-icon>
                                  </v-btn>
                                </div>
                                <v-list-item-subtitle>
                                  Name: Tony Chan
                                  <span class="subtitle-1 pl-6">Date: {{item.date}}</span>
                                </v-list-item-subtitle>
                                <div v-html="item.comment" />
                              </v-list-item-content>
                            </v-list-item>
                          </v-card>
                        </v-row>
                      </v-container>
                    </v-row>
                    <v-btn v-if="allcurrentComments.length >= 5" v-on:click="LoadMoreComments" block color="primary">Load More</v-btn>
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
    http.getPosts().then(({ data: posts }) => {
      this.posts = posts
      this.CurrentPost = this.posts[0]
    })
  },
  computed: {
    allcurrentComments () {
      if (this.CurrentPost && this.CurrentPost.Allcomments) {
        return this.CurrentPost.Allcomments.filter(({ cid }) => {
          return cid >= this.currentCommentRange[0] && cid <= this.currentCommentRange[1]
        })
      } else {
        return []
      }
    },
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
    color: 'red',
    dialog: false,
    replycommentdialog: false,
    isPost: true,
    replycomment: '',
    comment: '',
    whichcomment: '',
    currentCommentRange: [1, 5],
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
    CurrentPost: [],
    offsetTop: 0
  }),
  methods: {
    CurrentPosts (i) {
      this.CurrentPost = this.posts[i]
    },
    LoadMoreComments () {
      if ((this.CurrentPost.Allcomments).length >= this.currentCommentRange[1]) {
        this.currentCommentRange = [this.currentCommentRange[0], this.currentCommentRange[1] + 5]
      } else {
        this.currentCommentRange = this.currentCommentRange
      }
    },
    LoadMoreReplyComments () {
      if ((this.allreplyComments).length >= this.currentreplyCommentRange[1]) {
        this.currentreplyCommentRange = [this.currentreplyCommentRange[0], this.currentreplyCommentRange[1] + 5]
      } else {
        this.currentCommentRange = this.currentCommentRange
      }
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    addnewcomments (isPost) {
      var newDate = new Date()
      var datetime = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear() + '  ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds()
      if (isPost === false) {
        const cid = (this.CurrentPost.Allcomments).length + 1
        const newreplycomment = this.replycomment
        const replytowhichcomment = this.whichcomment
        let a1 =
        {
          cid: cid,
          comment: newreplycomment,
          replyto: replytowhichcomment,
          date: datetime,
          liked: false,
          disliked: false,
          notyetfollowed: true
        }
        this.CurrentPost.Allcomments.push(a1)
        this.replycommentdialog = false
      } else {
        const cid = (this.CurrentPost.Allcomments).length + 1
        const newcomment = this.comment
        let a =
        {
          cid: cid,
          comment: newcomment,
          replyto: null,
          date: datetime,
          liked: false,
          disliked: false,
          notyetfollowed: true
        }
        this.CurrentPost.Allcomments.push(a)
        this.dialog = false
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
    followed () {
      if (this.CurrentPost.notyetfollowed === true) {
        this.CurrentPost.notyetfollowed = false
      } else {
        this.CurrentPost.notyetfollowed = true
      }
    }
  }
}
</script>
