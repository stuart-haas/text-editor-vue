<template>
  <div
    :class="[{'hover' : hover }, 'rte-block']"
    @mouseover="hover=true"
    @mouseleave="hover=false"
  >
    <div
      :is="block.tag"
      :class="[{'focus' : focus }, 'rte-block__content']"
      contenteditable="true" 
      ref="content"
      @focus="focus=true"
      @blur="focus=false"
    >
      {{ block.data.text }}
    </div>
    <div class="button rte-block__delete" v-if="hover" v-on:click="deleteBlock(index)"><i class="far fa-times-circle"></i></div>
  </div>
</template>

<script>
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
      hover: false
    };
  },
  mounted() {
    this.$refs.content.focus()
  },
  methods: {
    deleteBlock(index) {
      console.log(index)
      this.$emit('event', {index: index})
    }
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
}
.rte-block__content {
  max-width: 85%;
  margin: 0 auto;
  padding: 1em;
  outline: none;
  transition: all .3s ease;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0);
  
  &.focus {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }
}
.rte-block__delete {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
</style>