<template>
  <li
    class="rte-list__item"
  >
    {{ item.data.text }}
  </li>
</template>

<script>
import { Events } from '../utils/events'
export default {
  props: {
    item: {
      type: Object,
      require: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss">

</style>