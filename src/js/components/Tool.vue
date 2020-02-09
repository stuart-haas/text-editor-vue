<template>
  <div 
    class="button rte-toolbar__tool" 
    @click="addBlock"
  >
    <i :class="tool.icon"></i>
  </div>
</template>

<script>
import { Events } from '../utils/events'
export default {
  props: {
    tool: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    addBlock() {
      Events.$emit('add-block', this.tool)
    }
  }
}
</script>

<style lang="scss">

</style>