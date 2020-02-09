<template>
  <div :class="[{'focus' : focus }, 'rte-block__element']">
    <div
      contenteditable="true" 
      ref="content"
      :is="block.tag"
      :class="['rte-block__content']"
      :click-outside="onClickOutside"
      @focus="focus=true"
      @blur="focus=false"
      @keyup="onKeyUp"
      @input="onInput"
      @mouseup="onMouseUp"
      @mousedown="onMouseDown"
    >
      {{ block.data.text }}
    </div>
    <transition name="fade">
      <inline-toolbar v-if="format" :left="left" :index="index" :text="block.data.text"></inline-toolbar>
    </transition>
  </div>
</template>

<script>
import clickOutside from '../utils/directives'
import { Events } from '../utils/events'
import InlineToolbar from './InlineToolbar'
export default {
  props: {
    block: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      focus: true,
      format: false,
      left: 0
    }
  },
  mounted() {
    this.$refs.content.focus()
  },
  methods: {
    onKeyUp(event) {
      this.toggleFormat(false)
    },
    onInput(event) {
      this.block.data.text = event.target.textContent !== '' ? this.block.data.text = event.target.innerHTML.trim() : ''
      Events.$emit('update-block', {index: this.index, block: this.block })
    },
    onMouseUp(event) {
      var text = window.getSelection().toString()
      var selection = window.getSelection()
      var range = selection.getRangeAt(0)
      var rect = range.getBoundingClientRect()
      if(text !== '') {
        this.left = rect.left
        this.toggleFormat(true)
      }
    },
    onMouseDown(event) {
      var text = window.getSelection().toString()
      if(text == '') {
        this.toggleFormat(false)
      }
    },
    onClickOutside(event) {
      this.toggleFormat(false)
    },
    toggleFormat(format) {
      this.format = format
      Events.$emit('toggle-format', {format: this.format})
    }
  },
  components: {
    inlineToolbar: InlineToolbar
  }
}
</script>

<style lang="scss">

</style>