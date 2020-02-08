<template>
  <div 
    class="button rte-toolbar__tool"
    @mouseover="hover=true"
    @mouseleave="hover=false"
  >
    <i :class="icon"></i>
    <div class="rte-subtoolbar">
      <transition name="fade">
        <div class="rte-subtoolbar__tools" v-if="hover">
          <div class="button rte-subtoolbar__tool" @click="addBlock('h1', 'heading')">H1</div>
          <div class="button rte-subtoolbar__tool" @click="addBlock('h2', 'heading')">H2</div>
          <div class="button rte-subtoolbar__tool" @click="addBlock('h3', 'heading')">H3</div>
          <div class="button rte-subtoolbar__tool" @click="addBlock('h4', 'heading')">H4</div>
          <div class="button rte-subtoolbar__tool" @click="addBlock('h5', 'heading')">H5</div>
          <div class="button rte-subtoolbar__tool" @click="addBlock('h6', 'heading')">H6</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Toolbar from './Toolbar'
import { Events } from '../utils/events'
export default {
  props: {
    icon: {
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
    addBlock(tag, type) {
      Events.$emit('add-block', {tag: tag, type: type})
    }
  }
}
</script>

<style lang="scss">
.rte-subtoolbar {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: .75rem;

  &__tools {
    display: flex;
    position: relative;
    padding: .75em;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 4px;
  }

  &__tool {
    padding: 4px;
    font-weight: 800;

    &:hover {
      background-color: darkturquoise;
    }

    &:not(:first-child) {
      margin-left: .75rem;
    }
    
    i {
      font-size: 1rem;
    }
  }
}
</style>