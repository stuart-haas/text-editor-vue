<template>
  <div :class="[{'focus' : focus }, 'rte-block__element']">
    <div
      contenteditable="true" 
      ref="content"
      :is="block.tag"
      :class="['rte-block__content rte-block__list']"
      :click-outside="onClickOutside"
      @focus="focus=true"
      @blur="focus=false"
      @keyup="onKeyUp"
      @input="onInput"
      @mouseup="onMouseUp"
      @mousedown="onMouseDown"
    >
      <list-item
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        :index="index"
      >
      </list-item>
    </div>
    <transition name="fade">
      <inline-toolbar v-if="format" :left="left" :index="index" :text="block.data.text"></inline-toolbar>
    </transition>
  </div>
</template>

<script>
import BlockElement from './BlockElement'
import ListItem from './ListItem'
import InlineToolbar from './InlineToolbar'
import { Events } from '../utils/events'
export default {
  extends: BlockElement,
  data() {
    return {
      items: [{ data: {}}]
    }
  },
  methods: {
    onInput(event) {
      var data = []
      var childNodes = event.target.childNodes
      for(var i = 0; i < childNodes.length; i ++) {
        var item = childNodes[i]
        data.push(item.innerHTML.trim())
      }
      this.block.data.items = data
      Events.$emit('update-block', {index: this.index, block: this.block })
    }
  },
  components: {
    listItem: ListItem,
    inlineToolbar: InlineToolbar
  }
}
</script>

<style lang="scss">

</style>