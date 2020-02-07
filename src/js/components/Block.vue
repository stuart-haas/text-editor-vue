<template>
  <div
    :class="[{'hover' : hover }, 'rte-block']"
    v-click-outside="onClickOutside"
    @mouseover="hover=true"
    @mouseleave="hover=false"
  >
    <transition name="fade">
      <div class="button rte-block__drag" v-if="hover"><i class="fa fa-align-justify"></i></div>
    </transition>
    <div
      :is="block.tag"
      :class="[{'focus' : focus }, 'rte-block__content']"
      v-model="block.data.text"
      contenteditable="true" 
      ref="content"
      @focus="focus=true"
      @blur="focus=false"
      @keyup="onKeyUp"
      @input="onInput"
      @mouseup="onMouseUp"
      @mousedown="onMouseDown"
    >
      {{ block.data.text }}
    </div>
    <transition name="fade">
      <div class="button rte-block__delete" v-if="hover" @click="deleteBlock(index)"><i class="far fa-times-circle"></i></div>
    </transition>
    <transition name="fade">
      <inline-toolbar v-if="format" :top="top" :left="left" :index="index" :text="block.data.text"></inline-toolbar>
    </transition>
  </div>
</template>

<script>
import _ from 'lodash'
import Toolbar from './Toolbar'
import InlineToolbar from './InlineToolbar'
import { Events } from '../utils/events'
import clickOutside from '../utils/directives';
export default {
  props: {
    block: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      focus: true,
      hover: false,
      format: false,
      top: 0,
      left: 0
    }
  },
  mounted() {
    this.$refs.content.focus()
  },
  methods: {
    deleteBlock(index) {
      Events.$emit('delete-block', {index: index})
    },
    onKeyUp(event) {
      this.toggleFormat(false)
    },
    onInput: _.debounce(function(event) {
      Events.$emit('update-block', {index: this.index, block: { tag: this.block.tag, type: this.block.type, data: { text: event.target.innerHTML.trim() } } })
    }, 500),
    onMouseUp(event) {
      var text = window.getSelection().toString()
      var selection = window.getSelection()
      var range = selection.getRangeAt(0)
      var rect = range.getBoundingClientRect()
      if(text !== '') {
        this.top = 0 + 'px'
        this.left = rect.left + 'px'
        this.toggleFormat(true)
      }
    },
    onMouseDown(event) {
      var text = window.getSelection().toString()
      if(text == '') {
        this.toggleFormat(false)
      }
    },
    onClickOutside() {
      this.toggleFormat(false)
    },
    toggleFormat(format) {
      this.format = format
      Events.$emit('toggle-format', {format: this.format})
    }
  },
  components: {
    toolbar: Toolbar,
    inlineToolbar: InlineToolbar
  }
}
</script>

<style lang="scss">
.rte-block {
  position: relative;
  margin: .25rem 0;

  &.hover {
    .rte-block__content {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
  }

  &__content {
    padding: 1rem 3rem 1rem 3rem;
    outline: none;
    transition: all .2s ease;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0);
    
    &.focus {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
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