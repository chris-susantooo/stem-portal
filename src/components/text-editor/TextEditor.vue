<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
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
    <div class="py-2" />
    <editor-content class="editor__content" :editor="editor" autofocus />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
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
  History
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data: () => ({
    editor: new Editor({
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
        new History()
      ],
      content: `
        <h2>
          Hi there,
        </h2>
        <p>
          this is a very <em>basic</em> example of section content.
        </p>
        <pre><code>body { display: none; }</code></pre>
        <ul>
          <li>
            A regular list
          </li>
          <li>
            With regular items
          </li>
        </ul>
        <blockquote>
          It's amazing 👏
          <br />
          – powered by tiptap
        </blockquote>
      `
    })
  }),
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>
<style lang="sass" scoped>
.is-active
  background-color: #666
</style>
