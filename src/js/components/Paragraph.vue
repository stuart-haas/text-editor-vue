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
  </div>
</template>

<script>
import BlockElement from './BlockElement'
export default {
  extends: BlockElement,
  components: {
    blockElement: BlockElement
  }
}
</script>

<style lang="scss">

</style>