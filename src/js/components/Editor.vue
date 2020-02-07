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
      blocks: [],
      data: []
    }
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : ""
    }
  },
  mounted() {
    Events.$on('add-block', params => {
      this.blocks.push({ tag: params.tag, type: params.type, data: { text : '' } })
      this.updateData()
    })
    Events.$on('update-block', params => {
      Vue.set(this.blocks, params.index, params.block)
      this.updateData()
    })
    Events.$on('delete-block', index => {
      this.blocks.splice(this.blocks.indexOf(index), 1)
      this.updateData()
    })
  },
  methods: {
    checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
    updateData: function() {
      this.data = JSON.stringify(this.blocks)
      console.log(this.data)
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
  background: darkturquoise;
}
</style>