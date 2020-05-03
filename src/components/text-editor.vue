<template>
  <div class="editor">
    <editor-menu-bubble class="menububble" :editor="editor" @hide="hideLinkMenu" v-slot="{ commands, isActive, getMarkAttrs, menu }">
      <div
        class="menu-bubble"
        :style="`left: ${menu.left - 60}px; bottom: ${menu.bottom}px;`"
      >
        <v-card v-if="menu.isActive" min-height="0" max-height="40" dark>
          <div class="d-flex pr-1" v-if="linkMenuIsActive">
            <v-text-field placeholder="https://your-link.here" ref="linkInput" dense solo flat
              @keydown.enter.prevent="setLinkUrl(commands.link, linkUrl)"
              @keydown.esc="hideLinkMenu()"
              v-model="linkUrl"
            />
            <div class="link-btns">
              <v-btn icon @click="setLinkUrl(commands.link, linkUrl)">
                <v-icon color="#FFF">mdi-link-variant-plus</v-icon>
              </v-btn>
              <v-btn icon @click="setLinkUrl(commands.link, null)">
                <v-icon color="#FFF">mdi-link-variant-remove</v-icon>
              </v-btn>
            </div>
          </div>
          <template v-else>
            <v-btn @click="showLinkMenu(getMarkAttrs('link'))" color="#424242">
              <span class="ml-n2">{{ isActive.link() ? 'Update Link' : 'Add Link' }}</span>
              <v-icon class="mr-n2" color="#FFF">mdi-link-variant-plus</v-icon>
            </v-btn>
          </template>
        </v-card>

      </div>
    </editor-menu-bubble>

    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, getMarkAttrs }">
      <v-toolbar dark dense>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <v-icon>mdi-format-strikethrough</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <v-icon>mdi-code-brackets</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <v-icon>mdi-format-pilcrow</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <v-icon>mdi-format-header-1</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <v-icon>mdi-format-header-2</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <v-icon>mdi-format-header-3</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <v-icon>mdi-format-list-numbered</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <v-icon>mdi-format-quote-close</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <v-icon>mdi-code-braces-box</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          @click="commands.horizontal_rule"
        >
          <v-icon>mdi-format-vertical-align-bottom</v-icon>
        </v-btn>
        <v-spacer/>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          @click="commands.undo"
        >
          <v-icon>mdi-undo</v-icon>
        </v-btn>
        <v-btn color="#FFF" min-width="0" max-width="40" text
          @click="commands.redo"
        >
          <v-icon>mdi-redo</v-icon>
        </v-btn>
      </v-toolbar>
    </editor-menu-bar>
    <editor-content class="editor-content pt-6 mb-n2" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image
} from 'tiptap-extensions'
export default {
  props: ['value'],
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble
  },
  data: () => ({
    editor: null,
    linkMenuIsActive: false,
    linkUrl: null
  }),
  mounted () {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Image()
      ],
      onUpdate: ({ getHTML }) => this.$emit('input', getHTML())
    })
    this.editor.setContent(this.value)
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  watch: {
    value (newVal) {
      if (this.editor && newVal !== this.value) {
        this.editor.setContent(newVal, true)
      }
    }
  },
  methods: {
    showLinkMenu (attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu () {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl (command, url) {
      command({ href: url })
      this.hideLinkMenu()
    }
  }
}
</script>
<style lang="sass">
.is-active
  background-color: #666

.menu-bubble
  position: absolute
  z-index: 100

.ProseMirror
  padding: 1rem
  border: 1px solid #1976d2
  border-radius: .3rem

.editor-content a
  text-decoration: underline !important

.editor-content p
  margin-bottom: 0

.link-btns
  margin-top: 2px
</style>
