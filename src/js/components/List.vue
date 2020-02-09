<template>
  <div class="rte-block__list">
    <div
      :is="block.tag"
      :class="[{'focus' : focus }, 'rte-block__content rte-list']"
      :click-outside="onClickOutside"
      contenteditable="true" 
      ref="content"
      @focus="focus=true"
      @blur="focus=false"
      @keyup="onInput"
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
import BaseElement from './BaseElement'
import ListItem from './ListItem'
import InlineToolbar from './InlineToolbar'
import { Events } from '../utils/events'
export default {
  extends: BaseElement,
  data() {
    return {
      items: [{ data: {}}]
    }
  },
  methods: {
    onInput(event) {
      var childNodes = event.target.childNodes
      for(var i = 0; i < childNodes.length; i ++) {
        var item = childNodes[i]
        
      }

      console.log(this.items)
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