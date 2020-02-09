<template>
  <li
    class="rte-list__item"
  >
    {{ data }}
  </li>
</template>

<script>
import { Events } from '../utils/events'
export default {
  props: {
    data: {
      type: String,
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