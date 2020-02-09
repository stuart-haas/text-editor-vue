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
import BlockElement from './BlockElement'
export default {
  extends: BlockElement
}
</script>

<style lang="scss">

</style>