<template>
  <div class="rte-toolbar"
    @mouseover="hover=true"
    @mouseleave="hover=false"
  >
    <div class="button rte-toolbar__add"><i class="fas fa-plus"></i></div>
    <transition name="fade">
      <div class="rte-toolbar__tools" v-if="hover">
        <tool
          v-for="(tool, index) in tools"
          :key="index"
          :tool="tool"
          :index="index"
        >
        </tool>
      </div>
    </transition>
  </div>
</template>

<script>
import Tool from './Tool'
import { Tools } from '../config'
export default {
  data() {
    return {
      hover: false,
      tools: Tools
    }
  },
  components: {
    tool: Tool
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