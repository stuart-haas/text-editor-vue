<template>
  <div class="rte-toolbar"
    @mouseover="hover=true"
    @mouseleave="hover=false"
  >
    <div class="button"><i class="fas fa-plus"></i></div>
    <div class="rte-tools" v-if="hover">
      <div class="button tool" v-on:click="addBlock('div', 'paragraph')"><i class="fas fa-paragraph"></i></div>
      <div class="button tool" v-on:click="addBlock('h1', 'heading')"><i class="fas fa-heading"></i></div>
      <div class="button tool" v-on:click="addBlock('ul', 'list')"><i class="fas fa-list-ul"></i></div>
      <div class="button tool" v-on:click="addBlock('ol', 'list')"><i class="fas fa-list-ol"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hover: false
    };
  },
  mounted() {

  },
  methods: {
    addBlock(tag, type) {
      this.$emit('event', {tag: tag, type: type});
    }
  }
}
</script>

<style lang="scss">
.rte-toolbar {
  position: relative;
  margin: 1em 0;

  & > .button {
    padding: .75em 0;
  }
}
.rte-tools {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 3em;
  padding: .75em;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 4px;

  .button {
    padding: 4px;

    &:not(:first-child) {
      margin-left: .75em;
    }
    
    i {
      font-size: 1rem;
    }
  }
}
</style>