<template>
  <div
    :class="[{'hover' : hover }, 'rte-block']"
    @mouseover="hover=true"
    @mouseleave="hover=false"
  >
    <transition name="fade">
      <div class="button rte-block__drag" v-if="hover"><i class="fa fa-align-justify"></i></div>
    </transition>
    <div :is="block.component" :block="block" :index="index"></div>
    <transition name="fade">
      <div class="button rte-block__delete" v-if="hover" @click="deleteBlock(index)"><i class="far fa-times-circle"></i></div>
    </transition>
  </div>
</template>

<script>
import BaseElement from './BaseElement'
import List from './List'
import { Events } from '../utils/events'
export default {
  props: {
    block: {
      type: Object,
      require: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      hover: false
    }
  },
  methods: {
    deleteBlock(index) {
      Events.$emit('delete-block', {index: index})
    }
  },
  components: {
    baseElement: BaseElement,
    list: List
  }
}
</script>

<style lang="scss">
.rte-block {
  position: relative;

  &.hover {
    .rte-block__element {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
  }

  &__element {
    padding: .75rem 3rem .75rem 3rem;
    transition: all .2s ease;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0);

    &.focus {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
  }

  &__content {
    display: inline-block;
    width: 100%;
    outline: none;
  }

  &__drag, &__delete {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &__drag {
    left: 1rem;

    i {
      font-size: 1rem;
    }
  }

  &__delete {
    right: 1rem;

    &:hover {
      i {
        color: red;
      }
    }
  }
}
</style>