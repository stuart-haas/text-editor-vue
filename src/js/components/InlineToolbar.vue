<template>
  <div 
    class="rte-inline-toolbar"
    v-bind:style="{'top': top, 'left': left}"
    @mouseover="hover=true"
    @mouseleave="hover=false"
  >
    <div class="rte-inline-toolbar__tools">
      <div class="button rte-inline-toolbar__tool" @mousedown="updateBlock($event, 'h1', 'heading')"><i class="fas fa-paragraph"></i></div>
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
      required: true
    },
    left: {
      type: String,
      required: true
    },
    top: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hover: false
    }
  },
  methods: {
    addFormat(event, format) {
      event.preventDefault()
      document.execCommand(format, false, '')
    },
    updateBlock(event, tag, type) {
      event.preventDefault()
      Events.$emit('update-block', {index: this.index, block: { tag: tag, type: type, data: { text: this.text } } })
    }
  }
}
</script>

<style lang="scss">
.rte-inline-toolbar {
  position: relative;
  z-index: 999;

  &__tools {
    position: absolute;
    top: 0;
    left: 0;
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