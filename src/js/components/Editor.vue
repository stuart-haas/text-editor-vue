<template>
  <div class="rte">
    <draggable
      :list="blocks"
      :disabled="!enabled"
      ghost-class="ghost"
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
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Toolbar from './Toolbar'
import Block from './Block'
import { Events } from '../utils/events'
export default {
  data() {
    return {
      enabled: true,
      dragging: false,
      blocks: [],
      data: []
    }
  },
  mounted() {
    Events.$on('add-block', params => {
      this.blocks.push({ tag: params.tag, type: params.type, data: { text : '' } })
      this.refresh()
    })
    Events.$on('update-block', params => {
      Vue.set(this.blocks, params.index, params.block)
      this.refresh()
    })
    Events.$on('delete-block', index => {
      this.blocks.splice(this.blocks.indexOf(index), 1)
      this.refresh()
    })
  },
  methods: {
    refresh: function() {
      this.data = JSON.parse(JSON.stringify(this.blocks))
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