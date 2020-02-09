<template>
  <div :class="[{'focus' : focus }, 'rte-block__element']">
    <div
      contenteditable="true" 
      ref="content"
      :is="block.tag"
      :class="['rte-block__content rte-list']"
      :click-outside="onClickOutside"
      @focus="focus=true"
      @blur="focus=false"
      @keyup="onKeyUp"
      @input="onInput"
      @mouseup="onMouseUp"
      @mousedown="onMouseDown"
    >
      <list-item
        v-for="(data, index) in items"
        :key="index"
        :item="data"
        :index="index"
      >
      </list-item>
    </div>
  </div>
</template>

<script>
import BlockElement from './BlockElement'
import ListItem from './ListItem'
import { Events } from '../utils/events'
export default {
  extends: BlockElement,
  data() {
    return {
      items: ['']
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
    listItem: ListItem
  }
}
</script>

<style lang="scss">

</style>