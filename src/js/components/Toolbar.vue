<template>
  <div class="rte-toolbar"
    @mouseover="hover=true"
    @mouseleave="hover=false"
  >
    <div class="button rte-toolbar__add"><i class="fas fa-plus"></i></div>
    <transition name="fade">
      <div class="rte-toolbar__tools" v-if="hover">
        <div class="button rte-toolbar__tool" @click="addBlock({component: 'heading', tag: 'h1', type: 'heading', data: {}})">
          <i class="fas fa-heading"></i>
        </div>
        <div class="button rte-toolbar__tool" @click="addBlock({component: 'paragraph', tag: 'div', type: 'paragraph', data: {}})">
          <i class="fas fa-paragraph"></i>
        </div>
        <div class="button rte-toolbar__tool" @click="addBlock({component: 'list', tag: 'ul', type: 'list', data: {style: 'unordered', items:['']}})">
          <i class="fas fa-list-ul"></i>
        </div>
        <div class="button rte-toolbar__tool" @click="addBlock({component: 'list', tag: 'ol', type: 'list', data: {style: 'ordered', items:['']}})">
          <i class="fas fa-list-ol"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Events } from '../utils/events'
export default {
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
.rte-toolbar {
  position: relative;
  margin: 1rem 0;

  &__tools {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 3rem;
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

  &__add {
    position: relative;
    padding: .5rem;

    &:hover {
      i {
        color: darkturquoise;
      }
    }
  }
}
</style>