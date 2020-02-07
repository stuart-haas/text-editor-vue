<template>
  <div class="rte">
    <draggable
      :list="blocks"
      :disabled="!enabled"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging=true"
      @end="dragging=false"
      handle=".rte-block__drag"
    >
      <block
        v-for="(block, index) in blocks"
        :key="index"
        :block="block"
        :index="index"
      >
      </block>
    </draggable>
    <toolbar></toolbar>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Toolbar from './Toolbar'
import Block from './Block'
import { Events } from '../directives/events'
export default {
  data() {
    return {
      enabled: true,
      dragging: false,
      blocks: []
    }
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : ""
    }
  },
  mounted() {
    Events.$on('add-block', params => {
      this.blocks.push({ tag: params.tag, type: params.type, data: '' })
    })
    Events.$on('update-block', params => {
      Vue.set(this.blocks, params.index, params.block);
    })
    Events.$on('delete-block', index => {
      this.blocks.splice(this.blocks.indexOf(index), 1)
    })
  },
  methods: {
    checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    }
  },
  components: {
    draggable,
    toolbar: Toolbar,
    block: Block
  }
}
</script>

<style lang="scss">
.rte {
  margin: 1rem;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>