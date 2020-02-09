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
          <div class="button rte-subtoolbar__tool" @click="addBlock({component: 'baseElement', tag: 'h1', type: 'header', data: {}})">H1</div>
          <div class="button rte-subtoolbar__tool" @click="addBlock({component: 'baseElement', tag: 'h2', type: 'header', data: {}})">H2</div>
          <div class="button rte-subtoolbar__tool" @click="addBlock({component: 'baseElement', tag: 'h3', type: 'header', data: {}})">H3</div>
          <div class="button rte-subtoolbar__tool" @click="addBlock({component: 'baseElement', tag: 'h4', type: 'header', data: {}})">H4</div>
          <div class="button rte-subtoolbar__tool" @click="addBlock({component: 'baseElement', tag: 'h5', type: 'header', data: {}})">H5</div>
          <div class="button rte-subtoolbar__tool" @click="addBlock({component: 'baseElement', tag: 'h6', type: 'header', data: {}})">H6</div>
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
    addBlock(params) {
      Events.$emit('add-block', params)
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