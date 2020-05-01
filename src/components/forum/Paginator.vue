<template>
  <div>
    <!-- previous page btn -->
    <v-btn :disabled="value === 1" @click="jump(value - 1)" class="mr-1" icon>
      <v-icon :color="color">mdi-chevron-left</v-icon>
    </v-btn>
    <!-- page number btn -->
    <template v-for="(page, i) in items">
      <!-- hook up a menu if page is an array instead of a number -->
      <template v-if="Array.isArray(page)">
        <v-menu open-on-hover offset-y :key="'p' + i + 'm'">
          <template v-slot:activator="{ on }">
            <v-btn icon v-text="'...'" v-on="on" class="mr-1" />
          </template>

          <v-list height="30vh" class="overflow-y-auto">
            <v-list-item v-for="p in page" @click="jump(p)" :key="'p' + 'i' + p">
              <v-list-item-subtitle v-text="p" class="text-center" />
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <!-- page is a number, no need to hook up a menu -->
      <template v-else>
        <v-btn
          @click="jump(page)"
          :class="{ 'white--text': page === value, 'mr-1': true }"
          :style="page === value ? `background-color: ${color}` : ''"
          :key="'p' + i + 'b'"
          icon
        >
          {{ page }}
        </v-btn>
      </template>
    </template>
    <!-- next page btn -->
    <v-btn :disabled="value === length" @click="jump(value + 1)" icon>
      <v-icon :color="color">mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    value: { // current page number
      type: Number,
      required: true
    },
    length: { // total number of pages
      type: Number,
      required: true
    },
    visible: { // how many buttons should be visible
      type: Number,
      required: false,
      default: 5
    },
    color: {
      type: String,
      required: false
    }
  },
  computed: {
    // truncates all page numbers and keep only important ones
    // the unimportant page number ranges are merged into arrays
    items () {
      if (this.length <= this.visible) return this.range(1, this.length)

      let items = []
      const even = this.visible % 2 === 0 ? 1 : 0
      const left = Math.floor(this.visible / 2)
      const right = this.length - left + 1 + even

      if (this.value > left && this.value < right) {
        const start = this.value - left + 2
        const end = this.value + left - 2 - even
        items = [1, this.range(2, start - 1), ...this.range(start, end), this.range(end + 1, this.length - 1), this.length]
      } else if (this.value === left) {
        const end = this.value + left - 1 - even
        items = [...this.range(1, end), this.range(end + 1, this.length - 1), this.length]
      } else if (this.value === right) {
        const start = this.value - left + 1
        items = [1, this.range(2, start - 1), ...this.range(start, this.length)]
      } else {
        items = [...this.range(1, left), this.range(left + 1, right - 1), ...this.range(right, this.length)]
      }

      items.forEach(i => { if (Array.isArray(i) && i.length === 1) i = i[0] })
      return items
    }
  },
  methods: {
    jump (page) {
      if (page >= 1 && page <= this.length && page !== this.value) {
        console.log('zzzzz')
        this.$emit('input', page)
      }
    },
    range (from, to) {
      const range = []
      from = from > 0 ? from : 1
      for (let i = from; i <= to; i++) range.push(i)
      return range
    }
  }
}
</script>
