<template>
  <div class="grid-wrap" ref="grid">
    <slot ref="slot"></slot>    
  </div>
</template>
<script>
export default {
  data() {
    return {
      startX: 0,
      offsetNum: 0,
      offsetNumCopy: 0,
      dirtction: '',
      dataList: []
    }
  },
  props: ['list', 'show'],
  created() {
    this.dataList = [...this.list]
  },
  mounted() {
    this.$refs.grid.addEventListener('touchstart', this.touchstartListener)
    this.$refs.grid.addEventListener('touchend', this.touchendListener)
  },
  methods: {
    // 向左滑动
    dislike() {
      this.dirtction = "left"
      this.modifyStatus(1)
    },
    // 向右滑动
    wait() {
      this.dirtction = "right"
      this.modifyStatus(0)
    },
    touchstartListener(e) {
      e.preventDefault()
      this.startX = e.touches[0].pageX
    },
    touchendListener(e) {
      const moveEndX = e.changedTouches[0].pageX 
      const offset = moveEndX - this.startX
      if (Math.abs(offset) < 30) return
      if (offset > 0) this.wait()
      else this.dislike()
    },
    reset() {
      this.offsetNum = this.offsetNumCopy = 0
    },
    modifyStatus(status) {
      this.$emit('change', { direction: status })
      this.offsetNumCopy++
      if (this.offsetNumCopy == this.dataList.length) {
        this.$refs.grid.removeEventListener('touchstart', this.touchstartListener)
        this.$refs.grid.removeEventListener('touchend', this.touchendListener)
        this.$emit('empty')
      }
      setTimeout(() => {
        this.offsetNum++
      }, 400)
    }
  },
   watch: {
    list() {
      this.dataList = [...this.list]
    }
  }
}
</script>
<style lang="less">
.grid-wrap {
  position: relative;
}
</style>

