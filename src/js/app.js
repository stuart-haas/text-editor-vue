window.Vue = require('vue')

import Editor from './components/Editor'

const app = new Vue({
  el: '#app',
  components: {
    Editor
  }
})