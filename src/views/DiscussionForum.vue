<template>
  <div>
    <v-container>
      <v-card elevation="false">
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
      </v-card>
      <v-card elevation="false">
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3">
            <v-card-title style="font-size: 2em">All Posts</v-card-title>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-container width="100%" class="pa-0 ma-0">
              <v-row no-gutters>
                  <v-bottom-navigation grow color="primary" height="70px">
                    <v-col cols="12" md="1">
                      <v-btn>
                        <span>All</span>
                        <v-icon>mdi-home</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12" md="1">
                      <v-btn>
                        <span>Followed</span>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12" md="1" >
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
                <v-col cols="12" md="3">
                  <v-card height="100%" width="100%">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="title text-center">
                          Posts
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list dense nav>
                      <v-list-item v-for="(item, i) in popularposts_items" :key="i" link v-on:click="CurrentPosts(i)">
                        <v-list-item-avatar :color ="item.color">
                          <span class="white--text headline" v-text ="item.text"></span>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-subtitle> {{item.name}} <span class="pl-6"> {{item.time}} </span> <span class="pl-2"> {{item.date}} </span> </v-list-item-subtitle>
                          <v-list-item-title class="title" v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
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
                        <v-card width=100%>
                          <div>
                            <v-list-item >
                              <v-list-item-avatar color="grey"></v-list-item-avatar>
                              <v-list-item-content class="pa-3">
                                <v-row>
                                  <v-list-item-title class="headline"> Title: {{CurrentPost.title}}</v-list-item-title>
                                  <v-btn icon>
                                    <v-icon>mdi-heart</v-icon>
                                  </v-btn>
                                  <v-btn icon>
                                    <v-icon>{{this.icon}}</v-icon>
                                  </v-btn>
                                  <v-btn icon>
                                    <v-icon>mdi-arrow-up-bold</v-icon>
                                  </v-btn>
                                  <v-spacer></v-spacer>
                                  <v-dialog v-model="dialog" width="850px">
                                    <template v-slot:activator="{on}">
                                      <v-btn color="primary" dark v-on="on">Make Comment</v-btn>
                                    </template>
                                    <v-row >
                                      <v-card width=100%>
                                        <div class="row">
                                          <v-card-title class="subtitle-1 ma-6"> Post #{{CurrentPost.postnumber}} <span class="subtitle-1 pl-6"> {{CurrentPost.name}}</span> <span class="subtitle-1 pl-2"> </span></v-card-title>
                                          <v-card-title class="subtitle-1"> {{CurrentPost.date}}</v-card-title>
                                        </div>
                                        <div class="row">
                                          <v-img max-width="800" max-height="350" min-width="800" min-height="350" contain :src="CurrentPost.src" eager></v-img>
                                        </div>
                                        <v-row>
                                          <v-spacer></v-spacer>
                                          <v-col cols="12" md="10">
                                            {{CurrentPost.question}}
                                          </v-col>
                                          <v-spacer></v-spacer>
                                        </v-row>
                                        <v-container>
                                          <v-textarea label="Your Comment" outlined background-color= "grey lighten-3" v-model="comment"></v-textarea>
                                        </v-container>
                                        <v-container class="justify-center d-flex">
                                          <v-card-actions>
                                            <v-btn color="primary" dark @click="addnewcomments">Reply</v-btn>
                                            <v-btn color="primary" dark @click="dialog=false">Exit</v-btn>
                                          </v-card-actions>
                                        </v-container>
                                      </v-card>
                                    </v-row>
                                  </v-dialog>
                                </v-row>
                                <p> by {{CurrentPost.name}} <span class="subtitle-1 pl-6"> Rating: {{CurrentPost.rating}}</span></p>
                              </v-list-item-content>
                            </v-list-item>
                          </div>
                        </v-card>
                        <v-card width=100%>
                          <div class="row">
                            <v-card-title class="subtitle-1"> Post #{{CurrentPost.postnumber}} <span class="subtitle-1 pl-6"> {{CurrentPost.name}}</span> <span class="subtitle-1 pl-2"> </span></v-card-title>
                            <v-card-title class="subtitle-1"> {{CurrentPost.date}}</v-card-title>
                          </div>
                          <div class="row">
                            <v-img max-width="800" max-height="500" contain :src="CurrentPost.src" eager></v-img>
                          </div>
                          <v-row>
                            <v-spacer></v-spacer>
                            <v-col cols="12" md="10">
                              {{CurrentPost.question}}
                            </v-col>
                            <v-spacer></v-spacer>
                          </v-row>
                        </v-card>
                        <v-container pa-0 ma-0>
                          <v-row v-for="(item, i) in allcurrentComments"  :key="i" no-gutters>
                              <v-card width=100%>
                                <v-list-item three-line>
                                  <v-list-item-content>
                                    <div class="overline mb-4"> POST #{{item.cid}}
                                      <v-btn class="sm-6" outlined fab color="teal">
                                        <v-icon>mdi-format-list-bulleted-square</v-icon>
                                      </v-btn>
                                    </div>
                                  <v-list-item-subtitle> {{item.name}} <span class="subtitle-1 pl-6">{{item.date}}</span></v-list-item-subtitle>
                                  {{item.comment}}
                                  </v-list-item-content>
                                </v-list-item>
                              </v-card>
                          </v-row>
                        </v-container>
                    </v-row>
                  </v-container>
                  <v-btn  v-on:click="LoadMoreComments(i)" block color="primary" >Load More</v-btn>
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
export default {
  mounted () {
    this.CurrentPost = this.popularposts_items[0]
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
    }
  },
  data: () => ({
    dialog: false,
    comment: '',
    currentCommentRange: [1, 5],
    icon: 'mdi-arrow-down-bold',
    items: [
      {
        icon: 'mdi-fire',
        text: 'HOT'
      },
      {
        text: 'NEW',
        icon: 'mdi-star'
      },
      {
        text: 'RATING',
        icon: 'mdi-arrow-up-bold'
      }
    ],
    Trending_Today_card_items: [
      {
        src: 'https://www.sciencedaily.com/images/2019/10/191025170815_1_180x120.jpg',
        title: 'Science',
        author: 'Edith Woo',
        text: 'EW',
        color: 'red',
        para: 'Engineers develop a new way to remove carbon dioxide from air. The process could work on ...'
      },
      {
        src: 'https://www.popsci.com/resizer/tobLbXyxWM34zcMDa7ycDgvM2C4=/1034x685/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/T4J7JURF3L5QEFNULUSXDEWYGA.jpg',
        title: 'Technology',
        author: 'Peter Chan',
        text: 'PC',
        color: 'purple',
        para: 'The price tag for addressing climate change is huge, and the debates over whether we can ...'
      },
      {
        src: 'data:image/jpeg;base64,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',
        title: 'Engineering',
        author: 'Tony Chow',
        text: 'TC',
        color: 'grey',
        para: 'Two-legged robot mimics human balance while running and jumping.New control system may...'
      },
      {
        src: 'https://media.eurekalert.org/multimedia_prod/pub/web/206065_web.jpg',
        title: 'Mathematics',
        author: 'Riocla',
        text: 'RI',
        color: 'yellow',
        para: 'Strange warping geometry helps to push scientific boundaries.Atomic interactions ...'
      }
    ],
    popularposts_items: [
      {
        src: 'http://instantview.info/wp-content/uploads/2019/07/multiplication-word-problems-worksheets-grade-5-simple-multiplying-decimals-pdf-and-division-gr.jpg',
        Field: 'Maths',
        title: 'Maths Question (Multiplication)',
        name: 'Edith Woo',
        date: 'Nov 8, 2019',
        time: '22:57',
        text: 'M',
        color: 'red',
        para: 'Engineers develop a new way to remove carbon dioxide from air. The process could work on ...',
        rating: '4.7',
        question: 'Anyone know how to do Question 2? Thanks a lot!!! I have no idea how to do this question. Its too difficult :( Wuwuwuwuwu',
        postnumber: '1',
        Allcomments: [
        ]
      },
      {
        src: 'https://www.popsci.com/resizer/tobLbXyxWM34zcMDa7ycDgvM2C4=/1034x685/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/T4J7JURF3L5QEFNULUSXDEWYGA.jpg',
        Field: 'Technology',
        title: 'Technology',
        name: 'Peter Chan',
        date: 'Nov 10, 2019',
        time: '12:04',
        text: 'PC',
        color: 'purple',
        para: 'The price tag for addressing climate change is huge, and the debates over whether we can ...',
        rating: '3.5',
        question: 'Anyone can help me please? hehe!!!Fuck the world',
        postnumber: '2',
        Allcomments: [
        ]
      },
      {
        src: 'data:image/jpeg;base64,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',
        Field: 'Engineering',
        title: 'How to build a bridge',
        date: 'Nov 22, 2019',
        name: 'Tony Chow',
        text: 'TC',
        color: 'grey',
        para: 'Two-legged robot mimics human balance while running and jumping.New control system may...',
        postnumber: '3'
      },
      {
        src: 'https://media.eurekalert.org/multimedia_prod/pub/web/206065_web.jpg',
        title: 'Mathematics',
        name: 'Riocla',
        text: 'RI',
        color: 'yellow',
        para: 'Strange warping geometry helps to push scientific boundaries.Atomic interactions ...',
        postnumber: '4'
      }
    ],
    CurrentPost: {},
    offsetTop: 0
  }),
  methods: {
    CurrentPosts (i) {
      this.CurrentPost = this.popularposts_items[i]
    },
    LoadMoreComments (i) {
      this.currentCommentRange = [this.currentCommentRange[0], this.currentCommentRange[1] + 5]
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    addnewcomments () {
      const cid = (this.CurrentPost.Allcomments).length + 1
      console.log(cid)
      const newcomment = this.comment
      let a =
      {
        cid: cid,
        comment: newcomment
      }
      console.log(a)
      this.CurrentPost.Allcomments.push(a)
      this.dialog = false
      return this.CurrentPost.Allcomments
    }
  }
}
</script>
