<template>
  <div 
    class="rte-inline-toolbar"
    ref="toolbar"
    v-bind:style="{'left': leftOffset}"
    @mouseover="hover=true"
    @mouseleave="hover=false"
  >
    <div class="rte-inline-toolbar__tools">
      <div class="button rte-inline-toolbar__tool" @mousedown="updateBlock($event, {component: 'baseElement', tag: 'h1', type: 'heading', data: { text: text }})"><i class="fas fa-paragraph"></i></div>
      <div class="button rte-inline-toolbar__tool" @mousedown="addFormat($event, 'bold')"><i class="fas fa-bold"></i></div>
      <div class="button rte-inline-toolbar__tool" @mousedown="addFormat($event, 'italic')"><i class="fas fa-italic"></i></div>
    </div>
  </div>
</template>

<script>
import { Events } from '../utils/events'
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: false
    },
    left: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      hover: false,
      leftOffset: 0
    }
  },
  mounted() {
    this.leftOffset = this.left + 'px'
  },
  methods: {
    addFormat(event, format) {
      event.preventDefault()
      document.execCommand(format, false, '')
    },
    updateBlock(event, params) {
      event.preventDefault()
      Events.$emit('update-block', {index: this.index, block: params})
    }
  }
}
</script>

<style lang="scss">
.rte-inline-toolbar {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: .5rem;
  z-index: 999;

  &__tools {
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 4px;
  }

  &__tool {
    position: relative;
    margin-top: .5rem;
    margin-bottom: .5rem;
    margin-left: .5rem;
    padding: 4px;

    &:last-child {
      margin-right: .5rem;
    }

    &:hover {
      background-color: darkturquoise;
    }
    
    i {
      font-size: 1rem;
    }
  }
}
</style>