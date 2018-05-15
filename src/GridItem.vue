<template>
  <transition :name="dirtction == 'left' ? 'gridleft' : 'gridright'">
    <div class="grid-item" :style="{
      top: top,
      zIndex: zIndex,
      transform: transform,
      boxShadow: boxShadow
    }"
    v-show="index >= offsetNumCopy"
    ref="item">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
export default {
  props: ['showCount', 'index', 'length', 'offset', 'scale'],
  mounted() {
  },
  methods: {
  },
  computed: {
    boxShadow() {
      return this.index - this.offsetNum  <= this.showCount - 1? 
        '0 10px 6px -6px #d0d0d0' : 
        '0 0px 0px 0px #fff'
    },
    transform() {
      return 'scaleX(' +
        (this.index - this.offsetNum < this.showCount - 1 ? 
        1 - ((this.index - this.offsetNum) * this.scale) :
        1 - ((this.showCount - 1) * this.scale)) +
      ')'
    },
    top() {
      return this.index - this.offsetNum < this.showCount - 1 ? 
        (this.offset * (this.index - this.offsetNum)) + 'px' : 
        ((this.showCount - 1) * this.offset)+ 'px'
    },
    zIndex() {
      return this.index - this.offsetNum <= this.showCount -1 ?
        this.length - this.index:
        this.length - this.showCount - this.offsetNum
    },
    dirtction() {
      return this.$parent.dirtction
    },
    offsetNum() {
      return this.$parent.offsetNum
    },
    // 
    offsetNumCopy() {
      return this.$parent.offsetNumCopy
    }
  },
  
};
</script>
<style lang="less">
.grid-item {
  overflow: hidden;
  position: absolute;
  transition-duration: .2s;
  background-color: #fff;
  // transition-delay: .4s;
}
.gridright-leave-active {
  animation-name: fadeOutRight;
  animation-duration: .5s;
}
.gridleft-leave-active {
  animation-name: fadeOutLeft;
  animation-duration: .5s;
}
@keyframes fadeOutLeft {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes fadeOutRight {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>


