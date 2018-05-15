import Vue from 'vue/dist/vue.js'
import GridWrap from './../src/GridWrap.vue'
import GridItem from './../src/GridItem.vue'

new Vue({
  el: '#app',
  created() {
  },
  methods: {
    change({ direction }) {
      console.log(direction ? 'to left' : 'to right')
    },
    empty() {
      console.log('empty!!!')
    }
  },
  components: {
    GridWrap, GridItem
  }
})