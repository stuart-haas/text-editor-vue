<template>
  <div class="rte">
    <block
      v-for="(block, index) in blocks"
      :key="index"
      :block="block"
      :index="index"
      @event="deleteBlock"
    >
    </block>
    <toolbar @event="addBlock"></toolbar>
  </div>
</template>

<script>
import Toolbar from './Toolbar'
import Block from './Block'
export default {
  data() {
    return {
      blocks: []
    }
  },
  methods: {
    addBlock(params) {
      this.blocks.push({tag: params.tag, type: params.type, data: { text: '' }})
    },
    deleteBlock: function(event) {
      console.log(event);
      this.blocks.splice(this.blocks.indexOf(event), 1);
    }
  },
  components: {
    toolbar: Toolbar,
    block: Block
  }
}
</script>

<style>
.rte {
  margin: 1em;
}
</style>