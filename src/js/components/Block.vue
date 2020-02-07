<template>
  <div
    :class="[{'hover' : hover }, 'rte-block']"
    @mouseover="hover=true"
    @mouseleave="hover=false"
  >
    <transition name="fade">
      <div class="button rte-block__drag" v-if="hover"><i class="fa fa-align-justify"></i></div>
    </transition>
    <div
      :is="block.tag"
      :class="[{'focus' : focus }, 'rte-block__content']"
      v-model="block.data"
      contenteditable="true" 
      ref="content"
      @focus="focus=true"
      @blur="focus=false"
      @input="onInput"
    >
      {{ block.data }}
    </div>
    <transition name="fade">
      <div class="button rte-block__delete" v-if="hover" @click="deleteBlock(index)"><i class="far fa-times-circle"></i></div>
    </transition>
  </div>
</template>

<script>
import _ from 'lodash'
import { Events } from '../directives/events'
export default {
  props: {
    block: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    data: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      self: null,
      focus: true,
      hover: false
    }
  },
  mounted() {
    this.$refs.content.focus()
  },
  methods: {
    deleteBlock(index) {
      Events.$emit('delete-block', {index: index})
    },
    onInput: _.debounce(function(event) {
      Events.$emit('update-block', {index: this.index, block: { tag: this.block.tag, type: this.block.type, data: event.target.innerText }})
    }, 250)
  }
}
</script>

<style lang="scss">
.rte-block {
  position: relative;

  &.hover {
    .rte-block__content {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
  }

  &__content {
    padding: 1rem 3rem 1rem 3rem;
    outline: none;
    transition: all .3s ease;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0);
    
    &.focus {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
  }

  &__drag {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
  }

  &__delete {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;

    &:hover {
      i {
        color: red;
      }
    }
  }
}
</style>